import {
  Button,
  Box,
  Grid,
  Typography,
  Popper,
  Paper,
  Divider,
} from "@mui/material";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Words = styled(Typography)({
  fontWeight:550,
  fontSize:18,
  marginLeft:"4%"
});

const NewSelect = styled(Select)({
  backgroundColor:'#f5f3f3',
  height: 36
});

function GroupDropdown() {
  const [selectGroup, setselectGroup] = useState("");

  const handleChange = (event) => {
    setselectGroup(event.target.value);
  };

  return (
    <Box sx={{ width:259 }}>
      <FormControl fullWidth>
        <NewSelect
          variant="standard"
          disableUnderline
          value={selectGroup}
          onChange={handleChange}
        >
          <MenuItem value={"None"}><Words>None</Words></MenuItem>
          <MenuItem value={"Collection"}><Words>Collection</Words></MenuItem>
          <MenuItem value={"Tags"}><Words>Tags</Words></MenuItem>
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
            width: 328,
            height: 134,
            display: "flex",
            borderRadius:3
          }}
        >
          <Grid container direction="column" sx={{ ml: '6%' }}>
            <Grid item sx={{ my:"4%" }}>
              <Typography color="black" fontSize={18} fontWeight={700}>
              Group by
              </Typography>
            </Grid>
            <Grid item>
              <GroupDropdown/>
            </Grid>
          </Grid>
        </Box>
      </Popper>
    </Grid>
  );
};


export { Groupby }