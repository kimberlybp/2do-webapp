import { useMemo } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { List, Box, Typography } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import { TextField } from '@mui/material';
import moment from 'moment';
import { selectTask, toggleComplete, save } from "../../../_actions/TaskAction";
import generateSecondLine from '../../../utils/generateSecondLine';

export default function TodoList(props) {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.Task.tasks);
  //const tasks = props.tasks;
  const currentTask = useSelector((state) => state.Task.currentTask);

  const allTasks = useMemo(() => {
    return tasks;
  }, [tasks])

  const handleChecked = (value, event) => {
    event.stopPropagation();
    dispatch(toggleComplete(value.id));
  };

  const handleChange = (value, event) => {
    event.stopPropagation();
    dispatch(save(value.id));
  };

  const onTaskClick = (value) => () => {
    dispatch(selectTask(value));
  }

  const onBlur = (event) => {
    //call api first then, add to redux store
  }

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {allTasks.map((value, index) => {
        const labelId = `checkbox-list-label-${value}`;
        return (
          <ListItem
            key={index}
            disablePadding
            sx={{ alignItems:'flex-start' }}
          >
            {/*<ListItemButton role={undefined} onClick={onTaskClick(value)} dense disableRipple
              selected={currentTask && currentTask.id === value.id}
              sx={{
                alignItems: 'flex-start',
                ".MuiListItemText-primary": {
                  color: "#2B3334",
                  fontWeight: 700,
                  fontSize: "20px"
                }
              }}
            >*/}
              <ListItemIcon sx={{ minWidth: "23px" }}>
                <Checkbox
                  edge="start"
                  checked={currentTask && currentTask.id === value.id}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                  onClick={onTaskClick(value)}
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
            {/*</ListItemButton>*/}
          </ListItem>
        );
      })}
      {/*<ListItem>
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
      </ListItem>*/}
    </List>
  );
}