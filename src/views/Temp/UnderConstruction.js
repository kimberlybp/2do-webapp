import { Fragment } from 'react';
import {
  Box, Typography
} from '@mui/material';
import vector from '../../assets/images/bug.png';

export default function UnderConstruction() {
  return(
    <Fragment>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <Typography component="h1" variant="h5" sx={{ marginTop: "100px", mb: 1 }}>
              Bug fixes in progress..
            </Typography>
            <Typography component="h1" variant="h6" sx={{ mb: 2 }}>
              We apologise for the inconvenience :(
            </Typography>

            <img alt="Bug fixes" src={vector} style={{ maxWidth: '500px' }} />
          </Box>
    </Fragment>
  );
}