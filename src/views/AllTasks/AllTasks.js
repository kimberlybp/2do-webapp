import { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from 'moment';
import { Grid, useTheme, Box, Button, Link, IconButton, Switch, FormControlLabel } from "@mui/material";
// import { styled } from "@mui/styles";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import generateGreetings from "../../utils/generateGreetings";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";
import AddIcon from '@mui/icons-material/Add';
import { updateTaskParam, toggleComplete } from "../../_actions/TaskAction";

import TodoList from './components/TodoList';
import SubTasks from './components/SubTasks';
import TaskListDropdown from './components/TaskListDropdown';
import ModuleSearch from './components/ModuleSearch';
import TaskTitle from './components/TaskTitle';
import TaskDescription from './components/TaskDescription';
import Status from './components/Status';
import Tags from './components/Tags';
import DueDate from './components/DueDate';

import { ReactComponent as NusModsLogo } from '../../assets/icons/nusmods.svg';

// const ReminderButton = styled(Button)(({ theme }) => ({
//   color: `#2F80ED !important`,
//   backgroundColor: "#F5F3F3 !important",
//   fontWeight: "700 !important",
//   justifyContent: "left !important"
// }));

export default function AllTasks() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const firstName = useSelector((state) => state.User.firstName);
  const currentTask = useSelector((state) => state.Task.currentTask);
  const tasks = useSelector((state) => state.Task.tasks);
  const [showCompleted, setShowCompleted] = useState(false); 

  const handleAddSubtask = () => {
    const updated = currentTask.subtasks;
    const latestOrder = currentTask.subtasks[updated.length - 1]?.order + 1 ?? 1;
    updated.push({ order: latestOrder, title: "New Subtask", complete: false });
    dispatch(updateTaskParam('subtasks', updated));
  }

  const handleSwitch = (event) => {
    setShowCompleted(event.target.checked);
  };

  const filtered = useMemo(() => {
    if (tasks) return showCompleted ? tasks : tasks.filter(t => t.complete === false);
    return [];
  }, [tasks]);

  return (
    <Grid container sx={{ px: "30px" }}>
      <Grid item xs={12} sx={{ mb: "-0.5%" }}>
        <Typography component="h1" variant="h4"  sx={{ marginBottom: "10px" }}>
          All Tasks
        </Typography>
      </Grid>
      <Grid item xs={12}
        sx={{ padding: "25px", mb: "100px" }}
        component={Paper}
        elevation={2}>
        <Grid container sx={{ minHeight: "75vh" }}>
          <Grid item xs={12} lg={5.5}>
            <FormControlLabel
              control={
                <Switch checked={showCompleted} onChange={handleSwitch} name="completed" />
              }
              label="Show Completed Tasks"
            />
            <TodoList tasks={filtered} />
          </Grid>
          <Grid item md={0.5}>
            <Divider
              orientation="vertical"
            />
          </Grid>
          <Grid item xs={12} lg={6} sx={{ px: "25px", display: { lg: "inline", xs: "none" } }}>
            {currentTask && !currentTask.create &&
              <>
                <Box sx={{ display: "flex" }}>
                  <Typography component="h1" variant="h5" gutterBottom
                    sx={{ fontWeight: 700, color: theme.palette.primary.dark, mr: 1 }}>
                    Task details
                  </Typography>
                  <Status />
                  <div style={{ flexGrow: 1 }}></div>
                </Box>
                {/* {!currentTask.saved && <Typography>Task has been edited, remember to save</Typography>} */}
                <TaskTitle />
                <Tags />
                <Typography variant="h6" gutterBottom
                  sx={{ fontWeight: 700, color: "#6D6D6D", mt: "10px" }}>
                  Task Description
                </Typography>
                <TaskDescription />
                <Box display="flex">
                  <Typography variant="h6" gutterBottom
                    sx={{ fontWeight: 700, color: "#6D6D6D", mt: "10px", flexGrow: 1 }}>
                    Subtasks
                  </Typography>
                  <IconButton onClick={() => handleAddSubtask()}>
                    <AddIcon />
                  </IconButton>
                </Box>
                <SubTasks />
                <Grid container spacing={2} sx={{ mb: "18px" }}>
                  <Grid item xs={12} lg={6}>
                    <Typography variant="h6" gutterBottom
                      sx={{ fontWeight: 700, color: "#6D6D6D", mt: "10px" }}>
                      Due Date
                    </Typography>
                    <DueDate />
                    {/* <DateButton fullWidth>{moment().format('DD MMMM YYYY, h:mm A')}</DateButton> */}
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Typography variant="h6" gutterBottom
                      sx={{ fontWeight: 700, color: "#6D6D6D", mt: "10px" }}>
                      Task List
                    </Typography>
                    <TaskListDropdown />
                  </Grid>
                </Grid>
                <Divider />
                {/* <Typography variant="h6" gutterBottom
              sx={{ fontWeight: 700, color: "#6D6D6D", mt: "10px" }}>
              Deadline
            </Typography>
            <ReminderButton fullWidth>{moment().format('DD MMMM YYYY, h:mm A')}</ReminderButton> */}
                <Typography variant="h6"
                  sx={{ fontWeight: 700, color: "#6D6D6D", mt: "10px" }}>
                  Link to Module
                </Typography>
                <Typography variant="subtitle1" gutterBottom component="div" sx={{ color: "#6D6D6D" }}>
                  from <Link href="https://nusmods.com/" target="_blank">
                    <NusModsLogo style={{ maxWidth: "80px" }} />
                  </Link>
                </Typography>
                <ModuleSearch />

                <Typography variant="caption" display="block" sx={{ mt: "50px", fontStyle: "italic", color: "#6D6D6D" }}>
                  Created on 1 May 2022, Monday 2:49 PM
                </Typography>
                <Typography variant="caption" display="block" sx={{ fontStyle: "italic", color: "#6D6D6D" }} gutterBottom>
                  Updated on 1 May 2022, Monday 2:49 PM
                </Typography>
                <Divider />

                <Grid container spacing={2} sx={{ padding: 1 }}>
                  <Grid item xs={12} lg={6}>
                    <Button color="error" fullWidth>Delete Task</Button>
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Button color="primary"
                      fullWidth
                      onClick={() => {dispatch(toggleComplete(currentTask.id))}}>
                      {
                        currentTask.complete ? "Mark as Incomplete" : "Mark as Complete"
                      }
                    </Button>
                  </Grid>
                </Grid>
              </>
            }
            {(!currentTask || currentTask.create) &&
              <>
                <Typography component="h1" variant="h5" gutterBottom
                  sx={{ fontWeight: 700, color: theme.palette.primary.dark, mr: 1 }}>
                  Task details
                </Typography>
                <Typography>No task selected.</Typography>
              </>}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}


