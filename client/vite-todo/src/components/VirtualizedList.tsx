import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getList } from '../api/axios';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { CircularProgress } from '@mui/material';
import { useVirtualizer } from '@tanstack/react-virtual';

export function TodoList() {
  const { status, data, error, isFetching, isFetchingNextPage, isFetchingPreviousPage, fetchNextPage, fetchPreviousPage, hasNextPage, hasPreviousPage } = useInfiniteQuery(['lists'], getList, {
    getPreviousPageParam: (firstPage, allPages) => (allPages.length > 1 ? allPages.length - 1 : undefined),
    getNextPageParam: (lastPage, allPages) => {
      const limit = 20;
      const lastPageNum = Math.ceil(lastPage.count / limit);
      return lastPageNum > allPages.length ? allPages.length + 1 : undefined;
    },
  });

  const allRows = data?.pages.map((page) => page.rows).flat() ?? [];

  const parentRef = React.useRef();

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? allRows.length + 1 : allRows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 48,
    overscan: 5,
  });
  useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();

    if (!lastItem) {
      return;
    }

    if (lastItem.index >= allRows.length - 1 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage, allRows.length, isFetchingNextPage, rowVirtualizer.getVirtualItems()]);

  if (allRows.length === 0) return <></>;

  return (
    <>
      <Box sx={{ width: '100%', height: '100%', overflowY: 'scroll' }} ref={parentRef}>
        <Box
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}>
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const isLoaderRow = virtualRow.index > allRows.length - 1;
            const todoList = allRows[virtualRow.index];

            return (
              <Box
                key={todoList?.id ?? virtualRow.index}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: `${virtualRow.size}px`, transform: `translateY(${virtualRow.start}px)` }}>
                {!isLoaderRow ? (
                  <ListItem component="div" disablePadding>
                    <ListItemButton>
                      <ListItemText primary={`${todoList.name}`} />
                    </ListItemButton>
                  </ListItem>
                ) : (
                  <ListItem component="div" disablePadding>
                    <ListItemButton>
                      <CircularProgress size={20} sx={{ mx: 'auto' }} />
                    </ListItemButton>
                  </ListItem>
                )}
              </Box>
            );
          })}
        </Box>
      </Box>
    </>
  );
}
