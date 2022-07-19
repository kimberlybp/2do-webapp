import { Grid } from "@mui/material";
import React from "react";
import { ListActions, Profile, TagActions } from "./components/Dropdowns";
import { Groupby, Sort } from "./components/GroupbySort";
import Filter from "./components/Filter";
import Notifs from "./components/Notifications";

export default function Popups() {
  return (
    <Grid container>
      <ListActions />
      <Profile />
      <TagActions />
      <Groupby />
      <Sort />
      <Filter />
      <Notifs />
    </Grid>
  );
}
