import {
  Button,
  Box,
  Grid,
  Typography,
  Popper,
  Paper,
  Divider
} from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import ClickAwayListener from '@mui/base/ClickAwayListener';


const ButtonWords = styled(Typography)({
  fontSize: 18,
  color: "black",
  fontWeight: 550,
  marginLeft: "4%"
});

const DropdownButton = styled(Button)({
  width: "100%",
  display: "flex",
  justifyContent: "flex-start",
});

function ListActions() {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);


  const handleClickAway = () => {
    setOpen(false);
  };

  const handleClick = (event) => {
    setOpen((prev) => !prev);
    setAnchorEl(event.currentTarget);
  };
  const id = open ? "popper" : undefined;

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Grid container>
        <Button onClick={handleClick}>
          <Typography color="black">List Actions</Typography>
        </Button>
        <Popper id={id} open={open} anchorEl={anchorEl}>
          <Box
            component={Paper}
            elevation={1}
            sx={{
              bgcolor: "white",
              width: {xs:'170px', sm:'218px'},
              height: '127px',
              alignItems: "center",
              display: "flex",
            }}
          >
            <Grid container>
              <Grid item xs={12}>
                <DropdownButton>
                  <ButtonWords>Add Tasks</ButtonWords>
                </DropdownButton>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <DropdownButton>
                  <ButtonWords>Rename</ButtonWords>
                </DropdownButton>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <DropdownButton>
                  <Typography fontSize={18} color="error" fontWeight={550} sx={{ marginLeft: "4%" }}>
                    Delete Task List
                  </Typography>
                </DropdownButton>
              </Grid>
            </Grid>
          </Box>
        </Popper>
      </Grid>
    </ClickAwayListener>
  );
};

function Profile() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);


  const handleClickAway = () => {
    setOpen(false);
  };

  const handleClick = (event) => {
    setOpen((prev) => !prev);
    setAnchorEl(event.currentTarget);
  };
  const id = open ? "popper" : undefined;

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Grid container>
        <Button onClick={handleClick}>
          <Typography color="black">Profile</Typography>
        </Button>
        <Popper id={id} open={open} anchorEl={anchorEl}>
          <Box
            component={Paper}
            elevation={1}
            sx={{
              bgcolor: "white",
              width: {xs:'150px', sm:'218px'},
              height: '127px',
              alignItems: "center",
              display: "flex",
            }}
          >
            <Grid container>
              <Grid item xs={12}>
                <DropdownButton>
                  <ButtonWords>View Profile</ButtonWords>
                </DropdownButton>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <DropdownButton>
                  <ButtonWords>Settings</ButtonWords>
                </DropdownButton>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <DropdownButton>
                  <ButtonWords>Logout</ButtonWords>
                </DropdownButton>
              </Grid>
            </Grid>
          </Box>
        </Popper>
      </Grid>
    </ClickAwayListener>
  );
};

function TagActions() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);


  const handleClickAway = () => {
    setOpen(false);
  };

  const handleClick = (event) => {
    setOpen((prev) => !prev);
    setAnchorEl(event.currentTarget);
  };
  const id = open ? "popper" : undefined;

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Grid container>
        <Button onClick={handleClick}>
          <Typography color="black">Tag Actions</Typography>
        </Button>
        <Popper id={id} open={open} anchorEl={anchorEl}>
          <Box
            component={Paper}
            elevation={1}
            sx={{
              bgcolor: "white",
              width: {xs:'150px', sm:'218px'},
              height: '127px',
              alignItems: "center",
              display: "flex",
            }}
          >
            <Grid container>
              <Grid item xs={12}>
                <DropdownButton>
                  <ButtonWords>Add Tasks</ButtonWords>
                </DropdownButton>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <DropdownButton>
                  <ButtonWords>Edit Tag</ButtonWords>
                </DropdownButton>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <DropdownButton>
                  <Typography fontSize={18} color="error" fontWeight={550} sx={{ marginLeft: "4%" }}>
                    Delete Tag
                  </Typography>
                </DropdownButton>
              </Grid>
            </Grid>
          </Box>
        </Popper>
      </Grid>
    </ClickAwayListener>
  );
};

export { ListActions, Profile, TagActions }