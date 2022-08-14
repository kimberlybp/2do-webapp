import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ReactComponent as NoTasksAdded } from '../../assets/images/no-tasks-added.svg';
import { ReactComponent as TasksCompleted } from '../../assets/images/tasks-completed.svg';
import { Switch, TaskDetails, TaskList } from "../../components";
import { selectTask } from "../../_actions/TaskAction";


export default function Module(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentTask = useSelector((state) => state.Task.currentTask);
  const tasks = useSelector((state) => state.Task.tasks);
  const modules = useSelector((state) => state.Module.allModules);
  const userId = useSelector((state) => state.User.userId);
  const [showCompleted, setShowCompleted] = useState(false);
  const [currentModule, setCurrentModule] = useState(null);
  const { moduleCode } = useParams();

  useEffect(() => {
    dispatch(selectTask(null)); //unselect any task chosen

    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if(modules && userId !== "init") {
      const res = modules.find(m => m.moduleCode === moduleCode);
      if(!res) navigate('/today');
      else setCurrentModule(res);
    } 

    // eslint-disable-next-line
  }, [moduleCode, modules])

  const handleSwitch = (checked) => {
    setShowCompleted(checked);
  };

  const getModuleTasks = () => {
    return tasks.filter(t => t.module && t.module.moduleCode === moduleCode )
  }

  // const listTasks = useMemo(() => {
  //   if (tasks) return tasks.filter(t => t.tasklist && t.tasklist._id === currentModule._id)
  //   return [];
  // }, [tasks])

  const filtered = useMemo(() => {
    if (tasks && currentModule) {
      const filtered = getModuleTasks()
      const sorted = filtered.sort((a, b) => {
        if(a.dueDate && b.dueDate) return a.dueDate.getTime() - b.dueDate.getTime()
        return 1;
      });
      const updated = showCompleted ? sorted : sorted.filter(t => t.complete === false);
      return updated;
    }
    return [];
    // eslint-disable-next-line
  }, [tasks, showCompleted, currentModule]);

  const allCompleted = useMemo(() => {
    if (tasks && currentModule) {
    const filtered = getModuleTasks()
    return (filtered.length > 0 && filtered.findIndex(t => !t.complete) === -1);
    } return false
    // eslint-disable-next-line
  }, [filtered])

  const generateNoTasksPlaceholder = () => {

    if (tasks && currentModule) {
      const tasklistTasks = getModuleTasks()

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
      <Grid item xs={12} sx={{ mb: "-0.25%" }}>
        <Typography component="div" variant="h6">
          Module
        </Typography>
      </Grid>
      <Grid item xs={12} sx={{ mb: 1 }}>
        <Typography component="h1" variant="h4">
          {currentModule ? `${currentModule.moduleCode} ${currentModule.title}` : "Searching for module.."}
        </Typography>
      </Grid>
      <Grid item xs={12}
        sx={{ padding: "25px", mb: "100px" }}
        component={Paper}
        elevation={2}>
        <Grid container sx={{ minHeight: "75vh" }}>
          <Grid item xs={12} lg={5.99} sx={styles.leftGridContainer}>
            <Switch checked={showCompleted} onCheck={handleSwitch} label="Show Completed Tasks" />
            <TaskList tasks={filtered} noTasksPlaceholder={generateNoTasksPlaceholder()} quickCreateParams={{ module: currentModule }} />
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



