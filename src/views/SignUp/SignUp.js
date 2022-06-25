import { Fragment, useEffect, useState } from 'react';
import {
  Button, TextField, Link, Box, Grid, Typography, FormControlLabel, Checkbox
} from '@mui/material'
import { styled } from '@mui/styles'
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../_actions/UserAction';
import { pageLoading, stopPageLoading } from '../../_actions/SharedAction';
import { ReactComponent as Logo } from '../../assets/images/2do-logo-darker.svg';
import { ReactComponent as VectorOne } from '../../assets/images/register-vector1.svg';
import SuccessDialog from './components/SuccessDialog';


export default function SignUp(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.User.userId);
  const status = useSelector((state) => state.Auth.signUpStatus);
  const { handleSubmit, control, watch } = useForm();

  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (userId !== null) navigate('/today');
    // eslint-disable-next-line
  }, [userId])

  useEffect(() => {
    if (status) setOpen(true);
    // eslint-disable-next-line
  }, [status])

  const onSubmit = data => {
    console.log(data);
    // setOpen(true)
    dispatch(signUp(data))
  };

  return (
    <Fragment>
    <Grid container component="main" sx={{ height: '100vh' }}>
      <LeftGrid item xs={false} sm={false} md={6} sx={{ display: { xs: "none", md: "flex" } }}>
        <Box xs={false}>
          <LeftLogo />
          <Subtitle component="h1" variant="h5">
            Discover the task management tool that helps you to get things done
          </Subtitle>
        </Box>
        <VectorOne style={{ maxWidth: '100%', marginTop: '5%' }} />
      </LeftGrid>
      <RightGrid item xs={12} sm={12} md={6}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1, maxWidth: "450px" }}>
          <Box sx={{ display: { sm: "block", md: "none" } }}>
            <RightLogo />
          </Box>
          <Title component="h1" variant="h4">Sign Up</Title>
          <Grid container columnSpacing={2}>
            <Grid item xs={12} sm={6}>
              <Controller name="firstName" control={control} defaultValue=""
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField margin="normal" fullWidth label="First Name" value={value} onChange={onChange}
                    error={!!error} helperText={error ? error.message : null} />
                )}
                rules={{ required: 'First Name required' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller name="lastName" control={control} defaultValue=""
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField margin="normal" fullWidth label="Last Name" value={value}
                    onChange={onChange} error={!!error} helperText={error ? error.message : null} />
                )}
                rules={{ required: 'Last Name required' }}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller name="email" control={control} defaultValue=""
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField margin="normal" fullWidth label="Email" value={value} onChange={onChange}
                    error={!!error} helperText={error ? error.message : null} type="email" />
                )}
                rules={{ required: 'Email required' }}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller name="password" control={control} defaultValue=""
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField margin="normal" fullWidth label="Password" value={value}
                    onChange={onChange} error={!!error} helperText={error ? error.message : null}
                    type="password" />
                )}
                rules={{ required: 'Password required', pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.\[\]{}\(\)?\-\"!@#%&\/,><\':;|_~`])\S{8,99}$/,
                  message: "Must contain least 8 characters that includes at least 1 lowercase letter, uppercase letter, number and a special character with no whitespace"
                } }}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller name="confirmPassword" control={control} defaultValue=""
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField margin="normal" fullWidth label="Confirm Password" value={value}
                    onChange={onChange} error={!!error} helperText={error ? error.message : null}
                    type="password" />
                )}
                rules={{ required: 'Confirm Password required', validate: (val) => {
                  if(watch('password') != val) return "Passwords do not match"
                } }}
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Register
          </Button>
          <Grid container>
            <Grid item display="flex">
              <Typography>Already have an account?</Typography>
              <Link sx={{ marginLeft: '6px' }} href="/" variant="body2">
                {"Login"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </RightGrid>
    </Grid>
    <SuccessDialog onClose={() => setOpen(false)} open={open} />
    </Fragment>
  );
}

const Title = styled(Typography)({
  width: '100%',
  textAlign: 'left'
});

const Subtitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.6rem !important',
  color: theme.palette.primary_grey_variant.main,
  textAlign: 'left',
  maxWidth: '500px',
  margin: '10px 0 !important'
}));

const LeftGrid = styled(Grid)({
  backgroundColor: '#D1BDE1',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  flexDirection: 'column !important',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '4rem 2rem',
});

const RightGrid = styled(Grid)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '4rem 2rem'
});

const LeftLogo = styled(Logo)({
  placeSelf: 'flex-start',
  color: '#7B688A',
});

const RightLogo = styled(Logo)({
  placeSelf: 'flex-start',
  color: '#7134EB',
  marginBottom: '10px'
});

const PrimaryText = styled(Typography)({
  color: '#7B688A'
});
