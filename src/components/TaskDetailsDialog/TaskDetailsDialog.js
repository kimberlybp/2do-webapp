import CloseIcon from '@mui/icons-material/Close';
import { Box, Dialog, IconButton } from "@mui/material";
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { forwardRef, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { initCreateTask } from "../../_actions/TaskAction";
import TaskDetails from '../TaskDetails';

export default function TaskDetailsDialog(props) {
  const { open, setOpen, onClose, overrideDisplay } = props;
  const dispatch = useDispatch();
  const theme = useTheme();
  const currentTask = useSelector((state) => state.Task.currentTask);
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));


  useEffect(() => {
    if(open) dispatch(initCreateTask());

    // eslint-disable-next-line
  }, [open])

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      onClose();
    }, 1000)
    
  };


  return (
      <Dialog
        fullScreen={fullScreen}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        fullWidth
        sx={{ display: overrideDisplay ? { xs: "block" } : { lg: "none", xs: "block" } }}
        PaperProps={{ sx: styles.paperStyles }}>
        <DialogContent sx={styles.dialogContent}>
          <Box display="flex" flexDirection="row-reverse">
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            ><CloseIcon /></IconButton>
          </Box>
          {currentTask && <TaskDetails task={currentTask} />}
        </DialogContent>
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

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
