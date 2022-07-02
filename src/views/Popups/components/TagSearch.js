import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

export default function TagSearch() {
  return (
    <TextField
      fullWidth
      id="standard-search"
      placeholder="Search for Tags"
      type="search"
      variant="outlined"
      size="small"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  )
}