import {
  Button, Box, Grid, Typography, Checkbox, List, ListItem, ListItemIcon, ListItemText, Divider
} from "@mui/material";
import generateSecondLine from "../../utils/generateSecondLine";
import React, { useMemo } from "react";
import TaskSearch from "./components/TaskSearch";
import Dialog from '@mui/material/Dialog';
import useTheme from "@mui/material/styles/useTheme";
import TodoList from "./components/TodoList";
import { useSelector } from "react-redux";


function AddTaskList(props) {
  const theme = useTheme();
  const tasks = useSelector((state) => state.Task.tasks);
  const allTasks = useMemo(() => {
    return tasks;
  }, [tasks])

  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const [checked, setChecked] = React.useState(
    new Array(allTasks.length).fill(false)
  );

  const handleChange = (pos) => {
    const updatedChecked = checked.map((value, index) =>
      index === pos ? !value : value
    );

    setChecked(updatedChecked);
  }

  return (
    <Grid container sx={{ ml: '30px' }}>
      <Dialog maxWidth="500px" onClose={handleClose} open={open}>
        <Box
          display="flex"
          sx={{
            bgcolor: "white",
            width: 'fit-content',
            minWidth: { lg: '850px' },
            height: 'auto',
            flexDirection: 'column'
          }}
        >
          <Box display="flex" sx={{ flexDirection: { xs: 'column', lg: 'row' }, minHeight: '50vh' }}>
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
              <TodoList setChecked={handleChange} checked={checked} />
              <Divider sx={{ bgcolor: '#c2c2c2', borderBottomWidth: { xs: 2, lg: 0 } }} />
            </Grid>
            <Grid container sx={{ pb: "15px", pt: { xs: "0px", lg: "15px" }, display: "flex" }}>
              <Divider sx={{ borderRightWidth: 2 }}
                orientation="vertical"
              />
              <Grid item sx={{ ml: '15px' }}>
                <Typography fontSize={18}>
                  Selected Tasks
                </Typography>
                <Box sx={{ pr: '15px' }}>
                  <List>
                    {allTasks.map((value, index) => {
                      if (checked[index]) {
                        return (
                          <ListItem
                            disablePadding
                            sx={{ alignItems: 'flex-start' }}
                          >
                            <ListItemIcon sx={{ minWidth: "23px" }} >
                              <Checkbox
                                edge="start"
                                checked={true}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-label': 'controlled' }}
                                onChange={() => handleChange(index)}
                              />
                            </ListItemIcon>
                            <ListItemText
                              primary={<Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
                                {value.title}</Typography>}
                              disableTypography
                              secondary={
                                <Box display="flex" sx={{ placeItems: 'center', color: "#6D6D6D", fontSize: "14px", maxWidth: "100%" }}>
                                  {generateSecondLine(value)}
                                </Box>
                              } />
                          </ListItem>
                        )
                      }
                      else {
                        return null;
                      }
                    })}
                  </List>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Grid container display="flex" alignItems="flex-end">
            <Box display="flex" sx={{ bgcolor: "#F8F8F8", width: 'inherit', mr: '25px', height: '65px', justifyContent: "flex-end", alignItems: 'center', borderBottomLeftRadius: 4 }}>
              <Button variant="contained" onClick={handleClose} sx={{
                height: '40px', bgcolor: "#E6E6E6", mr: '6px', ':hover': {
                  bgcolor: '#D0D0D0'
                },
              }}>
                <Typography color="#2B3334" fontSize={15} sx={{ mx: '20px' }}>
                  Cancel
                </Typography>
              </Button>
              <Button variant="contained" sx={{ height: '40px', bgcolor: `${theme.palette.primary.main}` }}>
                <Typography color="#fff" fontSize={15} sx={{ mx: '20px' }}>
                  Continue
                </Typography>
              </Button>
            </Box>
          </Grid>
        </Box>
      </Dialog>
    </Grid>
  )
};

export default function AddTaskListDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <Grid container>
      <Button onClick={handleClickOpen}>Add Tasks</Button>
      <AddTaskList
        open={open}
        onClose={handleClose}
      />
    </Grid>
  )
}