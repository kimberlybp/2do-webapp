import * as React from 'react';
import { useSelector, useDispatch } from "react-redux";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import moment from 'moment';
import { Grid, useTheme, Box, Link, IconButton, Switch, FormControlLabel } from "@mui/material";
// import { styled } from "@mui/styles";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import generateGreetings from "../../utils/generateGreetings";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";
import AddIcon from '@mui/icons-material/Add';
import { updateTaskParam, toggleComplete, createTask } from "../../_actions/TaskAction";

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


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const currentTask = useSelector((state) => state.Task.currentTask);
  // const [open, setOpen] = React.useState(false);
  const { open, setOpen } = props;

  const handleAddSubtask = () => {
    const updated = currentTask.subtasks;
    const latestOrder = updated ? currentTask.subtasks[updated.length - 1]?.order + 1 ?? 1 : 1;
    updated.push({ order: latestOrder, title: "New Subtask", complete: false });
    dispatch(updateTaskParam('subtasks', updated));
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="sm"
        fullWidth
      >
        <DialogContent>
          {currentTask && <>
            <Box sx={{ display: "flex" }}>
              <Typography component="h1" variant="h5" gutterBottom
                sx={{ fontWeight: 700, color: theme.palette.primary.dark, mr: 1 }}>
                Create Task
              </Typography>
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
          </>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="secondary">Cancel</Button>
          <Button variant="contained" onClick={() => {dispatch(createTask()); setOpen(false)}}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
