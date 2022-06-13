import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import React, { useState } from "react";

export default function SelectTaskList() {
  const [selectTaskList, setselectTaskList] = useState("");

  const handleChange = (event) => {
    setselectTaskList(event.target.value);
  };

  return (
    <Box sx={{ minWidth: "100%" }} size="small">
      <FormControl fullWidth sx={{ height: 0 }}>
        <Select
          size="small"
          variant="filled"
          disableUnderline
          value={selectTaskList}
          label="Task List"
          onChange={handleChange}
        >
          <MenuItem value={"School"}>School</MenuItem>
          <MenuItem value={"Work"}>Work</MenuItem>
          <MenuItem value={"CCA"}>CCA</MenuItem>
          <MenuItem value={"Random"}>Random</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
