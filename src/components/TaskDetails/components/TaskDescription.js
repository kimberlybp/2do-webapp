import { useState, useEffect } from "react";
import { Typography, TextField, Box } from "@mui/material";
import { useDispatch } from "react-redux";

export default function TaskDescription(props) {
  const { task, updateTask } = props;
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState('');

  useEffect(() => {
    if (task) {
      setValue(task.description);
    }
  }, [task]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Box>
      {edit ?
        <TextField multiline rows={5} autoFocus size="small" fullWidth 
        defaultValue={task.description}
        placeholder="Add any extra notes you have here" 
        onChange={handleChange}
        onBlur={ () => {
            setEdit(false);
            dispatch(updateTask('description', value))
        }}
          sx={{
            "input": {
              margin: 0,
              fontWeight: 400,
              fontFamily: `"Nunito Sans","Helvetica","Arial",sans-serif`,
              fontSize: '1rem'
            }
          }} />
        : <Typography variant="body1" gutterBottom sx={{ minHeight: "120px", maxHeight: '120px', overflow: 'auto' }} onClick={() => setEdit(true)}>
          {task.description ? task.description : <i>Add any extra notes you have here</i>}
        </Typography>
      }
    </Box>
  )
}