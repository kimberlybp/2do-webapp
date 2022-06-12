import { Fragment } from 'react';
import {
  Button, TextField, Link, Paper, Box, Grid, Typography
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { pageLoading, stopPageLoading } from '../../_actions/SharedAction';
import Copyright from './components/Copyright.js';
import loginVectorVerOne from '../../assets/images/login-vector1.svg';
import logo from '../../assets/images/2do-logo-darker.svg';


export default function Login() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm();

  const onSubmit = async data => {
    console.log(data);
    dispatch(pageLoading());
    await setTimeout(function () {
    dispatch(stopPageLoading());
    navigate("/today", { replace: true });

    }, 3000);


    // dispatch(loginUser(data.email, data.password));
  };

  return (
    <Fragment>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={6}
          sx={{
            backgroundColor: '#D1BDE1',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img alt="2do logo" src={logo} style={{
            position: 'absolute',
            top: '6%',
            left: '7.5%',
            fill: '#7B688A'
          }} />

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <Typography className={classes.subtitle} component="h1" variant="h5">
              Manage your tasks & get your work done on time with 2do.
            </Typography>

            <img alt="Person working" src={loginVectorVerOne} style={{ maxWidth: '500px' }} />
            <Typography>Orbital 2022</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={4} square>
          <Box
            sx={{
              my: 8,
              mx: 20,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '80%'
            }}
          >
            <Typography className={classes.title} component="h1" variant="h4">
              Login
            </Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField
                    margin="normal"
                    fullWidth
                    label="Email"
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                    type="email"
                  />
                )}
                rules={{ required: 'Email required' }}
              />
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField
                    margin="normal"
                    fullWidth
                    label="Password"
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                    type="password"
                  />
                )}
                rules={{ required: 'Password required' }}
              />
              <Grid container justifyContent="flex-end">
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}>
                Sign In
              </Button>
              <Grid container>
                <Grid item display="flex">
                  <Typography>Don't have an account?</Typography>
                  <Link sx={{ marginLeft: '6px' }} href="#" variant="body2">
                    {"Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  title: {
    width: '100%',
    textAlign: 'left'
  },
  subtitle: {
    color: theme.palette.primary_grey_variant.main,
    textAlign: 'left',
    maxWidth: '500px',
    marginTop: '50px !important'
  }
}));