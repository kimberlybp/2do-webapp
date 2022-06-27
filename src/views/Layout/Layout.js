import { Route, Routes } from "react-router-dom";
import Today from "../Today";
import AllTasks from "../AllTasks";
import NavBar from "../../components/NavBar";
import { Box } from "@mui/material";

export default function Layout() {
  return (
    <>
      <NavBar />
      <Box sx={{ marginLeft: { xs: "0", sm: "280px" }, backgroundColor: "#D1BDE1", height: "100vh" }}>
        <Routes>
          <Route path="/today" element={<Today />} />
          <Route path="/alltasks" element={<AllTasks />} />
        </Routes>
      </Box>
    </>
  );
}
