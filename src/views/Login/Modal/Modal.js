import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React from "react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import SampleMods from "../Search/samplemods.json";
import {
  PurpleButton,
  AddTagButton,
  RadioButton,
  NewButton,
} from "./components/button";
import ModuleSearch from "./components/modulesearch";
import SelectTaskList from "./components/selecttasklist";

export default function CreateTaskModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Grid container>
      <PurpleButton onClick={handleOpen}>
        <Typography color="white">Create Task</Typography>
      </PurpleButton>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            borderRadius: 2,
            bgcolor: "white",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            height: "auto",
            width: { xs: "97%", md: "70%", lg: "37%" },
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Grid container>
            <Grid
              container
              justifyContent="center"
              sx={{ my: "4%", ml: "6%", mr: "6%" }}
            >
              <Grid item xs={12}>
                <Typography color="#5d2ac2" fontWeight={700}>
                  Create Task
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <input
                  id="title"
                  placeholder="Title"
                  type="text"
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "none",
                    font: "inherit",
                    fontWeight: "700",
                    fontSize: "1.5em",
                  }}
                />
              </Grid>
              <Grid item xs={12} sx={{ my: "0.5%" }}>
                <AddTagButton variant="outlined" size="small" disableElevation>
                  <AddIcon fontSize="small" sx={{ ml: "-4%", mt: "-2%" }} /> Add
                  Tag
                </AddTagButton>
              </Grid>
              <Grid item xs={12} sx={{ mt: "1.5%" }}>
                <Typography fontWeight={700} sx={{ color: "#6d6d6d" }}>
                  {" "}
                  Task Description
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ mt: "0.5%" }}>
                <TextField
                  multiline
                  rows={3}
                  variant="standard"
                  placeholder={"Add any extra notes you have here"}
                  type="text"
                  sx={{
                    width: "92%",
                    border: "none",
                    font: "inherit",
                    outline: "none",
                  }}
                  InputProps={{ disableUnderline: true }}
                />
              </Grid>
              <Grid item xs={12} sx={{ mt: "5%" }}>
                <Typography fontWeight={700} sx={{ color: "#6d6d6d" }}>
                  {" "}
                  Subtasks{" "}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid container direction="row" sx={{ ml: "-2%" }}>
                  <Grid item>
                    <RadioButton />
                  </Grid>
                  <Grid
                    item
                    sx={{ mt: { xs: "2%", sm: "1%" }, maxWidth: "75%" }}
                  >
                    <TextField
                      multiline
                      rows={1}
                      variant="standard"
                      placeholder={"Add a subtask"}
                      type="text"
                      sx={{
                        width: {
                          xs: "150%",
                          sm: "340%",
                          md: "150%",
                          lg: "185%",
                          xl: "260%",
                        },
                        border: "none",
                        font: "inherit",
                        color: "#6d6d6d",
                      }}
                      InputProps={{ disableUnderline: true }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ mt: "1%" }}>
                <Grid container direction="row">
                  <Grid item xs={6}>
                    <Typography fontWeight={700} sx={{ color: "#6d6d6d" }}>
                      Due Date
                    </Typography>
                    <Box
                      sx={{
                        backgroundColor: "#f5f3f3",
                        height: 49,
                        mr: "5%",
                        borderRadius: 1,
                      }}
                    >
                      <Grid container alignItems="center">
                        <Typography
                          sx={{
                            color: "black",
                            mt: {
                              xs: "12%",
                              sm: "6%",
                              md: "7%",
                              lg: "10%",
                              xl: "7%",
                            },
                            ml: "3%",
                          }}
                        >
                          No Due Date set
                        </Typography>
                      </Grid>
                    </Box>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography fontWeight={700} sx={{ color: "#6d6d6d" }}>
                      Task List
                    </Typography>
                    <SelectTaskList></SelectTaskList>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Divider
                  sx={{ mt: { xs: "3%", md: "4%", lg: "2%" } }}
                ></Divider>
              </Grid>
              <Grid item xs={12}>
                <Grid container direction="row">
                  <Grid item xs={11} sm={11.3} md={11} lg={11.3}>
                    <Typography
                      fontWeight={700}
                      sx={{ color: "#6d6d6d", mb: "1%", mt: "1.5%" }}
                    >
                      Remind Me
                    </Typography>
                  </Grid>
                  <Grid item>
                    <AddIcon sx={{ mt: "14%", opacity: "80%" }} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Divider></Divider>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  fontWeight={700}
                  sx={{ color: "#6d6d6d", mt: "1%" }}
                >
                  Link to Module
                </Typography>
                <Typography fontSize={12} color="#6d6d6d">
                  from NUSMods
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ mt: "1%", mb: "7%" }}>
                <ModuleSearch
                  samplemods={SampleMods}
                  sx={{ width: "100%" }}
                ></ModuleSearch>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  backgroundColor: "#f8f8f8",
                  width: "100%",
                  height: "auto",
                  borderBottomLeftRadius: 9,
                  borderBottomRightRadius: 9,
                }}
              >
                <Grid container direction="row" justifyContent="flex-end">
                  <NewButton sx={{ my: { xs: "6%", md: "2.5%" }, mr: "3%" }}>
                    <Typography color="black" fontWeight={700}>
                      Cancel
                    </Typography>
                  </NewButton>
                  <PurpleButton sx={{ my: { xs: "6%", md: "2.5%" }, mr: "4%" }}>
                    <Typography
                      color="white"
                      fontWeight={600}
                      letterSpacing={0.5}
                    >
                      Create Task
                    </Typography>
                  </PurpleButton>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Grid>
  );
}
