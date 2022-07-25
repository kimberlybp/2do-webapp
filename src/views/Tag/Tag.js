import { Box, Button, Divider, Grid, Paper, Skeleton, styled, Typography, FormHelperText, Chip, useTheme } from "@mui/material";
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


export default function Tag(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const currentTask = useSelector((state) => state.Task.currentTask);
  const tasks = useSelector((state) => state.Task.tasks);
  const tags = useSelector((state) => state.Tag.tags);
  const userId = useSelector((state) => state.User.userId);
  const [showCompleted, setShowCompleted] = useState(false);
  const [currentTag, setCurrentTag] = useState(null);
  const { tagId } = useParams();

  useEffect(() => {
    dispatch(selectTask(null)); //unselect any task chosen
    if(tags && userId !== "init") {
      const res = tags.find(t => t._id === tagId);
      if(!res) navigate('/today');
      else setCurrentTag(res);
    } 
  }, [tagId, tags])

  const handleSwitch = (checked) => {
    setShowCompleted(checked);
  };

  const getListTasks = () => {
    return tasks.filter(t => t.tags && t.tags.findIndex(tag => tag._id === tagId) > -1 )
  }

  // const listTasks = useMemo(() => {
  //   if (tasks) return tasks.filter(t => t.tasklist && t.tasklist._id === currentTag._id)
  //   return [];
  // }, [tasks])

  const filtered = useMemo(() => {
    if (tasks && currentTag) {
      const filtered = getListTasks()
      const sorted = filtered.sort((a, b) => {
        if(a.dueDate && b.dueDate) return a.dueDate.getTime() - b.dueDate.getTime()
        return 1;
      });
      const updated = showCompleted ? sorted : sorted.filter(t => t.complete === false);
      return updated;
    }
    return [];
    // eslint-disable-next-line
  }, [tasks, showCompleted, currentTag]);

  const allCompleted = useMemo(() => {
    if (tasks && currentTag) {
    const filtered = getListTasks()
    return (filtered.length > 0 && filtered.findIndex(t => !t.complete) === -1);
    } return false
    // eslint-disable-next-line
  }, [filtered])

  const generateNoTasksPlaceholder = () => {

    if (tasks && currentTag) {
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
      <Grid item xs={12} sx={{ mb: "-0.25%" }}>
        <Typography component="div" variant="h6">
          Tag
        </Typography>
      </Grid>
      <Grid item xs={12} sx={{ mb: 1 }}>
        <Box display="flex" alignItems="baseline">
          {currentTag && <Chip
            label={currentTag.name}
            sx={{
              backgroundColor: currentTag.colour,
              color: `${theme.palette.getContrastText((!!currentTag.colour ? currentTag.colour : '#000'))} !important`,
              fontSize: '24px'
            }}
          />}
        </Box>
      </Grid>
      <Grid item xs={12}
        sx={{ padding: "25px", mb: "100px" }}
        component={Paper}
        elevation={2}>
        <Grid container sx={{ minHeight: "75vh" }}>
          <Grid item xs={12} lg={5.99} sx={styles.leftGridContainer}>
            <Switch checked={showCompleted} onCheck={handleSwitch} label="Show Completed Tasks" />
            <TaskList tasks={filtered} noTasksPlaceholder={generateNoTasksPlaceholder()} quickCreateParams={{ tags: [currentTag] }} />
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



