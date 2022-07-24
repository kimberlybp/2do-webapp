import { useState, useMemo, Fragment } from 'react';
import { TextField, Box, useTheme, Chip, FormHelperText } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { useDispatch, useSelector } from "react-redux";
import { CirclePicker } from 'react-color';
import { Typography } from '@mui/material';
import { createTag } from '../../../_actions/TagAction';

const filter = createFilterOptions();

export default function CreateTagDialog(props) {
  const { open, setOpen } = props;
  const initValue = { name: '', colour: '' }
  const dispatch = useDispatch();
  const theme = useTheme();
  const [value, setValue] = useState(null); //autocomplete textfield value
  const [tagExists, setTagExists] = useState(false); 
  const [tag, setTag] = useState(null); //current selected tag
  const [colour, setColour] = useState(null);
  const allTags = useSelector((state) => state.Tag.tags);
  const [dialogValue, setDialogValue] = useState(initValue);
  const createTagLoading = useSelector((state) => state.Shared.loadingTasks['createTag']);

  const handleClose = () => {
    setDialogValue(initValue);

    setOpen(false)
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await dispatch(createTag(dialogValue));
    if (!!res) {
      setValue(dialogValue.name);
      setTag(res);
    } else {
      setValue(null)
    }
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
                if (allTags.findIndex(t => t.name === event.target.value)) {
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

