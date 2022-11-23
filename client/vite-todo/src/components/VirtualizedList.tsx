import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
// import { FixedSizeList } from 'react-window';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getList } from '../api/axios';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { CircularProgress } from '@mui/material';

export function TodoList() {
  const { ref, inView } = useInView();

  const { status, data, error, isFetching, isFetchingNextPage, isFetchingPreviousPage, fetchNextPage, fetchPreviousPage, hasNextPage, hasPreviousPage } = useInfiniteQuery(['lists'], getList, {
    getPreviousPageParam: (firstPage, allPages) => (allPages.length > 1 ? allPages.length - 1 : undefined),
    getNextPageParam: (lastPage, allPages) => {
      const limit = 20;
      const lastPageNum = Math.ceil(lastPage.count / limit);
      return lastPageNum > allPages.length ? allPages.length + 1 : undefined;
    },
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <>
      <Box sx={{ width: '100%', height: '100%', overflowY: 'scroll' }}>
        {data?.pages.map((page, i) => (
          <React.Fragment key={i}>
            {page.rows.map((list) => (
              <ListItem component="div" disablePadding key={list.id}>
                <ListItemButton>
                  <ListItemText primary={`${list.name}`} />
                </ListItemButton>
              </ListItem>
            ))}
          </React.Fragment>
        ))}
        {hasNextPage && (
          <ListItem component="div" disablePadding ref={ref}>
            <ListItemButton sx={{ height: 48 }}>
              <CircularProgress size={20} sx={{ mx: 'auto' }} />
            </ListItemButton>
          </ListItem>
        )}
      </Box>
    </>
  );
}
