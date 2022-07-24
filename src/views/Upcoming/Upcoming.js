import { Divider, Grid, Paper, Typography } from "@mui/material";
import moment from 'moment';
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Switch, TaskDetails, TaskList } from "../../components";
import filterTasksByDate from "../../utils/filterTasksByDate";


export default function Upcoming() {
  const currentTask = useSelector((state) => state.Task.currentTask);
  const tasks = useSelector((state) => state.Task.tasks);
  const [showCompleted, setShowCompleted] = useState(false);

  const handleSwitch = (checked) => {
    setShowCompleted(checked);
  };

  const getTasksUpcoming = () => {
    const from = moment().startOf('day').toDate();
    const to = moment().startOf('day').toDate();
    to.setDate(to.getDate() + 6);
    console.log(from)
    console.log(to)
    return filterTasksByDate(from, to, tasks);
  }


  // eslint-disable-next-line
  Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  }

  function getDates(startDate, stopDate) {
    var dateArray = [];
    var currentDate = startDate;
    while (currentDate <= stopDate) {
        dateArray.push(new Date (currentDate));
        currentDate = currentDate.addDays(1);
    }
    return dateArray;
}

  const filtered = useMemo(() => {
    if (tasks) {
      const onlyUpcoming = getTasksUpcoming();
      const sorted = onlyUpcoming.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
      const updated = showCompleted ? sorted : sorted.filter(t => t.complete === false);

      return updated;
    }
    return [];
    // eslint-disable-next-line
  }, [tasks, showCompleted]);

  const grouped = useMemo(() => {
    if (filtered) {
      const from = moment().startOf('day').toDate();
      const to = moment().startOf('day').toDate();
      to.setDate(to.getDate() + 6);
      const dateArray = getDates(from, to);

      console.log(dateArray)

      const grouped = dateArray.map((date) => {
        const start =  moment(date).startOf('day').toDate();
        const end = moment(date).endOf('day').toDate();
        return {
          dueDate: date,
          tasks: filterTasksByDate(start, end, filtered)
        }
      })

      console.log(grouped)

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
        return `In ${index+1} days`
    }
  }

  return (
    <Grid container sx={{ px: "30px" }}>
      <Grid item xs={12} sx={{ mb: "-0.5%" }}>
        <Typography component="h1" variant="h6">
          Next 7 Days
        </Typography>
      </Grid>
      <Grid item xs={12} sx={{ mb: 1 }}>
        <Typography component="h1" variant="h4">
          Upcoming
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
                    <Typography>{moment(value.dueDate).format('Do MMMM YYYY, dddd')}</Typography>
                  </Typography>
                  <TaskList tasks={value.tasks} quickCreateDueDate={value.dueDate} />
                </>)
              })
            }
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




