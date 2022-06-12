import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState, useRef } from "react";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import SampleTasks from "./sampletasks.json";
import InputBase from "@mui/material/InputBase";
import CloseIcon from "@mui/icons-material/Close";
import Views from "./components/tabviews";

const SearchDisplay = styled(Grid)({
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
      if (value.task.toLowerCase().includes(searchWord.toLowerCase())) {
        return value.task.toLowerCase().includes(searchWord.toLowerCase());
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
};

const Search = () => {
  return (
    <Grid container sx={{ ml: "18%", mt: "1.5%" }}>
      <Grid item xs={12}>
        <SearchBar sampletasks={SampleTasks}></SearchBar>
      </Grid>
      <Grid item xs={12} sx={{ my: 2 }}>
        <Typography variant="h4" fontWeight="bold" letterSpacing={0.5}>
          Search Results
        </Typography>
        <Grid item xs={12}>
          <Views></Views>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Search;