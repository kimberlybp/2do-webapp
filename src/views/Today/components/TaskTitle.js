import { useState, useEffect } from "react";
import { Typography, TextField, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useForm, Controller } from 'react-hook-form';
import { updateTaskParam } from "../../../_actions/TaskAction";

export default function TaskTitle(props) {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const { control, trigger, setValue, getValues } = useForm();
  const currentTask = useSelector((state) => state.Task.currentTask);

  useEffect(() => {
    if (currentTask) {
      setValue("taskTitle", currentTask.title)
    }
  }, [currentTask]);

  return (
    <Box>
      {edit ?
      <Controller name="taskTitle" control={control} defaultValue=""
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField autoFocus size="small" fullWidth value={value} onChange={(e) => {
          onChange(e);
          trigger("taskTitle")
        }} placeholder="Task Title" 
        onBlur={async () => {
          const res = await trigger("taskTitle", { shouldFocus: true });
          if(res) {
            setEdit(false);
            dispatch(updateTaskParam('title', getValues(["taskTitle"])))
          }
        }}
          error={!!error} helperText={error ? error.message : null}
          sx={{
            "input": {
              margin: 0,
              fontWeight: 600,
              fontFamily: `"Nunito Sans","Helvetica","Arial",sans-serif`,
              fontSize: '2.125rem'
            }
          }} />
      )}
      rules={{ required: 'Task title cannot be empty' }}
        />
        : <Typography variant="h4" onClick={() => setEdit(true)}>
          {currentTask.title}
        </Typography>}
    </Box>
  )
}