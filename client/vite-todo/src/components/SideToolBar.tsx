import React, { useState } from 'react';
import { Avatar, Box, Typography, Divider, IconButton } from '@mui/material';
import { grey, deepPurple } from '@mui/material/colors';
import { Search } from './Search';
import { TodoList } from './VirtualizedList';
import { SearchInput } from '../ui/StyledInputs';
import AddIcon from '@mui/icons-material/Add';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addList } from '../api/axios';
import produce from 'immer';

export const SideToolBar = () => {
  const queryClient = useQueryClient();
  const [newListValue, setNewListValue] = useState('');
  const addListMutate = useMutation({
    mutationFn: addList,
    onSuccess: (data) => {
      queryClient.setQueryData(['lists'], (oldData: any) => {
        const lastPage = Math.ceil(oldData.pages[0].count / 20);
        if (lastPage > oldData.pages.length) return;
        const newData = produce(oldData, (draftState) => {
          draftState.pages[lastPage - 1].rows.push(data);
        });
        return newData;
      });
    },
  });

  const handleNewList = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newListValue) return;
    addListMutate.mutate(newListValue);

    setNewListValue('');
  };

  return (
    <Box sx={{ height: '100%', maxHeight: 800, minHeight: 400, width: 250, bgcolor: grey['A100'], display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flex: 1 }}>
        <Box sx={{ padding: 3, paddingBottom: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ bgcolor: deepPurple[500], marginRight: 3, width: 40, height: 40 }}>OL</Avatar>
            <Box>
              <Typography variant="h6" sx={{ lineHeight: 1 }}>
                ofir levy
              </Typography>
              <Typography color={grey[900]} variant="caption">
                ofirlevy6658@gmail.com
              </Typography>
            </Box>
          </Box>
          <Box sx={{ mt: 4 }} />
          <Search />
          <Box sx={{ mt: 3 }} />
          <Divider />
        </Box>
      </Box>
      <Box sx={{ flex: '6', minHeight: 200 }}>
        <TodoList />
      </Box>
      <Divider />
      <Box sx={{ flex: 0.5, display: 'flex', minHeight: '50px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }} component="form" onSubmit={handleNewList}>
          <IconButton type="submit">
            <AddIcon fontSize="small" sx={{ px: 1, cursor: 'pointer' }} />
          </IconButton>
          <SearchInput placeholder="New list" value={newListValue} onChange={(e) => setNewListValue(e.target.value)} />
        </Box>
      </Box>
    </Box>
  );
};
