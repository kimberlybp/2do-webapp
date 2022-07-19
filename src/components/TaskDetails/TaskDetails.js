import { Box, Grid, IconButton, Link, useTheme, FormHelperText } from "@mui/material";
import { useMemo } from 'react';
import { useDispatch } from "react-redux";
import AddIcon from '@mui/icons-material/Add';
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import DueDate from './components/DueDate';
import ModuleSearch from './components/ModuleSearch';
import SubTasks from './components/SubTasks';
import Tags from './components/Tags';
import TaskDescription from './components/TaskDescription';
import TaskListDropdown from './components/TaskListDropdown';
import TaskTitle from './components/TaskTitle';
import Status from './components/Status';
import { updateExistingTask, updateNewTask } from "../../_actions/TaskAction";

import { ReactComponent as NusModsLogo } from '../../assets/icons/nusmods.svg';

export default function TaskDetails(props) {
  const { task, errorTrigger, resetErrorTrigger } = props;
  const theme = useTheme();
  const dispatch = useDispatch();

  const updateTask = useMemo(() => {
    if(!!task.id) return updateExistingTask;
    else return updateNewTask;
  }, [task]);

  const isExistingTask = useMemo(() => {
    return !!task.id
  }, [task]);

  const handleAddSubtask = () => {
    const updated = task.subtasks;
    const latestOrder = updated ? task.subtasks[updated.length - 1]?.order + 1 ?? 1 : 1;
    updated.push({ order: latestOrder, title: "New Subtask", complete: false });
    dispatch(updateTask('subtasks', updated));
  }

  return (
    <>
      <Box display="flex">
        <Typography component="h1" variant="h5" gutterBottom
          sx={{ fontWeight: 700, color: theme.palette.primary.dark, mr: 1 }}>
          {!task.id ? "Create Task" : "Task Details"}
        </Typography>
        {isExistingTask && <Status />}
        <Box sx={{ flexGrow: 1 }}></Box>
      </Box>
      <TaskTitle updateTask={updateTask} task={task} errorTrigger={errorTrigger} resetErrorTrigger={resetErrorTrigger}/>
      <Tags updateTask={updateTask} task={task} />
      <Typography variant="h6" gutterBottom
        sx={{ fontWeight: 700, color: "#6D6D6D", mt: "10px" }}>
        Task Description
      </Typography>
      <TaskDescription updateTask={updateTask} task={task} />
      <Box display="flex">
        <Typography variant="h6" gutterBottom
          sx={{ fontWeight: 700, color: "#6D6D6D", mt: "10px", flexGrow: 1 }}>
          Subtasks
        </Typography>
        <IconButton onClick={() => handleAddSubtask()}>
          <AddIcon />
        </IconButton>
      </Box>
      <SubTasks updateTask={updateTask} task={task} />
      <Grid container spacing={2} sx={{ mb: "18px" }}>
        <Grid item xs={12} lg={6}>
          <Typography variant="h6" gutterBottom
            sx={{ fontWeight: 700, color: "#6D6D6D", mt: "10px" }}>
            Due Date
          </Typography>
          <DueDate updateTask={updateTask} task={task} />
          {/* <DateButton fullWidth>{moment().format('DD MMMM YYYY, h:mm A')}</DateButton> */}
        </Grid>
        <Grid item xs={12} lg={6}>
          <Typography variant="h6" gutterBottom
            sx={{ fontWeight: 700, color: "#6D6D6D", mt: "10px" }}>
            Task List
          </Typography>
          <TaskListDropdown updateTask={updateTask} task={task} />
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
      <ModuleSearch updateTask={updateTask} task={task} />

      {isExistingTask && 
      <>
      <Typography variant="caption" display="block" sx={{ mt: "50px", fontStyle: "italic", color: "#6D6D6D" }}>
        Created on 1 May 2022, Monday 2:49 PM
      </Typography>
      <Typography variant="caption" display="block" sx={{ fontStyle: "italic", color: "#6D6D6D" }} gutterBottom>
        Updated on 1 May 2022, Monday 2:49 PM
      </Typography>
      <Divider />
      </>}
    </>
  );
}
