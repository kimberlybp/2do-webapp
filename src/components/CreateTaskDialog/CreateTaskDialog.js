import { Button, Dialog, DialogActions } from "@mui/material";
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useEffect, forwardRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { initCreateTask } from "../../_actions/TaskAction";

import TaskDetails from '../TaskDetails';



const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateTaskDialog(props) {
  const { open, setOpen } = props;
  const dispatch = useDispatch();
  const theme = useTheme();
  const currentTask = useSelector((state) => state.Task.currentTask);
  const newTask = useSelector((state) => state.Task.newTask);
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    dispatch(initCreateTask());
  }, [])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
      <Dialog
        fullScreen={fullScreen}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        // maxWidth="sm"
        fullWidth
        PaperProps={{ sx: styles.paperStyles }}>
        <DialogContent sx={styles.dialogContent}>
          {newTask && <TaskDetails createTask task={newTask}/>}
        </DialogContent>
        <DialogActions sx={styles.dialogAction}>
          <GreyButton onClick={handleClose} variant="contained" sx={styles.button}>Cancel</GreyButton>
          <Button variant="contained" sx={styles.button}>Create Task</Button>
        </DialogActions>
      </Dialog>
  );
}

const styles = {
  paperStyles: { 
    borderRadius: '10px', 
    maxWidth: '700px'
  },
  dialogContent: {
    padding: '30px 50px',
  },
  dialogAction: {
    backgroundColor: '#F6F6F6',
    padding: '15px 50px 30px 50px',
    boxShadow: 2
  },
  button: {
    minWidth: '165px',
    "@media (max-width:600px)": {
      minWidth: '50%'
    },
  },
}

const GreyButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#E0E0E0'),
  backgroundColor: '#E0E0E0',
  '&:hover': {
    backgroundColor: '#DDDDDD',
  },
}));