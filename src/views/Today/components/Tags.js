import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { styled } from '@mui/material/styles';
import { Chip, Box, useTheme, Popover, Typography, Button } from '@mui/material';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import AddIcon from '@mui/icons-material/Add';
import { updateTaskParam } from "../../../_actions/TaskAction";
import TagsSearch from './TagsSearch';

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function Tags() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const currentTask = useSelector((state) => state.Task.currentTask);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleDelete = (chipToDelete) => () => {
    const updated = currentTask.tags.filter((chip) => chip.name !== chipToDelete.name);
    dispatch(updateTaskParam('tags', updated));
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

    const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  if(!currentTask.tags) return null;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'left',
        flexWrap: 'wrap',
        listStyle: 'none',
        p: 0,
        m: 0,
      }}
      component="ul"
    >
      {currentTask.tags.map((data, index) => {
        return (
          <ListItem key={index}>
            <Chip
              label={data.name}
              onDelete={handleDelete(data)}
              sx={{
                backgroundColor: data.color,
                color: `${theme.palette.getContrastText(data.color)} !important`
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
          <Box sx={{ p: 2, minWidth:'300px' }}>
            <Typography>Search or Create a Tag</Typography>
              <TagsSearch />
          </Box>
        </Popover>
      </ListItem>
    </Box>
    
  );
}
