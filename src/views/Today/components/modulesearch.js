import * as React from 'react';
import { useSelector, useDispatch } from "react-redux";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { createFilterOptions } from '@mui/material'
import { taskLoading, taskLoadingDone } from '../../../_actions/SharedAction';
import { getAllModules } from '../../../_actions/ModuleAction';

export default function ModuleSearch() {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const loading = useSelector((state) => state.Shared.loadingTasks['moduleSearch']);
  const allMods = useSelector((state) => state.Module.allModules);
  const filterOptions = createFilterOptions({
    matchFrom: 'any',
    limit: 500,
  });

  React.useEffect(() => {
    dispatch(getAllModules());
  }, []);

  React.useEffect(() => {
    if (!allMods) return;

  }, [allMods]);

  return (
    <Autocomplete
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      filterOptions={filterOptions}
      isOptionEqualToValue={(option, value) => option.title === value.title}
      getOptionLabel={(option) => `${option.moduleCode} ${option.title}`}
      options={allMods}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          size="small"
          placeholder="Search for a Module"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} sx={{ marginRight: "35px" }} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
