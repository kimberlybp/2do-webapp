import {
  Button,
  Box,
  Grid,
  Typography,
  Popper,
  Paper
} from "@mui/material";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Words = styled(Typography)({
  fontWeight: 550,
  fontSize: 18,
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

  & .MuiMenuItem-divider {
    color: #000;
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
}

function SortDropdown() {
  const [selectSort, setselectSort] = useState("");

  const handleChange = (event) => {
    setselectSort(event.target.value);
  };

  return (
    <Box sx={{ width: '259px' }}>
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
}

function OrderDropdown() {
  const [selectOrder, setselectOrder] = useState("");

  const handleChange = (event) => {
    setselectOrder(event.target.value);
  };

  return (
    <Box sx={{ width: '259px' }}>
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
}


function Groupby() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "popper" : undefined;

  return (
    <Grid container>
      <Button variant="contained" onClick={handleClick}>
        Group by popper
      </Button>
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
  );
};


function Sort() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "popper" : undefined;

  return (
    <Grid container>
      <Button variant="contained" onClick={handleClick}>
        Sort popper
      </Button>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <Box
          component={Paper}
          elevation={1}
          sx={{
            bgcolor: "white",
            width: { xs: '280px', md: '573px' },
            height: '134px',
            display: "flex",
            borderRadius: 3
          }}
        >
          <Grid container direction="column" sx={{ ml: '3%' }}>
            <Grid item sx={{ my: "2.5%" }}>
              <Typography color="black" fontSize={18} fontWeight={700}>
                Sort by
              </Typography>
            </Grid>
            <Grid container direction="row" columnSpacing={2.5} rowSpacing={1}>
              <Grid item>
                <SortDropdown />
              </Grid>
              <Grid item>
                <OrderDropdown />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Popper>
    </Grid>
  );
};

export { Groupby, Sort };
