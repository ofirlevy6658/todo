import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getTodos } from '../api/axios';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

function renderRow(props: ListChildComponentProps) {
  const { index, style } = props;
  console.log(index);
  console.log(style);
  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton>
        <ListItemText primary={`Item ${index + 1}`} />
      </ListItemButton>
    </ListItem>
  );
}

export function VirtualizedList() {
  const { ref, inView } = useInView();

  const { status, data, error, isFetching, isFetchingNextPage, isFetchingPreviousPage, fetchNextPage, fetchPreviousPage, hasNextPage, hasPreviousPage } = useInfiniteQuery(['projects'], getTodos, {
    getPreviousPageParam: (firstPage) => firstPage.currentPage ?? undefined,
    getNextPageParam: (lastPage) => lastPage.currentPage ?? undefined,
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);
  console.log(data);
  return (
    <Box sx={{ width: '100%', height: '100%', overflowY: 'scroll' }}>
      {data?.pages.map((list, index) => (
        <ListItem key={index} component="div" disablePadding>
          <ListItemButton>
            <ListItemText primary={`Item ${index + 1}`} />
          </ListItemButton>
        </ListItem>
      ))}
    </Box>
  );
}
