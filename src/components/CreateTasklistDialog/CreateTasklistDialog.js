import { Button, Dialog, DialogActions, DialogTitle, FormHelperText, TextField } from "@mui/material";
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useEffect, forwardRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createTask, initCreateTask } from "../../_actions/TaskAction";
import { createTasklist } from "../../_actions/TasklistAction";
import TaskDetails from '../TaskDetails';

export default function CreateTasklistDialog(props) {
  const { open, setOpen } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const [name, setName] = useState("");
  const [listExistsError, setListExistsError] = useState(false);
  const tasklists = useSelector((state) => state.Tasklist.tasklists);
  const createTasklistLoading = useSelector((state) => state.Shared.loadingTasks['createTasklist']);


  useEffect(() => {
    if(open) dispatch(initCreateTask());

    // eslint-disable-next-line
  }, [open])

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setName(event.target.value);
    if(tasklists.findIndex(t => t.name === event.target.value) > -1){
      setListExistsError(true)
    } else {
      setListExistsError(false)
    }
  };

  const handleCreateTasklist = async () => {
    const res = await dispatch(createTasklist({ name: name }))
    handleClose();
    setTimeout(() => {
      navigate(`/list/${res._id}`)
    }, 500)
  };

  return (
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: styles.paperStyles }}>
      <DialogTitle>Create a new Tasklist</DialogTitle>
        <DialogContent sx={styles.dialogContent}>
          <TextField fullWidth value={name} onChange={handleChange} label="Tasklist Name"/>
        {listExistsError && <FormHelperText error>Task list with a similar name already exists</FormHelperText>}
        </DialogContent>
        <DialogActions>
          <Button disabled={createTasklistLoading} onClick={handleClose} sx={styles.button}>Cancel</Button>
          <Button disabled={createTasklistLoading || listExistsError || name.trim() === ""} onClick={() => handleCreateTasklist()} sx={styles.button}>Create Tasklist</Button>
        </DialogActions>
      </Dialog>
  );
}

const styles = {
  paperStyles: { 
    borderRadius: '10px', 
  },
  dialogContent: {
    padding: '10px 24px',
    paddingTop: '10px !important'
  },
  dialogAction: {
    backgroundColor: '#F6F6F6',
    padding: '15px 50px 30px 50px',
    boxShadow: 2
  },
  button: {
    // minWidth: '50%',
  },
}

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const GreyButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#E0E0E0'),
  backgroundColor: '#E0E0E0',
  '&:hover': {
    backgroundColor: '#DDDDDD',
  },
}));