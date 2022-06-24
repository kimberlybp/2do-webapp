import {
  Button,
  Box,
  Grid,
  Typography,
  Popper,
  Paper,
  Divider,
} from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import { ListActions, Profile } from "./components/dropdowns";
import { Groupby } from "./components/groupsort"

export default function Popups() {
  return (
    <Grid container>
      <ListActions />
      <Profile />
      <Groupby />
    </Grid>
  );
}
