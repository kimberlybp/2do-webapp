import { FormControlLabel, Grid, Divider, Paper, Typography, Box } from "@mui/material";
import moment from 'moment';
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";
import generateGreetings from "../../utils/generateGreetings";
import { updateTaskParam } from "../../_actions/TaskAction";
import { TaskDetails, TaskList, Switch } from "../../components";
import filterTasksByDate from "../../utils/filterTasksByDate";
import { ReactComponent as NoTasksAdded } from '../../assets/images/no-tasks-added.svg';
import { ReactComponent as TasksCompleted } from '../../assets/images/tasks-completed.svg';

export default function Today() {
  const firstName = useSelector((state) => state.User.firstName);
  const currentTask = useSelector((state) => state.Task.currentTask);
  const tasks = useSelector((state) => state.Task.tasks);
  const [showCompleted, setShowCompleted] = useState(false);

  const handleSwitch = (checked) => {
    setShowCompleted(checked);
  };

  const getTasksToday = () => {
    const from = moment().startOf('day').toDate();
    const to = moment().endOf('day').toDate();
    return filterTasksByDate(from, to, tasks);
  }

  const filtered = useMemo(() => {
    if (tasks) {
      const onlyToday = getTasksToday();
      const sorted = onlyToday.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
      const updated = showCompleted ? sorted : sorted.filter(t => t.complete === false);
      return updated;
    }
    return [];
  }, [tasks, showCompleted]);

  const allCompleted = useMemo(() => {
    const onlyToday = getTasksToday();
    return (onlyToday.length > 0 && onlyToday.findIndex(t => !t.complete) === -1);
  }, [filtered])

  const generateNoTasksPlaceholder = () => {
    if (filtered.length === 0 && !allCompleted) {
      return (
        <Box textAlign="center">
          <NoTasksAdded />
          <Typography>No tasks added for today yet</Typography>
        </Box>
      )
    } else if (allCompleted) {
      return (
        <Box textAlign="center">
          <TasksCompleted />
          <Typography>You’re all done for today!</Typography>
          <Typography variant="body2" sx={{ color: '#6D6D6D' }}>Enjoy the rest of your day :)</Typography>
        </Box>
      )
    }
  }

  return (
    <Grid container sx={{ px: "30px" }}>
      <Grid item xs={12} sx={{ mb: "-0.5%" }}>
        <Typography component="h1" variant="h6">
          {firstName && generateGreetings(capitalizeFirstLetter(firstName))}
        </Typography>
      </Grid>
      <Grid item xs={12} sx={{ mb: "-0.5%" }}>
        <Typography component="h1" variant="h4">
          Today
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography component="h1" variant="h6" sx={{ marginBottom: "10px" }}>
          {moment().format('Do MMMM YYYY, dddd')}
        </Typography>
      </Grid>
      <Grid item xs={12}
        sx={{ padding: "25px", mb: "100px" }}
        component={Paper}
        elevation={2}>
        <Grid container sx={{ minHeight: "75vh" }}>
          <Grid item xs={12} lg={5.5}>
            <Switch checked={showCompleted} onCheck={handleSwitch} label="Show Completed Tasks" />
            <TaskList tasks={filtered} noTasksPlaceholder={generateNoTasksPlaceholder()} />
          </Grid>
          <Grid item md={0.5}>
            <Divider orientation="vertical" />
          </Grid>
          <Grid item xs={12} lg={6} sx={{ px: "25px", display: { lg: "inline", xs: "none" } }}>
            {currentTask && !currentTask.create && <TaskDetails updateTask={updateTaskParam} task={currentTask} />}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}


