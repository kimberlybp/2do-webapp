import { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { stopPageLoading } from '../../_actions/SharedAction';
import {
  Box, Typography
} from '@mui/material';
import vector from '../../assets/images/under-construction.png';

export default function Today() {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  useEffect(() => {
    dispatch(stopPageLoading());

    // eslint-disable-next-line
  }, [])

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
          </Box>
    </Fragment>
  );
}