import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


export default function Search({search , setSearch} : {search : string ; setSearch : React.Dispatch<React.SetStateAction<string>>}) {


  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 3, width: '50ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-controlled"
        label="Search"
        value={search}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setSearch(event.target.value);
          }}
      />
    </Box>
  );
}