import React, { useState } from "react";
import { TextField, Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { RadioButton } from "./button";

export default function AddTask() {
  const [tasks, setTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState("");

  const addInput = (e) => {
    setNewTaskText(e.target.value);
  };

  function handleAddTask(e) {
    e.preventDefault();
    if (newTaskText !== "") addTask(newTaskText);
    setNewTaskText("");
  }
  function addTask(description) {
    const newTasks = [
      ...tasks,
      {
        description: description,
        isComplete: false,
      },
    ];
    setTasks(newTasks);
    console.log(newTasks);
  }
  return (
    <>
      <Box component="form" type="submit" onSubmit={handleAddTask}>
        <Grid container direction="row" sx={{ minWidth: "50%" }}>
          <Grid
            item
            xs={3.2}
            sm={2}
            xl={0.8}
            md={1.3}
            lg={1}
            sx={{ maxWidth: "20%" }}
          >
            <RadioButton />
          </Grid>
          <Grid item xs={9} md={10} sx={{ mt: "0.7%" }}>
            <TextField
              id="addtask"
              variant="standard"
              placeholder="Quick add a task here!"
              type="text"
              value={newTaskText}
              onChange={addInput}
              sx={{
                width: "100%",
                height: "100%",
              }}
              InputProps={{
                disableUnderline: true,
                style: { fontSize: 20, fontWeight: 700 },
              }}
            />
          </Grid>
        </Grid>
      </Box>
      {tasks.map((task, index) => {
        return (
          <Grid item key={index}>
            <Grid container direction="row" sx={{ width: "100%" }}>
              <Grid
                item
                xs={3.2}
                sm={2}
                xl={0.8}
                md={1.3}
                lg={1}
                sx={{ maxWidth: "20%" }}
              >
                <RadioButton type="checkbox" checked={task.isComplete} />
              </Grid>
              <Grid item xs={9} lg={10} sx={{ mt: "1.5%" }}>
                <Typography fontWeight={700} fontSize={20}>
                  {task.description}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        );
      })}
    </>
  );
}