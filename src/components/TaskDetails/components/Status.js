import { useSelector } from "react-redux";
import { Chip } from "@mui/material";

export default function Status() {
  const currentTask = useSelector((state) => state.Task.currentTask);

  return ( currentTask && 
    currentTask.complete ? <Chip label="Complete" sx={{ backgroundColor: "#109D58", color: "#fff" }} /> : <Chip label="Incomplete" />
  )
}