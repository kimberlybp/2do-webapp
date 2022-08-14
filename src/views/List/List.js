import { Box, Button, Divider, Grid, Paper, Skeleton, styled, Typography, FormHelperText } from "@mui/material";
import moment from 'moment';
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ReactComponent as NoTasksAdded } from '../../assets/images/no-tasks-added.svg';
import { ReactComponent as TasksCompleted } from '../../assets/images/tasks-completed.svg';
import { Switch, TaskDetails, TaskList } from "../../components";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";
import filterTasksByDate from "../../utils/filterTasksByDate";
import generateDateNextHour from "../../utils/generateDateNextHour";
import generateGreetings from "../../utils/generateGreetings";
import { selectTask } from "../../_actions/TaskAction";


export default function List(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentTask = useSelector((state) => state.Task.currentTask);
  const tasks = useSelector((state) => state.Task.tasks);
  const tasklists = useSelector((state) => state.Tasklist.tasklists);
  const userId = useSelector((state) => state.User.userId);
  const [showCompleted, setShowCompleted] = useState(false);
  const [currentTasklist, setCurrentTasklist] = useState(null);
  const { tasklistId } = useParams();

  useEffect(() => {
    dispatch(selectTask(null)); //unselect any task chosen
    if (tasklists && userId !== "init") {
      const res = tasklists.find(t => t._id === tasklistId);
      if (!res) navigate('/today');
      else setCurrentTasklist(res);
    }
  }, [tasklistId, tasklists])

  const handleSwitch = (checked) => {
    setShowCompleted(checked);
  };

  const getListTasks = () => {
    return tasks.filter(t => t.tasklist && t.tasklist._id === currentTasklist._id)
  }

  // const listTasks = useMemo(() => {
  //   if (tasks) return tasks.filter(t => t.tasklist && t.tasklist._id === currentTasklist._id)
  //   return [];
  // }, [tasks])

  const filtered = useMemo(() => {
    if (tasks && currentTasklist) {
      const filtered = getListTasks()
      const sorted = filtered.sort((a, b) => {
        if (a.dueDate && b.dueDate) return a.dueDate.getTime() - b.dueDate.getTime()
        return 1;
      });
      const updated = showCompleted ? sorted : sorted.filter(t => t.complete === false);
      return updated;
    }
    return [];
    // eslint-disable-next-line
  }, [tasks, showCompleted, currentTasklist]);

  const allCompleted = useMemo(() => {
    if (tasks && currentTasklist) {
      const filtered = getListTasks()
      return (filtered.length > 0 && filtered.findIndex(t => !t.complete) === -1);
    } return false
    // eslint-disable-next-line
  }, [filtered])

  const generateNoTasksPlaceholder = () => {

    if (tasks && currentTasklist) {
      const tasklistTasks = getListTasks()

      if (tasklistTasks.length === 0 && !allCompleted) {
        return (
          <Box textAlign="center">
            <NoTasksAdded />
            <Typography>No tasks added for this list yet</Typography>
          </Box>
        )
      } else if (allCompleted) {
        return (
          <Box textAlign="center">
            <TasksCompleted />
            <Typography>You've completed all the tasks in this list!</Typography>
            <Typography variant="body2" sx={{ color: '#6D6D6D' }}>Feel free to add more tasks here</Typography>
          </Box>
        )
      }
    }
  }

  return (
    <Grid container sx={{ px: "30px" }}>
      <Grid item xs={12} sx={{ mb: "-0.5%" }}>
        <Typography component="div" variant="h6">
          Task List
        </Typography>
      </Grid>
      <Grid item xs={12} sx={{ mb: 1 }}>
        <Box display="flex" alignItems="baseline">
          <Typography component="h1" variant="h4">
            {currentTasklist ? currentTasklist.name : "Searching for tasklist.."}
          </Typography> &nbsp;
          {tasks && currentTasklist && <Typography>
            {getListTasks().filter(t => t.complete).length}/{getListTasks().length} Complete
          </Typography>}
        </Box>
      </Grid>
      <Grid item xs={12}
        sx={{ padding: "25px", mb: "100px" }}
        component={Paper}
        elevation={2}>
        <Grid container sx={{ minHeight: "75vh" }}>
          <Grid item xs={12} lg={5.99} sx={styles.leftGridContainer}>
            <Switch checked={showCompleted} onCheck={handleSwitch} label="Show Completed Tasks" />
            <TaskList tasks={filtered} noTasksPlaceholder={generateNoTasksPlaceholder()} quickCreateParams={{ tasklist: currentTasklist }} />
          </Grid>
          <Grid item md={0.01}>
            <Divider orientation="vertical" />
          </Grid>
          <Grid item xs={12} lg={6} sx={{ px: "25px", display: { lg: "inline", xs: "none" } }}>
            <TaskDetails task={currentTask} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

const styles = {
  leftGridContainer: {
    width: '100%',
    // maxHeight: '740px', 
    overflow: 'scroll',
    paddingRight: '25px',
    '::-webkit-scrollbar': {
      height: '6px',
      width: '6px',
    },
    '::-webkit-scrollbar-track': {
      marginX: '10px',
    },
    '::-webkit-scrollbar-thumb': {
      background: 'rgba(0, 0, 0, 0.08)',
      borderRadius: '20px',
    },
  }
}



