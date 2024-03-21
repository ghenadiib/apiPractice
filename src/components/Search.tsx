import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useEffect } from "react";

export default function Search({
  search,
  setSearch,
}: {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) {
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const searchTerm = params.get("q");
    if (searchTerm) {
      setSearch(searchTerm);
    } else {
      console.log("No search parameter found in the URL.");
    }
  });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
      window.history.replaceState(null, "", `/search?q=${event.target.value}`);
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 3, width: "50ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-controlled"
        label="Search"
        value={search}
        onChange={handleSearch}
      />
    </Box>
  );
}
