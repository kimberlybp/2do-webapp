import { Box, List, TextField, Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useMemo } from 'react';
import { useDispatch, useSelector } from "react-redux";
import generateSecondLine from '../../utils/generateSecondLine';
import { selectTask, toggleComplete } from "../../_actions/TaskAction";

export default function TaskList(props) {
  const { tasks, noTasksPlaceholder } = props;
  const dispatch = useDispatch();
  const currentTask = useSelector((state) => state.Task.currentTask);

  const handleChecked = (value, event) => {
    event.stopPropagation();
    dispatch(toggleComplete(value.id));
  };

  const onTaskClick = (value) => () => {
    dispatch(selectTask(value));
  }

  const onBlur = (event) => {
    //call api first then, add to redux store
  }

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {tasks.map((value, index) => {
        const labelId = `checkbox-list-label-${value}`;
        return (
          <ListItem
            key={index}
            disablePadding
          >
            <ListItemButton role={undefined} onClick={onTaskClick(value)} dense disableRipple
              selected={currentTask && currentTask.id === value.id}
              sx={{
                alignItems: 'flex-start',
                ".MuiListItemText-primary": {
                  color: "#2B3334",
                  fontWeight: 700,
                  fontSize: "20px"
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: "23px" }}>
                <Checkbox
                  edge="start"
                  checked={value.complete}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                  onClick={(e) => handleChecked(value, e)}
                />
              </ListItemIcon>
              <ListItemText id={labelId}
                primary={<Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
                  {value.title}</Typography>}
                disableTypography
                secondary={
                  <Box display="flex" sx={{ placeItems: 'center', color: "#6D6D6D",fontSize: "14px", maxWidth: "100%" }}>
                    { generateSecondLine(value) }
                  </Box>
                } />
            </ListItemButton>
          </ListItem>
        );
      })}
      <ListItem>
        <ListItemIcon sx={{ minWidth: "23px" }}>
          <Checkbox
            edge="start"
            disableRipple
            disabled
          />
        </ListItemIcon>
        <TextField variant="standard" fullWidth 
        onBlur={e => onBlur(e)}
        disabled
        placeholder='Quick add a task here!' />
      </ListItem>
      {tasks.length === 0 && noTasksPlaceholder}
    </List>
  );
}