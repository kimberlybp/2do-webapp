import React from "react";
import { ClickAwayListener, Box, Grid, Button, Popper, Paper, Typography, List, ListItem, IconButton, ListItemText, ListItemIcon } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from '@mui/icons-material/Close';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const Words = styled(Typography)({
  fontSize: 16,
  color: "#2B3334",
  paddingLeft: '15px'
});

const Clear = styled(Typography)({
  fontSize: 14,
  color: "#2B3334",
  fontWeight: 800
});

const reminders = [
  {
    id: 0,
    title: 'Task 1 due in 15 minutes',
    time: '2 hours ago'
  },
  {
    id: 1,
    title: 'Task 2 due in 1 Day',
    time: '3 days ago'
  },
];

const tasksdue = [
  {
    id: 0,
    title: 'Task 5 due now',
    time: '2 hours ago'
  },
  {
    id: 1,
    title: 'Task 2 due now',
    time: '2 hours ago'
  },
];

export default function Notifs() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [reminds, setReminds] = React.useState(reminders);
  const [tasks, setTasks] = React.useState(tasksdue)

  function handleReminders(id) {
    
    const newList = reminds.filter((item) => item.id !== id );
    setReminds(newList);
  };

  const handleClearReminders = () => {
    setReminds([]);
  };

  function handleTasksDue(id) {
    
    const newList = tasks.filter((item) => item.id !== id );
    setTasks(newList);
  };

  const handleClearTasksDue = () => {
    setTasks([]);
  }

  const handleClickAway = () => {
    setOpen(false);
  };

  const handleClick = (event) => {
    setOpen((prev) => !prev);
    setAnchorEl(event.currentTarget);
  };

  const id = open ? "popper" : undefined;
  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Grid container>
        <Button onClick={handleClick}>
          <Typography color="black">
            Notifications
          </Typography>
        </Button>
        <Popper id={id} open={open} anchorEl={anchorEl}>
          <Box
            component={Paper}
            elevation={1}
            sx={{
              bgcolor: "white",
              width: { xs: '320px', md: '355px' },
              height: 'auto',
              alignItems: "stretch",
              justifyContent: "center",
              display: "flex",
              flexDirection: 'column'
            }}
          >
            <Grid container direction="column">
              <Grid item sx={{ mb: '5px', paddingLeft: '15px', paddingRight: '15px' }}>
                <Typography sx={{ fontSize: 18, fontWeight: 800, color: "#2B3334", mt: "15px" }}>
                  Notifications
                </Typography>
              </Grid>
              <Box sx={{ bgcolor: "#F5F3F3", height: '36px', display: 'flex', alignItems: 'center' }}>
                <Grid item xs={9.6}>
                  <Words>Reminders</Words>
                </Grid>
                <Button onClick={handleClearReminders}>
                  <Clear>CLEAR</Clear>
                </Button>
              </Box>
              <Grid container sx={{ paddingLeft: '15px', mt: '2px' }}>
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                  {reminds.map((value, index) => {
                    return (
                      <ListItem
                        key={index}
                        disablePadding
                        secondaryAction={
                          <IconButton edge="end" sx={{ mb: 2 }} onClick={() => handleReminders(value.id)}>
                            <CloseIcon />
                          </IconButton>
                        }
                      >
                        <ListItemIcon sx={{ mr: -2, mb: 2, color: '#FFC700' }}>
                          <ErrorOutlineIcon />
                        </ListItemIcon>
                        <ListItemText primary={`${value.title}`} secondary={`${value.time}`} />
                      </ListItem>
                    );
                  })}
                </List>
              </Grid>
              <Box sx={{ bgcolor: "#F5F3F3", height: '36px', display: 'flex', alignItems: 'center' }}>
                <Grid item xs={9.6}>
                  <Words>Tasks Due</Words>
                </Grid>
                <Button onClick={handleClearTasksDue}>
                  <Clear>CLEAR</Clear>
                </Button>
              </Box>
              <Grid container sx={{ paddingLeft: '15px', mt: '2px' }}>
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                  {tasks.map((value, index) => {
                    return (
                      <ListItem
                        key={index}
                        disablePadding
                        secondaryAction={
                          <IconButton edge="end" sx={{ mb: 2 }} onClick={() => handleTasksDue(value.id)}>
                            <CloseIcon />
                          </IconButton>
                        }
                      >
                        <ListItemIcon sx={{ mr: -2, mb: 2, color: "#FA2222" }}>
                          <ErrorOutlineIcon />
                        </ListItemIcon>
                        <ListItemText primary={`${value.title}`} secondary={`${value.time}`} />
                      </ListItem>
                    );
                  })}
                </List>
              </Grid>
            </Grid>
          </Box>
        </Popper>
      </Grid>
    </ClickAwayListener>
  )
};