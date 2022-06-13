import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React from "react";
import SampleTasks from "./sampletasks.json";
import Views from "./components/tabviews";
import SearchBar from "./components/searchbar";


const Search = () => {
  return (
    <Grid container sx={{ ml: "18%", mt: "1.5%" }}>
      <Grid item xs={12}>
        <SearchBar sampletasks={SampleTasks}></SearchBar>
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

export default Search;