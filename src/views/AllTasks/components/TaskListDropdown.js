import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function TaskListDropDown() {
  const [value, setValue] = React.useState(1);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
      <FormControl fullWidth>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          onChange={handleChange}
          sx={{ fontSize: "18px"}}
          size="small"
        >
          <MenuItem value={1}>School</MenuItem>
          <MenuItem value={2}>Work</MenuItem>
        </Select>
      </FormControl>
  );
}
