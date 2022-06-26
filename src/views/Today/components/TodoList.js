import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import { TextField } from '@mui/material';

export default function CheckboxList(props) {
  const { subtask } = props;
  const [checked, setChecked] = React.useState([0]);

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
    console.log(value + " clicked");
  }


  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {[0, 1, 2, 3].map((value, index) => {
        const labelId = `checkbox-list-label-${value}`;
        return (
          <ListItem
            key={value}
            disablePadding
          >
            <ListItemButton role={undefined} onClick={onTaskClick(value)} dense disableRipple
              sx={{
                alignItems: (subtask ? 'center' : 'flex-start'),
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
              <ListItemText id={labelId} primary={`Line item ${value + 1}`} 
                secondary={subtask ? "" : "hello world"} />
            </ListItemButton>
          </ListItem>
        );
      })}
      {!subtask &&
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
      }
    </List>
  );
}