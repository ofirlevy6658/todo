import React from 'react';
import { Box } from '@mui/material';
import { grey, blue } from '@mui/material/colors';
import { useParams } from 'react-router-dom';

type Props = {};

export const Todo = (props: Props) => {
  const { id } = useParams();

  return <Box sx={{ height: '100%', maxHeight: 800, minHeight: 400, width: 850, bgcolor: blue[200], display: 'flex', flexDirection: 'column', borderTopLeftRadius: 7 }}></Box>;
};
