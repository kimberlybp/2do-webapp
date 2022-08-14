import { Box, List, TextField, Typography, Divider } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useDispatch, useSelector } from "react-redux";
import generateSecondLine from '../../utils/generateSecondLine';
import { quickCreateTask, selectTask, toggleTaskComplete } from "../../_actions/TaskAction";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Fragment, useState } from 'react';
import generateDateNextHour from '../../utils/generateDateNextHour';

export default function TaskList(props) {
  const { tasks, noTasksPlaceholder, quickCreateParams } = props;
  const dispatch = useDispatch();
  const [quickTitle, setQuickTitle] = useState("");
  const currentTask = useSelector((state) => state.Task.currentTask);
  const createTaskLoading = useSelector((state) => state.Shared.loadingTasks['createTask']);

  const handleChecked = (value, event) => {
    event.stopPropagation();
    dispatch(toggleTaskComplete(value));
  };

  const onTaskClick = (value) => () => {
    if(currentTask && currentTask.id === value.id) dispatch(selectTask(null))
    else dispatch(selectTask(value));
  }

  const onBlur = async (event) => {
    if (!!event.target.value.trim()) {
      const res = await dispatch(quickCreateTask(event.target.value, quickCreateParams))
      setQuickTitle("");
      dispatch(selectTask(res))
    }
  }

  const handleChange = (event) => {
    setQuickTitle(event.target.value);
  };

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {tasks.map((value, index) => {
        const labelId = `checkbox-list-label-${value}`;
        return (
          <Fragment key={index}>
          <ListItem disablePadding>
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
                  icon={<RadioButtonUncheckedIcon style={{ height: 26, width: 26 }} />}
                  checkedIcon={<CheckCircleIcon style={{ height: 26, width: 26 }} />}
                  edge="start"
                  checked={value.complete}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                  onClick={(e) => handleChecked(value, e)}
                />
              </ListItemIcon>
              <ListItemText key={`item-iT-${index}`} id={labelId}
                primary={<Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
                  {value.title}</Typography>}
                disableTypography
                secondary={
                  <Box display="flex" sx={{ placeItems: 'center', color: "#6D6D6D",fontSize: "14px", maxWidth: "100%" }}>
                    { generateSecondLine(value) }
                  </Box>
                } 
                />
            </ListItemButton>
          </ListItem>
          <Divider component="li" />
          </Fragment>
        );
      })}
      <ListItem key={0}>
        <ListItemIcon sx={{ minWidth: "23px" }}>
          <Checkbox
            icon={<RadioButtonUncheckedIcon style={{ height: 26, width: 26 }} />}
            checkedIcon={<CheckCircleIcon style={{ height: 26, width: 26 }} />}
            edge="start"
            disableRipple
            disabled
          />
        </ListItemIcon>
        <TextField value={quickTitle} variant="standard" fullWidth
          onBlur={onBlur}
          disabled={createTaskLoading ?? false}
          placeholder='Quick add a task here!' 
          onChange={handleChange}
          />
      </ListItem>
      {tasks.length === 0 && noTasksPlaceholder}
    </List>
  );
}