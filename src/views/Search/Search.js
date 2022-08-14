import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React from "react";
import Views from "./components/tabviews";
import SearchBar from "./components/searchbar";


const Search = () => {
  return (
    <Grid container sx={{ ml: "18%", mt: "1.5%" }}>
      <Grid item xs={12}>
        <SearchBar sampletasks={sampleTasks}></SearchBar>
      </Grid>
      <Grid item xs={12} sx={{ my: 2 }}>
        <Typography variant="h4" fontWeight="bold" letterSpacing={0.5}>
          Search Results
        </Typography>
        <Grid item xs={12}>
          <Views></Views>
        </Grid>
      </Grid>
    </Grid>
  );
};

const sampleTasks = [
  {
    id: 0,
    title: 'Finish & submit lab 3',
    tasklist: 'School',
    module: "CS2106",
    tag: "High"
  },
  {
    id: 1,
    title: "Finish assignment 3",
    tasklist: "School",
    module: "MA2001",
    tag: "High"
  },
  {
    id: 2,
    title: "Do tutorial 8",
    tasklist: "School",
    module: "MA2001",
    tag: "Medium"
  },
  {
    id: 3,
    title: "Buy muji pens",
    tasklist: "Random",
    module: "",
    tag: "Low"
  },
  {
    id: 4,
    title: "Email members about event",
    tasklist: "CCA",
    module: "",
    tag: "High"
  },
  {
    id: 5,
    title: "Watch 2 videos",
    tasklist: "Work",
    module: "",
    tag: "Medium"
  },
  {
    id: 6,
    title: "Do tutorial 7",
    tasklist: "School",
    module: "ST2131",
    tag: "Medium"
  }
];

export default Search;