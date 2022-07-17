import { FormControlLabel, Grid, Switch, Divider, Paper, Typography } from "@mui/material";
import moment from 'moment';
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";
import generateGreetings from "../../utils/generateGreetings";
import { updateTaskParam } from "../../_actions/TaskAction";
import { TaskDetails, TaskList } from "../../components";

export default function Today() {
  const firstName = useSelector((state) => state.User.firstName);
  const currentTask = useSelector((state) => state.Task.currentTask);
  const tasks = useSelector((state) => state.Task.tasks);
  const [showCompleted, setShowCompleted] = useState(false); 

  const handleSwitch = (event) => {
    setShowCompleted(event.target.checked);
  };

  const filtered = useMemo(() => {
    if (tasks) return showCompleted ? tasks : tasks.filter(t => t.complete === false);
    return [];
  }, [tasks, showCompleted]);

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
            <FormControlLabel
              control={
                <Switch checked={showCompleted} onChange={handleSwitch} name="completed" />
              }
              label="Show Completed Tasks"
            />
            <TaskList tasks={filtered} />
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


