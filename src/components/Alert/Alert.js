import React from 'react';
import { Alert, AlertTitle, Grow } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { closeAlert } from '../../_actions/AlertAction';
import {
  Snackbar
} from '@mui/material';

const CustomAlert = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(state => state.Alert.isOpen);
  const severity = useSelector(state => state.Alert.severity);
  const title = useSelector(state => state.Alert.title);
  const message = useSelector(state => state.Alert.message);
  const autoHideDuration = useSelector(state => state.Alert.autoHideDuration);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    dispatch(closeAlert());
  };

  return (
    <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    open={isOpen} autoHideDuration={autoHideDuration * 1000} onClose={handleClose} TransitionComponent={Grow}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        <AlertTitle>{title}</AlertTitle>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomAlert;