import { Fragment } from 'react';
import {
  Box, Typography
} from '@mui/material';
import vector from '../../assets/images/under-construction.png';

export default function UnderConstruction() {
  return(
    <Fragment>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <Typography component="h1" variant="h5" sx={{ marginTop: "100px" }}>
              Work in Progress (Milestone 1)
            </Typography>

            <img alt="Person working" src={vector} style={{ maxWidth: '500px' }} />
          </Box>
    </Fragment>
  );
}