import { Box, Paper, Grid, Popper, Button, Typography, Checkbox, ClickAwayListener, Tooltip, IconButton } from "@mui/material";
import React from "react";
import TaskListDropDown from "./TaskListDropdown";
import DateRangePicker from "./DateRange";
import TagSearch from "./TagSearch";
import FilterListIcon from '@mui/icons-material/FilterList';
import { styled } from "@mui/material/styles";

const Headers = styled(Typography)({
  variant: "h7",
  fontWeight: 600,
  color: "#2B3334"
});


export default function Filter() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const handleClickAway = () => {
    setOpen(false);
  };

  const handleClick = (event) => {
    setOpen((prev) => !prev);
    setAnchorEl(event.currentTarget);
  };

  const id = open ? "popper" : undefined;
  return (
    <ClickAwayListener mouseEvent="onMouseUp" onClickAway={handleClickAway}>
      <Grid container>
        <Tooltip title="List">
          <IconButton onClick={handleClick}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
        <Popper id={id} open={open} anchorEl={anchorEl}>
          <Box
            component={Paper}
            elevation={1}
            sx={{
              bgcolor: "white",
              width: '320px',
              height: 'auto',
              alignItems: "stretch",
              justifyContent: "center",
              display: "flex",
              flexDirection: 'column'
            }}
          >
            <Grid container direction="column" wrap="nowrap" sx={{ paddingLeft: '15px', paddingRight: '15px' }}>
              <Grid item sx={{ mb: '5px' }}>
                <Typography sx={{ fontSize: 18, fontWeight: 800, color: "#2B3334", mt: "15px" }}>
                  Filters
                </Typography>
              </Grid>
              <Grid item >
                <Headers sx={{ mb: '5px' }}>
                  Task List
                </Headers>
                <TaskListDropDown />
              </Grid>
              <Grid item sx={{ mt: '12px' }}>
                <Headers>
                  Due Date
                </Headers>
                <Headers sx={{ mb: '5px' }}>
                  Date Range
                </Headers>
                <DateRangePicker />
                <Grid container direction="row" display="flex" alignItems="center" justifyContent="space-between">
                  <Headers>
                    Include Tasks without a Due Date
                  </Headers>
                  <Checkbox disableRipple defaultChecked />
                </Grid>
              </Grid>
              <Grid item>
                <Headers sx={{ mb: '5px' }}>
                  Tags
                </Headers>
                <TagSearch/>
              </Grid>
              <Grid item sx={{ display: 'flex', justifyContent: "center", mt: "40px" }}>
                <Button color="error" sx={{ bgcolor: "#F9F9F9", width: "236px", height: "47px", fontWeight: 400 }}>Reset all filters</Button>
              </Grid>
            </Grid>
            <Grid container display="flex" justifyContent="center" alignItems="flex-end">
              <Grid item xs={5.5} sx={{ mt: '20px' }}>
                <Button color="primary_grey_variant" sx={{ fontWeight: 400 }}>Cancel</Button>
              </Grid>
              <Grid item>
                <Button color="secondary" sx={{ fontWeight: 400 }}>Apply</Button>
              </Grid>
            </Grid>
          </Box>
        </Popper>
      </Grid>
    </ClickAwayListener>
  )
}