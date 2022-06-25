import { Route, Routes } from "react-router-dom";
import Today from "../Today";
import NavBar from "../../components/NavBar";

export default function Layout() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/today" element={<Today />} />
      </Routes>
    </>
  );
}
