import React, { useState } from "react";
import moment from "moment";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { TextField, Box, InputAdornment, IconButton } from "@mui/material";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { ClickAwayListener } from "@mui/material";

const DateRangePicker = () => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection"
    }
  ]);
  
  const handleOnChange = (ranges) => {
    const { selection } = ranges;
    setState([selection]);
  };

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const formatDate = (date) => moment(date).format("ll");
  const Endate =
    state[0].endDate === null
      ? formatDate(state[0].startDate)
      : formatDate(state[0].endDate);
  const startDate = state[0].startDate ? formatDate(state[0].startDate) : "";
  
  return (
    <>
    <ClickAwayListener onClickAway={handleClickAway}>
    <Box>
      <TextField disabled fullWidth size="small" onClick={handleClick}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" sx={{ ml:-1 }}>
              <IconButton>
                <CalendarTodayIcon />
              </IconButton>
              {state[0].startDate !== "" && state[0].endDate !== "" && (
                <Box>
                  {startDate} {"to "}
                  {Endate}
                </Box>
              )}
            </InputAdornment>
          )
        }}
      >
      </TextField>
      {open && (
        //<Box style={{ zIndex:100, position:'absolute' }}>
        <DateRange
          onChange={handleOnChange}
          moveRangeOnFirstSelection={false}
          ranges={state}
          rangeColors={['#7134EB']}
          style={{ width:'inherit' }}
        />
        //</Box>
      )}
      </Box>
      </ClickAwayListener>
    </>
  );
};

export default DateRangePicker;
