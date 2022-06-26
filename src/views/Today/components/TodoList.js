import { useState, useMemo } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { List, Box, Typography } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import { TextField } from '@mui/material';
import moment from 'moment';
import { selectTask } from "../../../_actions/TaskAction";


export default function CheckboxList(props) {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState([0]);
  const tasks = useSelector((state) => state.Task.tasks);
  const currentTask = useSelector((state) => state.Task.currentTask);

  const allTasks = useMemo(() => {
    return tasks;
  }, [tasks])


  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const onTaskClick = (value) => () => {
    dispatch(selectTask(value));
  }

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {allTasks.map((value, index) => {
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
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                  onClick={handleToggle(value)}
                />
              </ListItemIcon>
              <ListItemText id={labelId}
                primary={<Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
                  {value.title}</Typography>}
                disableTypography
                secondary={
                  <Box display="flex" sx={{ placeItems: 'center', color: "#6D6D6D" }}>
                    {value.tags && value.tags.map((tag, i) => {
                      return <Box sx={{
                        width: "15px",
                        height: "15px",
                        backgroundColor: tag.color,
                        borderRadius: '5px',
                      }} />
                    })
                    }
                    &nbsp;|&nbsp;{value.taskList ? value.taskList : ""}&nbsp;|&nbsp;{value.module ? value.module.moduleCode : ""}&nbsp;|&nbsp;{value.dueDate ? `Due ${moment(value.dueDate).calendar()}` : ""}
                    &nbsp;|&nbsp;{value.subtasks &&
                      <>
                        {value.subtasks.filter(s => s.complete).length}\{value.subtasks.length}
                        <FormatListBulletedIcon sx={{ fontSize: "15px" }} />
                      </>
                    }
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
        <TextField variant="standard" fullWidth placeholder='Quick add a task here!' />
      </ListItem>
    </List>
  );
}