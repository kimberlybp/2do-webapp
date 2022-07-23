import TextField from '@mui/material/TextField';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useDispatch } from "react-redux";

export default function DueDate(props) {
  const { task, updateTask } = props;
  const dispatch = useDispatch();

  const handleChange = (newDate) => {
    dispatch(updateTask('dueDate', newDate.toDate()));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
        <DateTimePicker
          value={task.dueDate}
          onChange={handleChange}
          renderInput={(params) => <TextField placeholder='Enter a due date' size='small' fullWidth {...params}
          />}
        />
    </LocalizationProvider>
  );
}
