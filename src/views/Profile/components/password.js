import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import React from "react";
import { useForm, Controller } from 'react-hook-form';
 

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
  const { handleSubmit, control, watch } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ width: "70%", margin: "auto" }}
    >
      <Grid item xs={12}>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
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
                type="password"
                id="outlined-basic"
                label="Old Password"
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sx={{ mb: 2 }}>
            <Controller name="password" control={control} defaultValue=""
                render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                fullWidth value={value} type="password"
                label="New Password" variant="outlined" size="small"
                onChange={onChange} error={!!error} helperText={error ? error.message : null}
              />
                )}
                rules={{ required: 'Password required', pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.\[\]{}\(\)?\-\"!@#%&\/,><\':;|_~`])\S{8,99}$/, // eslint-disable-line
                  message: "Must contain least 8 characters that includes at least 1 lowercase letter, uppercase letter, number and a special character with no whitespace"
                } }}
                />
            </Grid>
            <Grid item xs={12}>
            <Controller name="confirmPassword" control={control} defaultValue=""
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField fullWidth label="Confirm Password" value={value}
                    onChange={onChange} error={!!error} helperText={error ? error.message : null}
                    type="password" variant="outlined" size="small"/>
                )}
                rules={{ required: 'Confirm Password required', validate: (val) => {
                  if(watch('password') !== val) return "Passwords do not match"
                } }}
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