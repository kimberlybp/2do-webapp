import { CircularProgress } from '@mui/material';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from "react-redux";
import { createTasklist } from '../../../_actions/TasklistAction';

const filter = createFilterOptions();

export default function TaskListDropdown(props) {
  const { task, updateTask } = props;
  const dispatch = useDispatch();
  const allTasklists = useSelector((state) => state.Tasklist.tasklists);
  const createTasklistLoading = useSelector((state) => state.Shared.loadingTasks['createTasklist']);

  return (
    <Autocomplete
      disabled={createTasklistLoading}
      size="small"
      value={task.tasklist}
      onChange={async (event, newValue) => {
        dispatch(updateTask('tasklist', null)); //to prevent create new tasklist to appear as selected option
        if (newValue && newValue.inputValue) {
          const newTasklist = await dispatch(createTasklist({ name: newValue.inputValue }));
          dispatch(updateTask('tasklist', newTasklist))
        } else {
          dispatch(updateTask('tasklist', newValue))
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue === option.name);
        if (inputValue !== '' && !isExisting) {
          filtered.push({
            inputValue,
            name: `Create new tasklist "${inputValue}"`,
          });
        }

        return filtered;
      }}
      isOptionEqualToValue={(option, value) => option._id === value._id}
      selectOnFocus
      options={allTasklists}
      getOptionLabel={(option) => `${option.name}`}
      renderOption={(props, option) => <li {...props}>{option.name}</li>}
      renderInput={(params) => (
        <TextField {...params} fullWidth placeholder={createTasklistLoading ? 'Loading new tasklist..' : 'Select a Task List'}
        InputProps={{
          ...params.InputProps,
          endAdornment: (
            <>
              {createTasklistLoading ? <CircularProgress color="inherit" size={20} sx={{ marginRight: "35px" }} /> : null}
              {params.InputProps.endAdornment}
            </>
          ),
        }}
         />
      )}
    />
  );
}
