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
import { DropdownButton } from "./button";
import { styled } from "@mui/material/styles";

const ButtonWords = styled(Typography)({
  fontSize: 18,
  color: "black",
  fontWeight: 550,
  marginLeft: "4%"
});

function ListActions() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "popper" : undefined;

  return (
    <Grid container>
      <Button variant="contained" onClick={handleClick}>
        List popper
      </Button>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <Box
          component={Paper}
          elevation={1}
          sx={{
            bgcolor: "white",
            width: 218,
            height: 127,
            alignItems: "center",
            display: "flex",
          }}
        >
          <Grid container>
            <Grid item xs={12}>
              <DropdownButton>
                <ButtonWords>Add Tasks</ButtonWords>
              </DropdownButton>
              <Divider sx={{ bgcolor: "black" }} />
            </Grid>
            <Grid item xs={12}>
              <DropdownButton>
                <ButtonWords>Rename</ButtonWords>
              </DropdownButton>
              <Divider sx={{ bgcolor: "black" }} />
            </Grid>
            <Grid item xs={12}>
              <DropdownButton>
                <Typography fontSize={18} color="#FA2222" fontWeight={550} sx={{ marginLeft: "4%" }}>
                  Delete Task List
                </Typography>
              </DropdownButton>
            </Grid>
          </Grid>
        </Box>
      </Popper>
    </Grid>
  );
};

function Profile() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "popper" : undefined;

  return (
    <Grid container>
      <Button variant="contained" onClick={handleClick}>
        Profile popper
      </Button>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <Box
          component={Paper}
          elevation={1}
          sx={{
            bgcolor: "white",
            width: 218,
            height: 127,
            alignItems: "center",
            display: "flex",
          }}
        >
          <Grid container>
            <Grid item xs={12}>
              <DropdownButton>
                <ButtonWords>View Profile</ButtonWords>
              </DropdownButton>
              <Divider sx={{ bgcolor: "black" }} />
            </Grid>
            <Grid item xs={12}>
              <DropdownButton>
                <ButtonWords>Settings</ButtonWords>
              </DropdownButton>
              <Divider sx={{ bgcolor: "black" }} />
            </Grid>
            <Grid item xs={12}>
              <DropdownButton>
              <ButtonWords>Logoout</ButtonWords>
              </DropdownButton>
            </Grid>
          </Grid>
        </Box>
      </Popper>
    </Grid>
  );
};

export { ListActions, Profile }