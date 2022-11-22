import { Box } from '@mui/material';
import { grey, blue } from '@mui/material/colors';
import React from 'react';

type Props = {};

export const TodoList = (props: Props) => {
  return <Box sx={{ height: '100%', maxHeight: 800, minHeight: 400, width: 850, bgcolor: blue[200], display: 'flex', flexDirection: 'column', borderTopLeftRadius: 7 }}></Box>;
};
