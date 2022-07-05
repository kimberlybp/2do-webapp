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
import React from 'react';
import generateSecondLine from '../../../utils/generateSecondLine';


export default function TodoList(props) {
  const tasks = useSelector((state) => state.Task.tasks);
  
  const allTasks = useMemo(() => {
    return tasks;
  }, [tasks])

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {allTasks.map((value, index) => {
        const labelId = `checkbox-list-label-${value}`;
        if (!props.checked[index]) {
          return (
          <ListItem
            key={index}
            disablePadding
            sx={{ alignItems:'flex-start' }}
          >
              <ListItemIcon sx={{ minWidth: "23px" }}>
                <Checkbox
                  edge="start"
                  checked={false}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-label': 'controlled' }}
                  onChange={() => props.setChecked(index)}
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
          </ListItem>
          )}
          else {
            return null;
          }
      })}
    </List>
  );
}