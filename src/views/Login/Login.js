import { useEffect } from 'react';
import {
  Button, TextField, Link, Box, Grid, Typography
} from '@mui/material'
import { styled } from '@mui/styles'
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../_actions/UserAction';
import { pageLoading, stopPageLoading } from '../../_actions/SharedAction';
import Copyright from './components/Copyright.js';
import { ReactComponent as Logo } from '../../assets/images/2do-logo-darker.svg';
import { ReactComponent as VectorOne } from '../../assets/images/login-vector1.svg';
import { ReactComponent as VectorTwo } from '../../assets/images/login-vector2.svg';


export default function Login(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.User.user_id);
  const { handleSubmit, control } = useForm();
  
  useEffect(() => {
    if (userId !== null) navigate('/today');
    // eslint-disable-next-line
  }, [userId])

  const onSubmit = data => {
    dispatch(login(data.email, data.password));
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <LeftGrid item xs={false} sm={false} md={6} sx={{ display: { xs: "none", md: "flex" } }}>
        <Box xs={false}>
          <LeftLogo />
          <Subtitle component="h1" variant="h5">
            Manage your tasks & get your work done on time with 2do.
          </Subtitle>
        </Box>
        {Math.random() < 0.5 ?
          <VectorOne style={{ maxWidth: '500px' }} /> : <VectorTwo style={{ maxWidth: '500px' }} />}
        <PrimaryText>Orbital 2022</PrimaryText>
      </LeftGrid>
      <RightGrid item xs={12} sm={12} md={6}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          <Box sx={{ display: { sm: "block", md: "none" } }}>
            <RightLogo />
          </Box>
          <Title component="h1" variant="h4">Login</Title>
          <Controller name="email" control={control} defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField margin="normal" fullWidth label="Email" value={value} onChange={onChange}
                error={!!error} helperText={error ? error.message : null} type="email" />
            )}
            rules={{ required: 'Email required' }}
          />
          <Controller name="password" control={control} defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField margin="normal" fullWidth label="Password" value={value}
                onChange={onChange} error={!!error} helperText={error ? error.message : null}
                type="password" />
            )}
            rules={{ required: 'Password required' }}
          />
          <Grid container justifyContent="flex-end">
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
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
      </RightGrid>
    </Grid>
  );
}

const Title = styled(Typography)({
  width: '100%',
  textAlign: 'left'
});

const Subtitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.8rem !important',
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
