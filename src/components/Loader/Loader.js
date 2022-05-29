import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { makeStyles } from '@mui/styles'
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  },
}));
function Loader() {
    const classes = useStyles();
    const isPageLoading = useSelector(state => state.Shared.isPageLoading);
  
    return (
        <Backdrop className={classes.backdrop} open={isPageLoading}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};



export default Loader;