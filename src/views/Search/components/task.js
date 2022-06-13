import React, { useState } from "react";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import RectangleRoundedIcon from "@mui/icons-material/RectangleRounded";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import SampleMods from "../samplemods.json";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ModuleSearch from "./modulesearch";
import Radio from "@mui/material/Radio";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";


const NewButton = styled(Button)({
  width: "auto",
  marginBottom: 6,
  boxShadow: "none",
  textTransform: "none",
  textEmphasisColor: "#f5f5f3",
  fontSize: 16,
  padding: "6px 12px",
  border: "1px solid",
  lineHeight: 1.5,
  backgroundColor: "#f5f5f3",
  borderColor: "#f5f5f3",
  "&:hover": {
    backgroundColor: "#dbdbdb",
    borderColor: "#dbdbdb",
    boxShadow: "none",
  },
});


const RadioButton = () => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };

  return (
    <Radio
      color="default"
      checked={selectedValue === "a"}
      onChange={handleChange}
    />
  );
};

const PriorityButton = styled(Button)({
  height: 30,
  borderRadius: 20,
  fontWeight: 700,
  textTransform: "none",
  "&:hover": {
    opacity: "75%",
    backgroundColor: "red",
  },
});

const AddTagButton = styled(Button)({
  height: 30,
  borderRadius: 20,
  fontWeight: 700,
  borderColor: "black",
  color: "black",
  textTransform: "none",
  "&:hover": {
    opacity: "70%",
    borderColor: "black",
  },
});

