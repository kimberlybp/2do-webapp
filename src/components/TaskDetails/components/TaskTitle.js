import { Box, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from "react-redux";

export default function TaskTitle(props) {
  const { task, updateTask, errorTrigger, resetErrorTrigger } = props;
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const { control, trigger, setValue, getValues, clearErrors } = useForm();

  useEffect(() => {
    if (!!task) {
      setValue("taskTitle", task.title);
      setEdit(false);
      clearErrors('taskTitle');
    }

    // eslint-disable-next-line
  }, [task]);

  useEffect(() => {
    if (!!errorTrigger) {
      setEdit(true);
      setTimeout(() => { //very slight delay needed to trigger react hook form error
        trigger("taskTitle");
        resetErrorTrigger();
      }, 1)
    }

    // eslint-disable-next-line
  }, [errorTrigger]);

  const handleOnBlur = async () => {
    const res = await trigger("taskTitle", { shouldFocus: true });
    if (res) {
      setEdit(false);
      dispatch(updateTask('title', getValues(["taskTitle"][0])))
    }
  }

  return (
    <Box>
      {edit ?
        <Box>
          <Controller name="taskTitle" control={control} defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField autoFocus size="small" fullWidth value={value} onChange={(e) => {
                onChange(e);
                trigger("taskTitle")
              }} placeholder="Task Title*"
                onBlur={() => handleOnBlur()}
                error={!!error} helperText={error ? error.message : null}
                sx={styles.textfield} />
            )}
            rules={{ required: 'Task title cannot be empty' }}
          />
        </Box>
        : <Typography variant="h4" onClick={() => setEdit(true)}>
          {task.title ?? "Task Title*"}
        </Typography>}
    </Box>
  )
}

const styles = {
  textfield: {
    marginLeft: '-10px',
    width: 'calc(100% + 20px)',
    "input": {
      margin: 0,
      fontWeight: 600,
      fontFamily: `"Nunito Sans","Helvetica","Arial",sans-serif`,
      fontSize: '2.125rem',
      padding: '0 10px'
    }
  },
  buttonGroup: {  
    width: '100%',
    justifyContent: 'flex-end'
  }
}