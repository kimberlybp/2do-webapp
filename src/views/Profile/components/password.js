import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import React from "react";
 

const PurpleButton = styled(Button)({
  fontSize: 16,
  padding: "6px 12px",
  border: "1px solid",
  backgroundColor: "#7134eb",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#7134eb",
    opacity: "90%",
  },
});

const Password = () => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ width: "70%", margin: "auto" }}
    >
      <Grid item xs={12}>
        <Box
          sx={{
            my: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "80%",
            backgroundColor: "white",
          }}
        >
          <Grid container justifyContent="center" alignItems="flex-start">
            <Grid item xs={12} sx={{ mb: 2 }}>
              <Typography fontWeight="bold" component="h1" variant="h6">
                Change Password
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ mb: 2 }}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Old Password"
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sx={{ mb: 2 }}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="New Password"
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Confirm New Password"
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 15 }}>
              <Grid container justifyContent="flex-end">
                <PurpleButton type="submit">
                  <Typography color="white">Change</Typography>
                </PurpleButton>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Password;