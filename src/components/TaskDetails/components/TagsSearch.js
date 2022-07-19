import { useState, useMemo, Fragment } from 'react';
import { TextField, Box, useTheme, Chip } from '@mui/material';
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
import { createTask } from '../../../_actions/TaskAction';

const filter = createFilterOptions();

export default function TagsSearch(props) {
  const { task, updateTask } = props;
  const initValue = { name: '', colour: '' }
  const dispatch = useDispatch();
  const theme = useTheme();
  const [value, setValue] = useState(null); //autocomplete textfield value
  const [tag, setTag] = useState(null); //current selected tag
  const [colour, setColour] = useState(null);
  const [open, toggleOpen] = useState(false);
  const allTags = useSelector((state) => state.Tag.tags);
  const [dialogValue, setDialogValue] = useState(initValue);
  const createTaskLoading = useSelector((state) => state.Shared.loadingTasks['createTask']);

  const handleClose = () => {
    setDialogValue(initValue);

    toggleOpen(false);
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
  };

  const handleClick = () => {
    const updated = task.tags;
    updated.push(tag)
    dispatch(updateTask('tags', updated));
    setTag(null)
    setValue(null)
  }

  const handleColorChange = (colour, event) => {
    setColour(colour.hex);
    setDialogValue({
      ...dialogValue,
      colour: colour.hex
    });
  }

  const filtered = useMemo(() => {
    return allTags.filter((elem) => !(task.tags.find(({ _id }) => elem._id === _id)));
    // eslint-disable-next-line
  }, [task, task.tags, allTags])

  const initNewTag = (newValue) => {
    toggleOpen(true);
    setColour("#f44336");
    setDialogValue({
      name: newValue.inputValue,
      colour: '#f44336'
    });
  }

  return (
    <Fragment>
      <Box display="flex">
        <Typography variant="subtitle1" gutterBottom>Tag Preview:&nbsp;</Typography>
        {tag && <Chip
          label={tag.name}
          sx={{
            backgroundColor: tag.colour,
            color: `${theme.palette.getContrastText((!!tag.colour ? tag.colour : '#000'))} !important`,
          }}
        />}
      </Box>
      <Box display="flex" marginTop={"5px"}>
        <Autocomplete
          size="small"
          value={value}
          onChange={(event, newValue) => {
            if (typeof newValue === 'string') {
              // timeout to avoid instant validation of the dialog's form.
              setTimeout((newValue) => {
                initNewTag();
              });
            } else if (newValue && newValue.inputValue) {
              initNewTag(newValue);
            } else {
              setValue(newValue ? newValue.name : newValue);
              setTag(newValue);
            }
          }}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);

            if (params.inputValue !== '' && !task.tags.some(t => t.name === params.inputValue.trim())) {
              filtered.push({
                inputValue: params.inputValue,
                name: `Create "${params.inputValue}"`,
              });
            }

            return filtered;
          }}
          options={filtered}
          getOptionLabel={(option) => {
            // e.g value selected with enter, right from the input
            if (typeof option === 'string') {
              return option;
            }
            if (option.inputValue) {
              return option.inputValue;
            }
            return option.name;
          }}
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          renderOption={(props, option) => <li {...props}>{option.name}</li>}
          fullWidth
          freeSolo
          renderInput={(params) => <TextField {...params} autoFocus />}
        />
        <Button loading={createTaskLoading} disabled={value ? false : true} size="small" variant='contained' sx={{ ml: 1 }} onClick={() => { handleClick() }}>Add</Button>
      </Box>
      {/* <Box sx={{mt: 2}}>
        <Typography>Pick a Color</Typography>
        <CirclePicker onChange={handleColorChange} />
      </Box> */}
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
                setDialogValue({
                  ...dialogValue,
                  name: event.target.value,
                })
              }
              label="Tag Name"
              type="text"
              variant="outlined"
              fullWidth
            />
            <Typography sx={{ mt: "10px" }} variant="subtitle1" gutterBottom>Pick a colour</Typography>
            <CirclePicker width="100%" color={colour} onChange={handleColorChange} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" disabled={!dialogValue.name}>Create</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Fragment>
  );
}

