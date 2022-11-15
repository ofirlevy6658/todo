import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList, ListChildComponentProps } from 'react-window';

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
  return (
    <Box sx={{ width: '100%', height: 500, overflowY: 'scroll' }}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23].map((e, index) => (
        <ListItem key={index} component="div" disablePadding>
          <ListItemButton>
            <ListItemText primary={`Item ${index + 1}`} />
          </ListItemButton>
        </ListItem>
      ))}
    </Box>
  );
}
