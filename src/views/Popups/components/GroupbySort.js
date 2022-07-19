import {
  Box,
  Grid,
  Typography,
  Popper,
  Paper,
  IconButton,
  Tooltip, ClickAwayListener
} from "@mui/material";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import createStyles from "@mui/styles/createStyles";
import { makeStyles } from "@mui/styles";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';

const useStyles = makeStyles(() =>
  createStyles({
    rotateIcon: {
      transform: "rotate(270deg)"
    }
  })
);

const Words = styled(Typography)({
  fontWeight: 550,
  color: "black",
  marginLeft: "4%"
});

const NewSelect = styled(Select)({
  backgroundColor: '#f5f3f3',
  height: 36
});

const Options = styled(MenuItem)(
  ({ theme }) => `
:hover {
  color:  ${theme.palette.primary.main}
  }
`,
);

function GroupDropdown() {
  const [selectGroup, setselectGroup] = useState("");

  const handleChange = (event) => {
    setselectGroup(event.target.value);
  };

  return (
    <Box sx={{ width: '259px' }}>
      <FormControl fullWidth>
        <NewSelect
          variant="standard"
          disableUnderline
          value={selectGroup}
          onChange={handleChange}
        >
          <Options divider={true} value={"None"}><Words>None</Words></Options>
          <Options divider={true} value={"Collection"}><Words>Collection</Words></Options>
          <Options value={"Tags"}><Words>Tags</Words></Options>
        </NewSelect>
      </FormControl>
    </Box>
  );
};

function SortDropdown() {
  const [selectSort, setselectSort] = useState("");

  const handleChange = (event) => {
    setselectSort(event.target.value);
  };

  return (
    <Box sx={{ width: 'inherit' }}>
      <FormControl fullWidth>
        <NewSelect
          variant="standard"
          disableUnderline
          value={selectSort}
          onChange={handleChange}
        >
          <Options value={"Date Updated"}><Words>Date Updated</Words></Options>
          <Options value={"Date Created"}><Words>Date Created</Words></Options>
          <Options value={"Task Title"}><Words>Task Title</Words></Options>
        </NewSelect>
      </FormControl>
    </Box>
  );
};

function OrderDropdown() {
  const [selectOrder, setselectOrder] = useState("");

  const handleChange = (event) => {
    setselectOrder(event.target.value);
  };

  return (
    <Box sx={{ width: 'inherit' }}>
      <FormControl fullWidth>
        <NewSelect
          variant="standard"
          disableUnderline
          value={selectOrder}
          onChange={handleChange}
        >
          <Options value={"Ascending"}><Words>Ascending</Words></Options>
          <Options value={"Descending"}><Words>Descending</Words></Options>
        </NewSelect>
      </FormControl>
    </Box>
  );
};


function Groupby() {
  const classes = useStyles();
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
    <ClickAwayListener mouseEvent="onMouseUp" onClickAway={handleClickAway}>
      <Grid container>
        <Tooltip title="Group by">
          <IconButton onClick={handleClick}>
            <ViewQuiltIcon className={classes.rotateIcon} />
          </IconButton>
        </Tooltip>
        <Popper id={id} open={open} anchorEl={anchorEl}>
          <Box
            component={Paper}
            elevation={1}
            sx={{
              bgcolor: "white",
              width: '328px',
              height: '134px',
              display: "flex",
              borderRadius: 3
            }}
          >
            <Grid container direction="column" sx={{ ml: '6%' }}>
              <Grid item sx={{ my: "4%" }}>
                <Typography color="black" fontSize={18} fontWeight={700}>
                  Group by
                </Typography>
              </Grid>
              <Grid item>
                <GroupDropdown />
              </Grid>
            </Grid>
          </Box>
        </Popper>
      </Grid>
    </ClickAwayListener>
  );
};


function Sort() {
  const classes = useStyles();

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
    <ClickAwayListener mouseEvent="onMouseUp" onClickAway={handleClickAway}>
      <Grid container>
        <Tooltip title="Sort">
          <IconButton onClick={handleClick}>
            <CompareArrowsOutlinedIcon className={classes.rotateIcon} />
          </IconButton>
        </Tooltip>
        <Popper id={id} open={open} anchorEl={anchorEl}>
          <Box
            component={Paper}
            elevation={1}
            sx={{
              bgcolor: "white",
              width: { xs: '280px', md: '573px' },
              height: '134px',
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              borderRadius: 3
            }}
          >
            <Grid container direction="column" sx={{ width: "95%" }}>
              <Grid item sx={{ my: '15px' }}>
                <Typography color="black" fontSize={18} fontWeight={700}>
                  Sort by
                </Typography>
              </Grid>
              <Grid container direction="row" columnSpacing={{ xs: 1, md: 2.5 }}>
                <Grid item xs={6}>
                  <SortDropdown />
                </Grid>
                <Grid item xs={6}>
                  <OrderDropdown />
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Popper>
      </Grid>
    </ClickAwayListener>
  );
};

export { Groupby, Sort };
