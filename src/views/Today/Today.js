import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, Button
} from '@mui/material';
import vector from '../../assets/images/under-construction.png';
import { logOut } from '../../_actions/AuthAction';

export default function Today() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.User.userId);

  useEffect(() => {
    if(userId === null) navigate('/');

    // eslint-disable-next-line
  }, [userId])

  const onClick = () => {
    dispatch(logOut());
  }

  return(
    <Fragment>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <Typography component="h1" variant="h5" sx={{ marginTop: "100px" }}>
              TODAY
            </Typography>

            <img alt="Person working" src={vector} style={{ maxWidth: '500px' }} />
            <Button variant="contained" onClick={onClick}>
              Log out
            </Button>
          </Box>
    </Fragment>
  );
}