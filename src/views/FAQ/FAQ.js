import { Fragment } from 'react';
import {
  Box, Typography
} from '@mui/material';
import vector from '../../assets/images/under-construction.png';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function UnderConstruction() {
  return (
    <Fragment>
      <Box sx={{ p: 5 }}>
        <Typography variant='h4'>Frequently Asked Questions</Typography>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Can I use the application on my phone or tablet?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              We are currently not available on the app store/google play, but you can visit our website on your phone and tablet.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Do I always have to add a tag for my tasks?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              No, you can choose not to add tags if you do not wish to do so.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Do I have to set a due date for my tasks?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              No, you do not have to set a due date if you do not wish to do so.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>What if I can’t find my module on 2do?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              All of the modules that are available on NUSMods will be found on 2do. If there are any modules that you are unable to find but are on NUSMods, please let us know.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Can I set reminders for my tasks?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Yes, you can choose to receive notifications at the time you wish to be notified by clicking on the add button at the “Remind me” section, or you can choose to not be notified if you don’t add any reminders.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Can I create my own task list?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              No. Currently, you can choose from “School”, “Work”, or “Others”, but further updates will be given.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Fragment>
  );
}