import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import SampleMods from "../samplemods.json";

const ModuleSearch = () => {
  return (
    <Autocomplete
      id="mod"
      disableClearable
      options={SampleMods.map((option) => option.module)}
      renderInput={(params) => (
        <Grid item ref={params.InputProps.ref} sx={{ mt: "1%" }}>
          <input
            placeholder="Search for a module"
            type="text"
            {...params.inputProps}
            style={{
              height: 50,
              border: "none",
              backgroundColor: "#f5f5f3",
              borderRadius: 4.5,
              width: "100%",
              font: "inherit",
            }}
          />
        </Grid>
      )}
    />
  );
};

export default ModuleSearch;
