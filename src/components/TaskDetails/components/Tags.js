import { useState } from 'react';
import { useDispatch } from "react-redux";
import AddIcon from '@mui/icons-material/Add';
import { Box, Chip, Popover, Typography, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import TagsSearch from './TagsSearch';

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function Tags(props) {
  const { task, updateTask } = props;
  const dispatch = useDispatch();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleDelete = (chipToDelete) => () => {
    const updated = task.tags.filter((chip) => chip.name !== chipToDelete.name);
    dispatch(updateTask('tags', updated));
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  // if (!task.tags) return null;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'left',
        flexWrap: 'wrap',
        listStyle: 'none',
        p: 0,
        m: 0,
        "& >li":{
          marginLeft: 0
        }
      }}
      component="ul"
    >
      {task.tags && task.tags.map((data, index) => {
        return (
          <ListItem key={index}>
            <Chip
              label={data.name}
              onDelete={handleDelete(data)}
              sx={{
                backgroundColor: data.colour,
                color: `${theme.palette.getContrastText(data.colour)} !important`
              }}
            />
          </ListItem>
        );
      })}
      <ListItem key='add'>
        <Chip
          label="Add Tag"
          variant="outlined"
          onClick={handleClick}
          icon={<AddIcon />}
        />
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Box sx={{ p: 2, minWidth: '300px' }}>
            <Typography variant='body1' fontWeight={700}>Search or Create a Tag</Typography>
            <TagsSearch updateTask={updateTask} task={task} />
          </Box>
        </Popover>
      </ListItem>
    </Box>

  );
}
