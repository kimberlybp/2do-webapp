import React, { useMemo } from "react";
import events from "./SampleEvents";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { Box, Paper, Typography, Grid } from "@mui/material";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

let allViews = Object.keys(Views).map((k) => Views[k]);

export default function NewCalendar() {
  const { defaultDate } = useMemo(
    () => ({
      defaultDate: new Date(),
    }),
    []
  );
  return (
    <Grid container direction="column" sx={{ px: {xs:0, sm:"30px"}, width: "auto" }}>
      <Typography component="h1" variant="h4">
        Calendar
      </Typography>
      <Box
        display="flex"
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{ height: "90vh", bgcolor: "white", mt: "10px" }}
        component={Paper}
        elevation={2}
      >
        <Calendar
          localizer={localizer}
          events={events}
          defaultDate={defaultDate}
          views={allViews}
          step={60}
          style={{ width: "100%" }}
        />
      </Box>
    </Grid>
  );
}
