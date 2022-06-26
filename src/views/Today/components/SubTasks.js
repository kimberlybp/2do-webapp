import { useState, useEffect, useMemo, Fragment } from 'react';
import { useSelector, useDispatch } from "react-redux";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import CloseIcon from '@mui/icons-material/Close';
import { TextField, Typography } from '@mui/material';
import { updateTaskParam } from "../../../_actions/TaskAction";


export default function SubTasks(props) {
  const dispatch = useDispatch();
  const [editIndex, setEditIndex] = useState(-1);
  const currentTask = useSelector((state) => state.Task.currentTask);

  const subtasks = useMemo(() => {
    return currentTask.subtasks;
  }, [currentTask])

  const handleChecked = (value, event) => {
    event.stopPropagation();
    const index = currentTask.subtasks.findIndex(s => s.order === value.order)
    const updated = currentTask.subtasks;
    const prev = updated[index];
    updated[index] = { ...prev, complete: !(prev.complete) }
    dispatch(updateTaskParam('subtasks', updated));
  };

  const handleDelete = (subtaskToDelete) => {
    const updated = currentTask.subtasks.filter((s) => s.order !== subtaskToDelete.order);
    dispatch(updateTaskParam('subtasks', updated));
  }

  const onBlur = (event, subtaskToUpdate) => {
    setEditIndex(-1);
    const index = currentTask.subtasks.findIndex(s => s.order === subtaskToUpdate.order)
    const updated = currentTask.subtasks;
    updated[index] = { ...updated[index], title: event.target.value }
    dispatch(updateTaskParam('subtasks', updated));
  }

  if(!subtasks) return null;

  return (
    <Fragment>
      {subtasks.length === 0 && <Typography fontStyle='italic'>No subtasks yet</Typography>}
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {subtasks.map((value, index) => {
          const labelId = `checkbox-list-label-${value}`;
          return (
            <ListItem
              key={index}
              disablePadding
              secondaryAction={
                <IconButton edge="end" onClick={() => handleDelete(value)}>
                  <CloseIcon />
                </IconButton>
              }
            >
              <ListItemButton role={undefined} dense disableRipple
                onClick={() => setEditIndex(value.order)}
                sx={{
                  alignItems: ('center'),
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
                {
                  editIndex === value.order ?
                    <TextField fullWidth size="small" onBlur={e => onBlur(e, value)}
                      defaultValue={value.title} autoFocus
                      sx={{
                        "input": {
                          fontWeight: 700,
                          fontFamily: `"Nunito Sans","Helvetica","Arial",sans-serif`,
                          fontSize: '20px',
                          color: '#2B3334'
                        }
                      }} /> :
                    <ListItemText id={labelId} primary={`${value.title}`}
                      onClick={() => setEditIndex(value.order)} />
                }
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Fragment>
  );
}