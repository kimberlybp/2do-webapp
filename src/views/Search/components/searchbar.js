import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import React, {useState, useRef, useEffect} from "react";
import { styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close'
import { TextField, Autocomplete, InputAdornment, Divider, Paper, InputBase } from "@mui/material";

/*const SearchDisplay = styled(Grid)({
  "&:hover": {
    backgroundColor: "#f5f5f3",
  },
  "&:focus": {
    backgroundColor: "primary",
  },
});

const SearchIconWrapper = styled("div")({
  paddingLeft: 10,
  paddingTop: 8,
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
});

const SearchBox = styled("div")({
  borderRadius: 3,
  backgroundColor: "white",
  width: 350,
});

const StyledInputBase = styled(InputBase)({
  color: "#2b3334",
  "& .MuiInputBase-input": {
    padding: 7,
    paddingLeft: 40,
    width: "100%",
  },
});

const SearchBar = ({ sampletasks }) => {
  const [filteredTask, setFilteredTask] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const ref = useRef();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const checkClickedOutside = (e) => {
      if (isDropdownOpen && ref.current && !ref.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", checkClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkClickedOutside);
    };
  }, [isDropdownOpen]);

  const handleFilter = (e) => {
    const searchWord = e.target.value;
    setWordEntered(searchWord);
    const newFilter = sampletasks.filter((value) => {
      if (value.title.toLowerCase().includes(searchWord.toLowerCase())) {
        return value.title.toLowerCase().includes(searchWord.toLowerCase());
      }
     if (
        !value.task.toLowerCase().includes(searchWord.toLowerCase()) &&
        value.tasklist.toLowerCase().includes(searchWord.toLowerCase())
      ) {
        return value.tasklist.toLowerCase().includes(searchWord.toLowerCase());
      } else {
        return value.tag.toLowerCase().includes(searchWord.toLowerCase());
      }
    });

    if (searchWord === "") {
      setFilteredTask([]);
    } else {
      setFilteredTask(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredTask([]);
    setWordEntered("");
  };

  return (
    <Grid container ref={ref} sx={{ width: 350 }}>
      <SearchBox
        onChange={handleFilter}
        onClick={() => setIsDropdownOpen((oldState) => !oldState)}
      >
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <Grid container justifyContent="flex-end" sx={{ height: 2 }}>
          <Grid item sx={{ mr: "2%", mt: "1.7%" }}>
            <CloseIcon onClick={clearInput} sx={{ color: "#6d6d6d" }} />
          </Grid>
        </Grid>
        <StyledInputBase placeholder="Search" value={wordEntered} />
      </SearchBox>
      <Box
        component={Paper}
        elevation={2}
        bgcolor="white"
        sx={{
          width: "inherit",
          borderRadius: 1,
          mt: 4.8,
          opacity: "99%",
          zIndex: 1,
          position: "absolute",
        }}
      >
        {filteredTask.length !== 0 && isDropdownOpen && (
          <div>
            {filteredTask.slice(0, 5).map((value, index) => {
              return (
                <SearchDisplay
                  container
                  direction="column"
                  sx={{ width: "inherit" }}
                  key={index}
                >
                  <Typography fontWeight={700} sx={{ ml: "11%" }}>
                    {value.module} {value.task}
                  </Typography>
                  <Typography sx={{ ml: "11%" }}>
                    {value.tasklist} | {value.tag}
                  </Typography>
                </SearchDisplay>
              );
            })}
          </div>
        )}
      </Box>
    </Grid>
  );
};*/

const sampleData = [
  {
    id: 0,
    title: 'Finish & submit lab 3',
    tasklist: 'School',
    module: "CS2106",
    tag: "High",
    api: "Tasks"
  },
  {
    id: 1,
    title: "Finish assignment 3",
    tasklist: "School",
    module: "MA2001",
    tag: "High",
    api: "Tasks"
  },
  {
    id: 2,
    title: "Do tutorial 8",
    tasklist: "School",
    module: "MA2001",
    tag: "Medium",
    api: "Tasks"
  },
  {
    id: 3,
    title: "Buy muji pens",
    tasklist: "Random",
    module: "",
    tag: "Low",
    api: "Tasks"
  },
  {
    id: 4,
    title: "Email members about event",
    tasklist: "CCA",
    module: "",
    tag: "High",
    api: "Tasks"
  },
  {
    id: 5,
    title: "Watch 2 videos",
    tasklist: "Work",
    module: "",
    tag: "Medium",
    api: "Tasks"
  },
  {
    id: 6,
    title: "Do tutorial 7",
    tasklist: "School",
    module: "ST2131",
    tag: "Medium",
    api: "Tasks"
  },
  {
    id: 7,
    name: 'High',
    colour: 'red',
    api: "Tags"
  },
  {
    id: 8,
    name: 'Medium',
    colour: 'Yellow',
    api: "Tags"
  },
  {
    id: 9,
    name: 'School',
    api: "Task Lists"
  },
  {
    id: 10,
    name: 'Work',
    api: "Task Lists"
  }
];

export default function SearchBar() {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(sampleData)
  }, []);

  return (
    <Autocomplete
      freeSolo
      id="free-solo-demo"
      options={data}
      groupBy={(option) => option.api} //think need change
      PaperComponent={({ children }) => (
          <Paper style={{ background: '#f5f3f3' }}>{children}</Paper>
        )}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search"
          variant="outlined"
          size="small"
          sx={{ width: {xs:"60%", sm:"40%"}, bgcolor: 'white', borderRadius:1 }}
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
      getOptionLabel={(option) => option.title || option.name}
      renderOption={(props, option) => {
        if (option.title !== undefined) {
          return <li {...props} key={option.id}>
            <Typography fontWeight={600}>{`${option.title}`}</Typography>
          </li>;
        } else {
          return <li {...props} key={option.id}>
            <Typography fontWeight={600}>{`${option.name}`}</Typography>
          </li>;
        }
      }}
    />
  )
}

//export default SearchBar;