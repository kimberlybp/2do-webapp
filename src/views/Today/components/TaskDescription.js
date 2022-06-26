import { useState, useEffect } from "react";
import { Typography, TextField, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { updateTaskParam } from "../../../_actions/TaskAction";

export default function TaskDescription(props) {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState('');
  const currentTask = useSelector((state) => state.Task.currentTask);

  useEffect(() => {
    if (currentTask) {
      setValue(currentTask.description);
    }
  }, [currentTask]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Box>
      {edit ?
        <TextField multiline rows={4} autoFocus size="small" fullWidth 
        defaultValue={currentTask.description}
        placeholder="Add any extra notes you have here" 
        onChange={handleChange}
        onBlur={ () => {
            setEdit(false);
            dispatch(updateTaskParam('description', value))
        }}
          sx={{
            "input": {
              margin: 0,
              fontWeight: 400,
              fontFamily: `"Nunito Sans","Helvetica","Arial",sans-serif`,
              fontSize: '1rem'
            }
          }} />
        : <Typography variant="body1" gutterBottom sx={{ minHeight: "100px" }} onClick={() => setEdit(true)}>
          {currentTask.description ? currentTask.description : <i>Add any extra notes you have here</i>}
        </Typography>
      }
    </Box>
  )
}