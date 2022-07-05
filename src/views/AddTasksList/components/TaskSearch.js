import { TextField, Autocomplete, InputAdornment, Box, Typography, Grid, Divider, Paper } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useState, useMemo, useRef } from "react";
import { useSelector } from "react-redux";


export default function TaskSearch() {
  const tasks = useSelector((state) => state.Task.tasks);
  const allTasks = useMemo(() => {
    return tasks;
  }, [tasks]);

  return (
    <Autocomplete
      freeSolo
      id="free-solo-2-demo"
      disableClearable
      options={allTasks.map((option) => option.title)}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search for Tasks"
          type="search"
          variant="standard"
          autoFocus
          size="small"
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <FilterListIcon /> {/*replace with popper*/}
              </InputAdornment>
            )
          }}
        />
      )}
    />
  )
}