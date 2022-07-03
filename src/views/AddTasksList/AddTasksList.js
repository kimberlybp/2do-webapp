import {
  Button, Box, Grid, Typography, Popper, Paper,
  IconButton, List, ListItem, ListItemIcon, ListItemText, ListItemButton,
  Tooltip, ClickAwayListener, Divider
} from "@mui/material";
import generateSecondLine from "../../utils/generateSecondLine";
import React, { useState } from "react";
import TaskSearch from "./components/TaskSearch";
import { styled } from "@mui/material/styles";
import createStyles from "@mui/styles/createStyles";
import { makeStyles } from "@mui/styles";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import useTheme from "@mui/material/styles/useTheme";
import TodoList from "./components/TodoList";
import { useSelector, useDispatch } from "react-redux";


export default function AddTaskList() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const currentTask = useSelector((state) => state.Task.currentTask);
  const tasks = useSelector((state) => state.Task.tasks);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);


  const handleClickAway = () => {
    setOpen(false);
  };

  const handleClick = (event) => {
    setOpen((prev) => !prev);
    setAnchorEl(event.currentTarget);
  };
  const id = open ? "popper" : undefined;

  return (
    <ClickAwayListener mouseEvent="onMouseUp" onClickAway={handleClickAway}>
      <Grid container sx={{ ml:'30px' }}>
        <Button onClick={handleClick}>
          Add tasks
        </Button>
        <Popper id={id} open={open} anchorEl={anchorEl} placement="bottom-start">
          <Box
            component={Paper}
            elevation={1}
            display="flex"
            sx={{
              bgcolor: "white",
              minWidth: {lg:'850px'},
              height: 'auto',
              flexDirection: 'column'
            }}
          >
            <Box display="flex" sx={{ flexDirection: 'row', minHeight: '55vh' }}>
              <Grid container
                justifyContent="flex-start"
                display="flex" sx={{ flexDirection: 'column', padding: '15px' }}>
                <Typography color={`${theme.palette.primary.main}`} fontWeight={700} fontSize={20}>
                  Add Tasks to "Work" Collection
                </Typography>
                <Grid item sx={{ my: '2px' }}>
                  <TaskSearch />
                </Grid>
                <Grid item>
                  <Typography fontWeight={700} color="#6D6D6D">
                    All Tasks
                  </Typography>
                </Grid>
                <TodoList />
              </Grid>
              <Grid container sx={{ py: "15px", display: { lg: "flex", xs: "none" } }}>
                <Divider sx={{ borderRightWidth: 2 }}
                  orientation="vertical"
                />
                <Grid item sx={{ ml:'15px' }}>
                  <Typography fontSize={18}>
                    Selected Tasks
                  </Typography>
                {currentTask &&
                  <>
                    <List>
                      <ListItem
                        //key={index}
                        disablePadding
                      >
                        <ListItemIcon sx={{ minWidth: "23px" }}>
                        </ListItemIcon>
                        <ListItemText
                          primary={<Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
                            {currentTask.title}</Typography>}
                          disableTypography
                          secondary={
                            <Box display="flex" sx={{ placeItems: 'center', color: "#6D6D6D", fontSize: "14px", maxWidth: "100%" }}>
                              {generateSecondLine(currentTask)}
                            </Box>
                          } />
                      </ListItem>
                    </List>
                  </>
                }
              </Grid>
              </Grid>
            </Box>
            <Grid container display="flex" alignItems="flex-end">
              <Box display="flex" sx={{ bgcolor: "#F8F8F8", width: 'inherit', mr: '25px', height: '65px', justifyContent: "flex-end", alignItems: 'center', borderBottomLeftRadius:4 }}>
                <Button variant="contained" sx={{
                  height:'40px', bgcolor: "#E6E6E6", mr: '6px', ':hover': {
                    bgcolor: '#D0D0D0'
                  },
                }}>
                  <Typography color="#2B3334" fontSize={15} sx={{ mx: '20px' }}>
                    Cancel
                  </Typography>
                </Button>
                <Button variant="contained" sx={{ height:'40px', bgcolor: `${theme.palette.primary.main}` }}>
                  <Typography color="#fff" fontSize={15} sx={{ mx: '20px' }}>
                    Continue
                  </Typography>
                </Button>
              </Box>
            </Grid>
          </Box>
        </Popper>
      </Grid>
    </ClickAwayListener>
  )
};