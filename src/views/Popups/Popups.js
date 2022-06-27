import { Grid } from "@mui/material";
import React from "react";
import { ListActions, Profile } from "./components/dropdowns";
import { Groupby, Sort } from "./components/groupsort"

export default function Popups() {
  return (
    <Grid container>
      <ListActions />
      <Profile />
      <Groupby />
      <Sort />
    </Grid>
  );
}
