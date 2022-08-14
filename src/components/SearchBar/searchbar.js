import SearchIcon from "@mui/icons-material/Search";
import { Autocomplete, createFilterOptions, InputAdornment, Paper, TextField } from "@mui/material";
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectTask } from "../../_actions/TaskAction";

export default function SearchBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const tasklists = useSelector((state) => state.Tasklist.tasklists);
  const tags = useSelector((state) => state.Tag.tags);
  const tasks = useSelector((state) => state.Task.tasks);

  const modules = useMemo(() => {
    if (tasks) {
      const withModules = tasks.filter(t => !!t.module)
      const mods = [];
      withModules.forEach(t => {
        if (mods.findIndex(m => m.moduleCode === t.module.moduleCode) === -1) mods.push(t.module)
      })
      return mods
    } return [];

  }, [tasks])

  const options = useMemo(() => {
    const res = [];
    if (tasklists && tags && tasks && modules) {
      tasks.forEach(t => { res.push({ ...t, type: "Tasks" }) })
      tags.forEach(t => { res.push({ ...t, type: "Tags" }) })
      tasklists.forEach(t => { res.push({ ...t, type: "Tasklists" }) })
      modules.forEach(t => { res.push({ ...t, type: "Modules" }) })
      return res
    } return res

  }, [tasklists, tags, tasks, modules])

  const filterOptions = createFilterOptions({
    matchFrom: 'any',
    limit: 50,
  });

  const getUrlToNavigateTo = (data) => {
    switch (data.type) {
      case "Tasks":
        const res = data;
        delete res.type;
        dispatch(selectTask(res));
        return "/alltasks";
      case "Tags":
        return `/tag/${data._id}`
      case "Tasklists":
        return `/list/${data._id}`
      case "Modules":
        return `/module/${data.moduleCode}`
    }
  }

  return (
    <Autocomplete
      noOptionsText="No results"
      value={data}
      filterOptions={filterOptions}
      freeSolo
      options={options}
      onChange={(event, newValue) => {
        setData(newValue)
        if (newValue) navigate(getUrlToNavigateTo(newValue))
      }}
      groupBy={(option) => option.type}
      PaperComponent={({ children }) => (
        <Paper style={{ background: '#f5f3f3' }}>{children}</Paper>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search"
          variant="outlined"
          size="small"
          sx={{ width: { xs: "60%", sm: "40%" }, bgcolor: 'white', borderRadius: "8px" }}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
      )}
      getOptionLabel={(option) => !option.moduleCode ? option.title || option.name : `${option.moduleCode} ${option.title}`}
    />
  )
}

// export default SearchBar;