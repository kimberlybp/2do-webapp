import { TextField, InputAdornment, Box, Typography, Grid, Divider, Paper } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useState, useMemo, useRef } from "react";
import { useSelector } from "react-redux";

export default function TaskSearch() {
  const tasks = useSelector((state) => state.Task.tasks);
  const allTasks = useMemo(() => {
    return tasks;
  }, [tasks]);
  const ref = useRef();
  const [filteredTask, setFilteredTask] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (e) => {
    const searchWord = e.target.value;
    setWordEntered(searchWord);
    const newFilter = allTasks.filter((value) => {
      if (value.title.toLowerCase().includes(searchWord.toLowerCase())) {
        return value.title.toLowerCase().includes(searchWord.toLowerCase());
      }
    });

    if (searchWord === "") {
      setFilteredTask([]);
    } else {
      setFilteredTask(newFilter);
    }
  };

  return (
    <Grid container ref={ref}>
    <TextField
      fullWidth
      onChange={handleFilter}
      value={wordEntered}
      id="standard-search"
      placeholder="Search for Tasks"
      type="search"
      variant="standard"
      size="small"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <FilterListIcon/> {/*replace with popper*/}
          </InputAdornment>
        )
      }}
    />
    <Box component={Paper} elevation={1} sx={{ width:'47%', mt:'30px', position:'absolute', zIndex:2, maxHeight:'25vh', overflow:"auto"  }} >
    {filteredTask.length !== 0 && (
      <div>
        {filteredTask.slice(0, 10).map((value, index) => {
          return (
            <Grid container
              direction="column"
              key={index}
            >
              <Typography fontWeight={600} sx={{ ml: "30px", my:'3px' }}>
                {value.title}
              </Typography>
              <Divider/>
            </Grid>
          );
        })}
      </div>
    )}
    </Box>
    </Grid>
  )
    }