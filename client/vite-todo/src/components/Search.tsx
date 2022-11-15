import React from 'react';
import InputBase from '@mui/material/InputBase';
import { SearchInput } from '../ui/StyledInputs';
import { InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
type Props = {};

export const Search = (props: Props) => {
  return (
    <SearchInput
      placeholder="Search"
      //   endAdornment={
      //     <InputAdornment position="start">
      //       <SearchIcon />
      //     </InputAdornment>
      //   }
    />
  );
};
