import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import NavBar from "../../components/NavBar";
import AllTasks from "../AllTasks";
import Calendar from "../Calendar";
import FAQ from "../FAQ";
import List from "../List";
import Module from "../Module";
import Tag from "../Tag";
import Today from "../Today";
import Upcoming from "../Upcoming";

export default function Layout() {
  return (
    <>
      <NavBar />
      <Box sx={{ marginLeft: { xs: "0", sm: "280px" }, backgroundColor: "#D1BDE1", height: "100vh" }}>
        <Routes>
          <Route path="/today" element={<Today />} />
          <Route path="/alltasks" element={<AllTasks />} />
          <Route path="/upcoming" element={<Upcoming />} />
          <Route path="/list/:tasklistId" element={<List />} />
          <Route path="/tag/:tagId" element={<Tag />} />
          <Route path="/module/:moduleCode" element={<Module />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/calendar" element={<Calendar />} />
        </Routes>
      </Box>
    </>
  );
}
