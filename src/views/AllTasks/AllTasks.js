import { Divider, Grid, Paper, Typography } from "@mui/material";
import moment from 'moment';
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Switch, TaskDetails, TaskList } from "../../components";
import filterTasksByDate from "../../utils/filterTasksByDate";


export default function AllTasks() {
  const currentTask = useSelector((state) => state.Task.currentTask);
  const tasks = useSelector((state) => state.Task.tasks);
  const [showCompleted, setShowCompleted] = useState(false);

  const handleSwitch = (checked) => {
    setShowCompleted(checked);
  };

  const filtered = useMemo(() => {
    if (tasks) {
      const sorted = tasks.sort((a, b) => {
        if(a.dueDate && b.dueDate) return a.dueDate.getTime() - b.dueDate.getTime()
        return 1;
      });
      const updated = showCompleted ? sorted : sorted.filter(t => t.complete === false);

      return updated;
    }
    return [];
    // eslint-disable-next-line
  }, [tasks, showCompleted]);

  const grouped = useMemo(() => {
    const today = new Date();
    const tomorrow = new Date(); 
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (filtered) {
      const dates = [
        { dueDate: today },
        { dueDate: tomorrow },
        { dueDate: null }
      ]

      const grouped = dates.map((val, idx) => {
        if(val.dueDate) {
          const start =  moment(val.dueDate).startOf('day').toDate();
          const end = moment(val.dueDate).endOf('day').toDate();
          return {
            dueDate: val.dueDate,
            tasks: filterTasksByDate(start, end, filtered)
          }
        } else {
          return {
            dueDate: val.dueDate,
            tasks: filtered.filter((t) => !t.dueDate)
          }
        }
      })      
    

      return grouped;
    }
    return [];

  }, [filtered])

  const getListHeader = (index) => {
    switch (index) {
      case 0: 
        return 'Today'
      case 1: 
        return 'Tomorrow'
      default: 
        return `One of these days`
    }
  }

  return (
    <Grid container sx={{ px: "30px" }}>
      <Grid item xs={12} sx={{ mb: 1 }}>
        <Typography component="h1" variant="h4">
          All Tasks
        </Typography>
      </Grid>
      <Grid item xs={12}
        sx={{ padding: "25px", mb: "100px"}}
        component={Paper}
        elevation={2}>
        <Grid container sx={{ minHeight: "75vh" }}>
          <Grid item xs={12} lg={5.99} sx={styles.leftGridContainer}>
            <Switch checked={showCompleted} onCheck={handleSwitch} label="Show Completed Tasks" />
            {
              grouped.map((value, index) => {
                return (<>
                  <Typography variant="h5" component="div" display="flex" sx={{ alignItems: 'center', px: "16px" }}>{getListHeader(index)}&nbsp;
                    <Typography>{value.dueDate && moment(value.dueDate).format('Do MMMM YYYY, dddd')}</Typography>
                  </Typography>
                  <TaskList tasks={value.tasks} quickCreateParams={{dueDate: value.dueDate}} />
                </>)
              })
            }
          </Grid>
          <Grid item md={0.01}>
            <Divider orientation="vertical" />
          </Grid>
          <Grid item xs={12} lg={6} sx={{ px: "25px", display: { lg: "inline", xs: "none" } }}
          >
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
    maxHeight: '840px', 
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




