import {
  Link, Typography
} from '@mui/material';

export default function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://nusskylab-dev.comp.nus.edu.sg/posters/2022/5365.jpg">
        Team2do
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}