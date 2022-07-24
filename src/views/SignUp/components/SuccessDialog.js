import * as React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as RegisterSuccess } from '../../../assets/images/register-success.svg';
import { DialogContent, Typography, Dialog, DialogTitle, Button } from '@mui/material';
import { styled } from '@mui/styles';
import { useNavigate } from 'react-router-dom';

export default function SuccessDialog(props) {
  const { onClose, open } = props;
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/');
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ textAlign: 'center' }}>Thank you for registering!</DialogTitle>
      <Content>
        <RegisterSuccess style={{ maxWidth: '200px' }} />
        <Typography component="h1" variant="h5" sx={{ marginBottom: "10px" }}>Verify your email address</Typography>
        <Typography variant="subtitle1" component="div">
          Please click on the link that has just been sent to your email account to verify your email and complete the registration process.
        </Typography>
        <Button href="/">Back to Login page</Button>
      </Content>
    </Dialog>
  );
}

const Content = styled(DialogContent)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center'
})

SuccessDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};