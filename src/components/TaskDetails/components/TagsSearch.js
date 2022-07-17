import { useState, useMemo, Fragment } from 'react';
import { TextField, Box } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { useDispatch } from "react-redux";
import { CirclePicker } from 'react-color';
import { Typography } from '@mui/material';

const filter = createFilterOptions();

export default function TagsSearch(props) {
  const { task, updateTask } = props;
  const dispatch = useDispatch();
  const [value, setValue] = useState(null);
  const [tag, setTag] = useState(null);
  const [color, setColor] = useState(null);
  const [open, toggleOpen] = useState(false);

  const handleClose = () => {
    setDialogValue({
      name: '',
      tagId: '',
    });

    toggleOpen(false);
  };

  const [dialogValue, setDialogValue] = useState({
    name: '',
    tagId: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setValue(dialogValue.name);
    setTag({ name: dialogValue.name, color: color });

    handleClose();
  };

  const handleClick = () => {
    const updated = task.tags;
    updated.push({
      name: tag.name, color: tag.color
    })
    dispatch(updateTask('tags', updated));
  }

  const handleColorChange = (color, event) => {
    setColor(color.hex);
  }

  //TODO: replace with api
  const top100Films = [
    { tagId: 12, name: "hello", color: "#FFA500" },
    { tagId: 13, name: "bye", color: "#FFC0CB" },
    { tagId: 14, name: "boo", color: "#00FF00" }
  ];

  const filtered = useMemo(() => {
    return top100Films.filter((elem) => !task.tags.find(({ name }) => elem.name === name) && elem.color);
    // eslint-disable-next-line
  }, [task])

  return (
    <Fragment>
      <Box display="flex">
        <Autocomplete
          size="small"
          value={value}
          onChange={(event, newValue) => {
            if (typeof newValue === 'string') {
              // timeout to avoid instant validation of the dialog's form.
              setTimeout(() => {
                toggleOpen(true);
                setDialogValue({
                  name: newValue,
                  tagId: '',
                });
              });
            } else if (newValue && newValue.inputValue) {
              toggleOpen(true);
              setDialogValue({
                name: newValue.inputValue,
                tagId: '',
              });
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
          id="free-solo-dialog-demo"
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
        <Button disabled={value ? false : true} size="small" variant='contained' sx={{ ml: 1 }} onClick={() => { handleClick() }}>Add</Button>
      </Box>
      {/* <Box sx={{mt: 2}}>
        <Typography>Pick a Color</Typography>
        <CirclePicker onChange={handleColorChange} />
      </Box> */}
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Create a new Tag</DialogTitle>
          <DialogContent>
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
              variant="standard"
            />
            <Typography sx={{ mt: "10px" }}>Pick a color</Typography>
            <CirclePicker onChange={handleColorChange} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Create</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Fragment>
  );
}