function SelectTaskList() {
  const [selectTaskList, setselectTaskList] = useState("");

  const handleChange = (event) => {
    setselectTaskList(event.target.value);
  };

  return (
    <Box sx={{ minWidth: "100%" }} size="small">
      <FormControl fullWidth sx={{ height: 0 }}>
        <Select
          size="small"
          variant="filled"
          disableUnderline
          value={selectTaskList}
          label="Task List"
          onChange={handleChange}
        >
          <MenuItem value={"School"}>School</MenuItem>
          <MenuItem value={"Work"}>Work</MenuItem>
          <MenuItem value={"CCA"}>CCA</MenuItem>
          <MenuItem value={"Random"}>Random</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

const Task = () => {
  return (
    <Grid container sx={{ width: { xs: "150%", sm: "100%" } }}>
      <Box
        sx={{
          mr: "21%",
          ml: { xs: "-6%", sm: "-3%", lg: "-1.5%" },
          mt: -3,
          mb: 2,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          height: "auto",
          width: { xs: "100%", sm: "80%" },
          backgroundColor: "white",
          position: "absolute",
        }}
        component={Paper}
        elevation={2}
      >
        <Grid container sx={{ ml: "1%", mt: "0.5%" }}>
          <Grid container direction="row" sx={{ minWidth: "50%" }}>
            <Grid
              item
              xs={3.2}
              sm={2.1}
              xl={0.8}
              md={1.3}
              lg={1}
              sx={{ maxWidth: "20%" }}
            >
              <RadioButton />
            </Grid>
            <Grid item xs={9} md={10} xl={7.5}>
              <Grid item xs={12}>
                <Typography fontWeight={700} fontSize={20} sx={{ mt: "2.2%" }}>
                  Finish & submit lab 3
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid
                  container
                  direction="row"
                  sx={{ maxWidth: { xs: 150, sm: 160, md: 380 } }}
                >
                  <Grid item sx={{ mr: "2%", height: 20 }}>
                    <RectangleRoundedIcon sx={{ color: "red" }} />
                  </Grid>
                  <Grid item sx={{ mr: "2%" }}>
                    <Divider
                      orientation="vertical"
                      sx={{ height: { sm: 22 } }}
                    />
                  </Grid>
                  <Grid item sx={{ mr: "2%" }}>
                    <Typography color="#6d6d6d">
                      School
                    </Typography>
                  </Grid>
                  <Grid item sx={{ mr: "2%" }}>
                    <Divider
                      orientation="vertical"
                      sx={{ height: { sm: 22 } }}
                    />
                  </Grid>
                  <Grid item sx={{ mr: "2%" }}>
                    <Typography color="#6d6d6d"> CS2106 </Typography>
                  </Grid>
                  <Grid item sx={{ mr: "2%" }}>
                    <Divider
                      orientation="vertical"
                      sx={{ height: { xs: 21, sm: 22 } }}
                    />
                  </Grid>
                  <Grid item sx={{ mr: "2%" }}>
                    <Typography color="#6d6d6d"> Due 7:00 PM </Typography>
                  </Grid>
                  <Grid item sx={{ mr: "2%" }}>
                    <Divider
                      orientation="vertical"
                      sx={{ height: { xs: 21, sm: 22 }, maxWidth: 2 }}
                    />
                  </Grid>
                  <Grid item sx={{ mr: "2%" }}>
                    <NotificationsActiveOutlinedIcon
                      sx={{
                        stroke: "white",
                        strokeWidth: 0.8,
                        color: "#6d6d6d",
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid
          container
          justifyContent="flex-start"
          alignItems="flex-start"
          sx={{
            mt: { xs: "1%", md: "2%" },
            ml: { xs: "2%", md: "3%" },
            mr: { xs: "2%", md: "3%" },
          }}
        >
          <Grid item xs={12}>
            <Grid container direction="row">
              <Typography color="#5d2ac2" fontWeight={700} fontSize={20} xs={5}>
                Task Details
              </Typography>
              <Box
                sx={{
                  backgroundColor: "#f5f3f3",
                  mt: "1%",
                  ml: "1%",
                  height: 17,
                }}
              >
                <Typography color="black" fontSize={12}>
                  Incomplete
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography fontWeight={700} fontSize={{ xs: 30, md: 38 }}>
              Finish & submit lab 3
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container direction="row">
              <PriorityButton
                variant="contained"
                size="small"
                disableElevation
                sx={{ bgcolor: "red", color: "white", mr: 1, mb: 1 }}
              >
                High{" "}
                <CloseIcon fontSize="small" sx={{ mr: "-4%", mt: "-2%" }} />
              </PriorityButton>
              <AddTagButton variant="outlined" size="small" disableElevation>
                <AddIcon fontSize="small" sx={{ ml: "-4%", mt: "-2%" }} /> 
                Add Tag
              </AddTagButton>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ mt: "2%" }}>
            <Typography fontWeight={700} sx={{ color: "#6d6d6d" }}>
              {" "}
              Task Description
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ mt: "0.5%" }}>
            <TextField
              multiline
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
          <Grid item xs={12} sx={{ mt: "3%" }}>
            <Typography fontWeight={700} sx={{ color: "#6d6d6d" }}>
              {" "}
              Subtasks{" "}
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ mt: "0.5%" }}>
            <Grid container direction="row" sx={{ ml: "-0.5%" }}>
              <Grid item>
                <RadioButton />
              </Grid>
              <Grid item sx={{ mt: { xs: "3%", md: "1%" }, maxWidth: "75%" }}>
                <TextField
                  multiline
                  variant="standard"
                  placeholder={"Add a subtask"}
                  type="text"
                  sx={{
                    width: {
                      xs: "79%",
                      sm: "136%",
                      md: "160%",
                      lg: "225%",
                      xl: "285%",
                    },
                    border: "none",
                    font: "inherit",
                    color: "#6d6d6d",
                  }}
                  InputProps={{ disableUnderline: true }}
                />
              </Grid>
            </Grid>

            <Grid item xs={12} sx={{ mt: "2%" }}>
              <Grid container direction="row">
                <Grid item xs={12} md={6}>
                  <Typography fontWeight={700} sx={{ color: "#6d6d6d" }}>
                    Due Date
                  </Typography>
                  <Box
                    sx={{
                      backgroundColor: "#f5f3f3",
                      height: 49,
                      mr: { md: "5%" },
                      borderRadius: 1,
                    }}
                  >
                    <Grid container alignItems="center">
                      <Typography
                        fontSize={15}
                        sx={{ color: "black", mt: "7%", ml: "2%" }}
                      >
                        3 June 2022, 7:00 PM
                      </Typography>
                    </Grid>
                  </Box>
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{
                    mt: { xs: "4%", md: "0%" },
                    mb: { xs: "15%", sm: "9%", md: "0%" },
                  }}
                >
                  <Typography fontWeight={700} sx={{ color: "#6d6d6d" }}>
                    Task List
                  </Typography>
                  <SelectTaskList></SelectTaskList>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Divider
                sx={{ mt: "2%", display: { xs: "none", sm: "block" } }}
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container direction="row">
                <Grid item xs={9.8} md={11.3}>
                  <Typography
                    fontWeight={700}
                    sx={{ color: "#6d6d6d", my: "1%" }}
                  >
                    Remind Me
                  </Typography>
                </Grid>
                <Grid item>
                  <AddIcon
                    sx={{
                      ml: {
                        xs: "1%",
                        sm: "2.3%",
                        md: "-1%",
                        lg: "-0.2%",
                        xl: "0.4%",
                      },
                      mt: "0.3%",
                      opacity: "80%",
                      position: "absolute",
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <NewButton
                sx={{
                  width: "100%",
                  height: 50,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "box",
                }}
              >
                <NotificationsActiveOutlinedIcon
                  sx={{ color: "#2f80ed", mr: "1%", ml: "-1.7%" }}
                />
                <Grid
                  container
                  justifyContent="flex-start"
                  alignItems="flex-start"
                >
                  <Typography fontWeight={700} color="#2f80ed">
                    15 mins before (3 June 2022, 6:45 PM)
                  </Typography>
                </Grid>
                <CloseIcon
                  sx={{ mr: "-1.5%", color: "black", opacity: "70%" }}
                />
              </NewButton>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ my: "1%" }} />
            </Grid>
            <Grid item xs={12}>
              <Typography fontWeight={700} sx={{ color: "#6d6d6d", mt: "1%" }}>
                Link to Module
              </Typography>
              <Typography fontSize={11} color="#6d6d6d">
                from NUSMods
              </Typography>
              <ModuleSearch samplemods={SampleMods}></ModuleSearch>
              <Grid item xs={12}>
                <Typography
                  color="#6d6d6d"
                  fontStyle="italic"
                  fontSize={11}
                  sx={{ mt: "5%" }}
                >
                  Created on 1 May 2022, Monday 2:49 PM<br></br>
                  Last updated on 2 May 2022, Monday 2:49 PM
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider
                  sx={{
                    mb: "1%",
                    mt: "2%",
                    background: "#464646",
                    opacity: "80%",
                  }}
                />
              </Grid>
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                sx={{ mt: "4%", mb: "3%" }}
              >
                <NewButton
                  sx={{
                    height: 49,
                    color: "red",
                    fontSize: { xs: 13, sm: 16, md: 18 },
                    fontWeight: { xs: 900, sm: 700 },
                    width: { xs: "39%", md: "28%" },
                  }}
                >
                  <DeleteOutlineIcon sx={{ mr: "5%", ml: "-2%" }} />
                  Delete Task
                </NewButton>
                <NewButton
                  sx={{
                    height: 49,
                    color: "primary",
                    fontSize: { xs: 13, sm: 16, md: 18 },
                    fontWeight: { xs: 900, sm: 700 },
                    width: { xs: "49%", md: "38%" },
                  }}
                >
                  <CheckCircleOutlineIcon sx={{ mr: "5%", ml: "-2%" }} />
                  Mark as Complete
                </NewButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

export default Task;
