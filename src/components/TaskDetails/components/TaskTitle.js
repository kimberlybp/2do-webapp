import { useState, useEffect } from "react";
import { Typography, TextField, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { useForm, Controller } from 'react-hook-form';

export default function TaskTitle(props) {
  const { task, updateTask } = props;
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const { control, trigger, setValue, getValues } = useForm();

  useEffect(() => {
    if (!!task) {
      setValue("taskTitle", task.title)
    }

    // eslint-disable-next-line
  }, [task]);

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
            dispatch(updateTask('title', getValues(["taskTitle"][0])))
          }
        }}
          error={!!error} helperText={error ? error.message : null}
          sx={styles.textfield} />
      )}
      rules={{ required: 'Task title cannot be empty' }}
        />
        : <Typography variant="h4" onClick={() => setEdit(true)}>
          {task.title}
        </Typography>}
    </Box>
  )
}

const styles = {
  textfield: {
    "input": {
      margin: 0,
      fontWeight: 600,
      fontFamily: `"Nunito Sans","Helvetica","Arial",sans-serif`,
      fontSize: '2.125rem'
    }
  }
}