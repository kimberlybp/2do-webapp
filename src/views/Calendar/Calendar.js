import { Box, Grid, Paper, Typography } from "@mui/material";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { useDispatch, useSelector } from "react-redux";
import "../../assets/styles/react-big-calendar.css";
import CreateTaskDialog from "../../components/CreateTaskDialog";
import TaskDetailsDialog from "../../components/TaskDetailsDialog";
import { selectTask } from "../../_actions/TaskAction";

const localizer = momentLocalizer(moment);

export default function CalendarView() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.Task.tasks);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [dueDate, setDueDate] = useState(null);

  useEffect(() => {
    dispatch(selectTask(null))
    // eslint-disable-next-line
  }, [])
  
  const events = useMemo(() => {
    if (tasks && tasks.length > 0) {
      return tasks.filter(t => !!t.dueDate).map(t => {
        return { ...t, start: t.dueDate, end: t.dueDate }
      })
    } else return []
  }, [tasks])

  const { defaultDate, views } = useMemo(
    () => ({
      defaultDate: new Date(),
      views: {
        month: true,
        agenda: true
      }
    }),
    []
  );

  // const handleSelectEvent = useCallback(
  //   (event) => window.alert(event.title),
  //   []
  // )

  const handleSelectSlot = ({start, end}) => {
    setDueDate(start);
    setTimeout(() => {
      setCreateOpen(true);
    }, 500)
  }

  const handleSelectEvent = (event) =>{
    dispatch(selectTask(event));
    setDetailsOpen(true);
  }

  return (
    <Grid container direction="column" sx={{ px: {xs:0, sm:"30px"}, width: "100%" }}>
      <Typography component="h1" variant="h4">
        Calendar
      </Typography>
      <Box
        display="flex"
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{ height: "90vh", bgcolor: "white", mt: "10px", padding: "20px" }}
        component={Paper}
        elevation={2}
      >
        <Calendar
          localizer={localizer}
          events={events}
          defaultDate={defaultDate}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          views={views}
          step={60}
          style={{ width: "100%" }}
          selectable
          popup
        />
      </Box>
      <TaskDetailsDialog overrideDisplay open={detailsOpen} setOpen={setDetailsOpen} onClose={() => dispatch(selectTask(null))} />
      <CreateTaskDialog open={createOpen} setOpen={setCreateOpen} dueDateInit={dueDate}/>
    </Grid>
  );
}
