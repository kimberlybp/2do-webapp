import { Box, Chip, FormHelperText, TextField, Typography, useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Fragment, useState } from 'react';
import { CirclePicker } from 'react-color';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { createTag } from '../../_actions/TagAction';


export default function CreateTagDialog(props) {
  const { open, setOpen } = props;
  const initValue = { name: '', colour: '#f44336' }
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const [tagExists, setTagExists] = useState(false); 
  const [colour, setColour] = useState({ hex: '#f44336' });
  const allTags = useSelector((state) => state.Tag.tags);
  const [dialogValue, setDialogValue] = useState(initValue);
  // const createTagLoading = useSelector((state) => state.Shared.loadingTasks['createTag']);

  const handleClose = () => {
    setDialogValue(initValue);

    setOpen(false)
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await dispatch(createTag(dialogValue));
    handleClose();    
    setTimeout(() => {
      navigate(`/tag/${res._id}`)
    }, 500)
  };

  const handleColorChange = (colour, event) => {
    setColour(colour.hex);
    setDialogValue({
      ...dialogValue,
      colour: colour.hex
    });
  }


  return (
    <Fragment>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Create a new Tag</DialogTitle>
          <DialogContent>
            <Box display="flex" placeItems="center">
            <Typography variant="subtitle1" gutterBottom>Tag Preview: &nbsp;</Typography>
            <Chip
              label={!!dialogValue.name ? dialogValue.name : 'Tag Name required'}
              sx={{
                backgroundColor: dialogValue.colour,
                color: `${theme.palette.getContrastText((!!dialogValue.colour ? dialogValue.colour : '#000'))} !important`,
                margin: '0 0 20px 0'
              }}
            />
            </Box>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={dialogValue.name}
              onChange={(event) =>
              {
                if (allTags.findIndex(t => t.name === event.target.value) > -1) {
                  setTagExists(true)
                } else {
                  setTagExists(false)
                }
                setDialogValue({
                  ...dialogValue,
                  name: event.target.value,
                })
              }
              }
              label="Tag Name"
              type="text"
              variant="outlined"
              fullWidth
            />
            {tagExists && <FormHelperText error>Tag with similar name already exists</FormHelperText>}
            <Typography sx={{ mt: "10px" }} variant="subtitle1" gutterBottom>Pick a colour</Typography>
            <CirclePicker width="100%" color={colour} onChange={handleColorChange} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" disabled={!dialogValue.name.trim() || tagExists}>Create</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Fragment>
  );
}

