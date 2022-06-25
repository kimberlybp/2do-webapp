import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from 'moment';
import { Grid, useTheme, Chip, Box, Button } from "@mui/material";
import { styled } from "@mui/styles";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import generateGreetings from "../../utils/generateGreetings";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";

import TodoList from './components/TodoList';
import ClickableTags from './components/ClickableTags';
import TaskListDropdown from './components/TaskListDropdown';

const DateButton = styled(Button)(({ theme }) => ({
  color: `${theme.palette.getContrastText("#F5F3F3")} !important`,
  backgroundColor: "#F5F3F3 !important",
  fontWeight: "400 !important",
  justifyContent: "left !important"
}));

const ReminderButton = styled(Button)(({ theme }) => ({
  color: `#2F80ED !important`,
  backgroundColor: "#F5F3F3 !important",
  fontWeight: "700 !important",
  justifyContent: "left !important"
}));

export default function Today() {
  const theme = useTheme();
  const firstName = useSelector((state) => state.User.firstName);

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
            <TodoList />
          </Grid>
          <Grid item md={0.5}>
            <Divider
              orientation="vertical"
            />
          </Grid>
          <Grid item xs={12} lg={6} sx={{ px: "25px", display: { lg: "inline", xs: "none" } }}>
            <Box sx={{ display: "flex" }}>
              <Typography component="h1" variant="h5" gutterBottom
                sx={{ fontWeight: 700, color: theme.palette.primary.dark, mr: 1 }}>
                Task details
              </Typography>
              <Chip label="Incomplete" />
            </Box>
            <Typography variant="h4" gutterBottom>
              Finish & Submit Lab 3
            </Typography>
            <ClickableTags />
            <Typography variant="h6" gutterBottom
              sx={{ fontWeight: 700, color: "#6D6D6D", mt: "10px" }}>
              Task Description
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ minHeight: "100px" }}>
              Add any extra notes you have here
            </Typography>
            <Typography variant="h6" gutterBottom
              sx={{ fontWeight: 700, color: "#6D6D6D", mt: "10px" }}>
              Subtasks
            </Typography>
            <TodoList subtask={true} />
            <Grid container spacing={2} sx={{ mb: "18px" }}>
              <Grid item xs={12} lg={6}>
                <Typography variant="h6" gutterBottom
                  sx={{ fontWeight: 700, color: "#6D6D6D", mt: "10px" }}>
                  Due Date
                </Typography>
                <DateButton fullWidth sx={{ py: "14px", px: "10px" }}>{moment().format('DD MMMM YYYY, h:mm A')}</DateButton>
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
            <Typography variant="h6" gutterBottom
              sx={{ fontWeight: 700, color: "#6D6D6D", mt: "10px" }}>
              Remind Me
            </Typography>
            <ReminderButton fullWidth sx={{ py: "14px", px: "10px" }}>{moment().format('DD MMMM YYYY, h:mm A')}</ReminderButton>
            <Typography variant="h6"
              sx={{ fontWeight: 700, color: "#6D6D6D", mt: "10px" }}>
              Link to Module
            </Typography>
            <Typography variant="subtitle1" gutterBottom component="div" sx={{ color: "#6D6D6D" }}>from NUSMods</Typography>
            <DateButton fullWidth sx={{ py: "14px", px: "10px" }}>CS2106 Introduction to Operating Systems</DateButton>


            <Typography variant="caption" display="block" sx={{ mt: "50px", fontStyle: "italic", color: "#6D6D6D" }}>
              Created on 1 May 2022, Monday 2:49 PM
            </Typography>
            <Typography variant="caption" display="block" sx={{ fontStyle: "italic", color: "#6D6D6D" }} gutterBottom>
              Created on 1 May 2022, Monday 2:49 PM
            </Typography>
            <Divider />

            <Grid container spacing={2} sx={{ padding: 1 }}>
              <Grid item xs={12} lg={6}>
                <Button color="error" fullWidth>Delete Task</Button>
              </Grid>
              <Grid item xs={12} lg={6}>
                <Button color="primary" fullWidth>Mark as Complete</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

    </Grid>
  );
}


