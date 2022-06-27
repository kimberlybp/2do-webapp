import * as React from 'react';
import TextField from '@mui/material/TextField';
import { useSelector, useDispatch } from "react-redux";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { updateTaskParam } from "../../../_actions/TaskAction";

export default function DueDate() {
  const dispatch = useDispatch();
  const currentTask = useSelector((state) => state.Task.currentTask);

  const handleChange = (newDate) => {
    dispatch(updateTaskParam('dueDate', newDate))
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
        <DateTimePicker
          value={currentTask.dueDate}
          onChange={handleChange}
          renderInput={(params) => <TextField size='small' fullWidth {...params} />}
        />
    </LocalizationProvider>
  );
}
