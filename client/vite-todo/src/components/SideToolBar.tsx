import React from 'react';
import { Avatar, Box, Typography, Divider, IconButton } from '@mui/material';
import { grey, deepPurple } from '@mui/material/colors';
import { Search } from './Search';
import { TodoList } from './VirtualizedList';
import AddIcon from '@mui/icons-material/Add';
import { SearchInput } from '../ui/StyledInputs';

export const SideToolBar = () => {
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
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
          <AddIcon fontSize="small" sx={{ px: 1, cursor: 'pointer' }} />
          <SearchInput placeholder="New list" />
        </Box>
      </Box>
    </Box>
  );
};
