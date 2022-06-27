import React, { useState } from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


const NewSelect = styled(Select)({
  backgroundColor:'#f5f3f3',
  height: 36
});

const Words = styled(Typography)({
  fontWeight:550,
  marginLeft:"4%"
});


export default function SelectTaskList() {
  const [selectTaskList, setselectTaskList] = useState("");

  const handleChange = (event) => {
    setselectTaskList(event.target.value);
  };

  return (
    <Box sx={{ minWidth: "100%", height:36 }}>
      <FormControl fullWidth>
        <NewSelect
          variant="standard"
          disableUnderline
          value={selectTaskList}
          label="Task List"
          onChange={handleChange}
          IconComponent = {KeyboardArrowDownIcon}
          sx={{ borderRadius:1, mr:'2%' }}
        >
          <MenuItem value={"School"}><Words>School</Words></MenuItem>
          <MenuItem value={"Work"}><Words>Work</Words></MenuItem>
          <MenuItem value={"CCA"}><Words>CCA</Words></MenuItem>
          <MenuItem value={"Random"}><Words>Random</Words></MenuItem>
        </NewSelect>
      </FormControl>
    </Box>
  );
}