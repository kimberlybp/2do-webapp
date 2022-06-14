import SearchBar from "../../components/SearchBar";
import AddTask from "./components/addtask";
import SampleTasks from "./sampletasks.json";
import { Grid, Typography, Box, Paper, Divider } from "@mui/material";
import vector from "./images/todaynotask1.svg";

export default function Today1() {
  return (
    <Grid container sx={{ ml: "18%", mt: { xs: "5%", md: "1.5%" } }}>
      <Grid item xs={12}>
        <SearchBar sampletasks={SampleTasks}></SearchBar>
      </Grid>
      <Grid item xs={12} sx={{ mt: "1%" }}>
        <Grid item xs={12} sx={{ mb: "-0.5%" }}>
          <Typography fontSize={22} fontWeight={600}>
            Good Morning Bryan!
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ mb: "-0.5%" }}>
          <Typography fontSize={34} fontWeight={700}>
            Today
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography fontSize={22} fontWeight={600}>
            3 May 2022, Monday
          </Typography>
        </Grid>
      </Grid>
      <Box
        sx={{
          mr: "21%",
          mt: 21,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          height: "auto",
          width: { xs: "100%", sm: "78%" },
          backgroundColor: "white",
          position: "absolute",
        }}
        component={Paper}
        elevation={2}
      >
        <Grid container sx={{ ml: "1%", mt: "0.5%", width: "110%" }}>
          <Grid item>
            <AddTask></AddTask>
          </Grid>
          <Grid container justifyContent="center" sx={{ my: "15%" }}>
            <img src={vector} alt="lady working" className="image" />
            <Typography color="#2B3334" sx={{ fontSize:{xs:12, md:16} }}>
            No tasks added for today yet
            </Typography>
          </Grid>
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid
          container
          justifyContent="flex-start"
          alignItems="flex-start"
          sx={{
            mt: "2%",
            ml: "3%",
            mr: "3%",
          }}
        >
          <Grid item xs={12}>
            <Typography color="#5d2ac2" fontWeight={700} fontSize={20} xs={5}>
              Task Details
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography fontStyle="italic" color="#6d6d6d">No task selected.</Typography>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
}
