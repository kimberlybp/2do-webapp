import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import * as React from "react";
import { styled } from "@mui/material/styles";
import { Controller, useForm } from "react-hook-form";
import ava from "../images/pepe 4.jpg";
import Typography from "@mui/material/Typography";

const GreyButton = styled(Button)({
  width: "auto",
  marginBottom: 6,
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  padding: "6px 12px",
  border: "1px solid",
  lineHeight: 1.5,
  backgroundColor: "#e5e5e5",
  borderColor: "#e5e5e5",
  "&:hover": {
    backgroundColor: "#dbdbdb",
    borderColor: "#dbdbdb",
    boxShadow: "none",
  },
});

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

const EditProfile = () => {
  const { handleSubmit, control } = useForm();

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
          sx={{
            my: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "80%",
            backgroundColor: "white",
          }}
        >
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={12}>
              <Grid container direction="row" columnSpacing={20} rowSpacing={3}>
                <Grid item xs={12} sm={2}>
                  <Avatar
                    sx={{ width: 120, height: 120, border: 2 }}
                    alt="Avatar"
                    src={ava}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={8}
                  md={6}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <GreyButton variant="contained">
                    <Typography color="black">
                      Change Profile Picture
                    </Typography>
                  </GreyButton>
                  <GreyButton variant="contained">
                    <Typography color="black">
                      Remove Profile Picture
                    </Typography>
                  </GreyButton>
                  JPG or PNG only
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container rowSpacing={2}>
                <Box
                  component="form"
                  onSubmit={handleSubmit(onSubmit)}
                  sx={{ width: "100%" }}
                >
                  <Grid item xs={12}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      flexDirection: "row",
                      mt: 6,
                      mb: 1.3,
                    }}
                  >
                    <Controller name="firstName" control={control} defaultValue=""
                      render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField sx={{ width: "49.2%" }} label="First Name" value={value} onChange={onChange}
                          error={!!error} helperText={error ? error.message : null}
                          variant="outlined"
                          size="small"
                        />
                      )}
                      rules={{ required: 'First Name required' }}
                    />
                    <Controller name="lastName" control={control} defaultValue=""
                      render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField
                          sx={{ width: "49.2%" }} value={value} onChange={onChange}
                          label="Last name" error={!!error} helperText={error ? error.message : null}
                          variant="outlined"
                          size="small"
                        />
                      )}
                      rules={{ required: 'Last Name required' }}
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ display: "flex" }}>
                    <Controller
                      name="email"
                      control={control}
                      defaultValue=""
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <TextField
                          fullWidth
                          label="Email"
                          variant="outlined"
                          size="small"
                          value={value}
                          onChange={onChange}
                          error={!!error}
                          helperText={error ? error.message : null}
                          type="email"
                        />
                      )}
                      rules={{ required: 'Email required' }}
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ mt: 15 }}>
                    <Grid container justifyContent="flex-end">
                      <PurpleButton type="submit">
                        <Typography color="white">Save Changes</Typography>
                      </PurpleButton>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default EditProfile;
