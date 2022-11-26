import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { grey, blue } from '@mui/material/colors';
import { useParams } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getTodos } from '../api/axios';
import { Stack } from '@mui/system';
import WallpaperIcon from '@mui/icons-material/Wallpaper';

type Props = {};

export const TodoList = (props: Props) => {
  const { id } = useParams();
  const { status, data, error, isFetching, isFetchingNextPage, isFetchingPreviousPage, fetchNextPage, fetchPreviousPage, hasNextPage, hasPreviousPage } = useInfiniteQuery(
    ['todos', id],
    () => getTodos({ pageParam: 1, id }),
    {
      getPreviousPageParam: (firstPage, allPages) => (allPages.length > 1 ? allPages.length - 1 : undefined),
      getNextPageParam: (lastPage, allPages) => {
        const limit = 20;
        const lastPageNum = Math.ceil(lastPage.count / limit);
        return lastPageNum > allPages.length ? allPages.length + 1 : undefined;
      },
    }
  );

  return (
    <Box sx={{ height: '100%', maxHeight: 800, minHeight: 400, width: 850, bgcolor: blue[200], display: 'flex', flexDirection: 'column', borderTopLeftRadius: 7 }}>
      <Box sx={{ padding: 8 }}>
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Box>
            <Typography color="white" variant="h4">
              My Day
            </Typography>
          </Box>
          <Box>
            <IconButton aria-label="delete">
              <WallpaperIcon sx={{ fontSize: 35 }} />
            </IconButton>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};
