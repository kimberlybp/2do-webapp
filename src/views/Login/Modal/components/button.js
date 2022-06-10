import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const PurpleButton = styled(Button)({
  width: 'auto',
  marginBottom: 6,
  fontSize: 16,
  padding: '6px 12px',
  border: '1px solid',
  backgroundColor: '#7134eb',
  textTransform: 'none',
  '&:hover': {
      backgroundColor: '#7134eb',
      opacity: '90%'
  }
});

export default PurpleButton;