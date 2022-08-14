import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Grid container sx={{ px: "30px" }}>
      <Grid item xs={12} sx={{ mb: 1 }}>
        <Typography component="h1" variant="h4">
          Frequently Asked Questions
        </Typography>
      </Grid>
    <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Question: Can I use the application on my phone and tablet?</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Typography>
              Answer: We are currently not available on the app store/google play, but you can visit our website on your phone and tablet.
            </Typography>
          </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Question: What are the tags and task lists for?</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Typography>
              Answer: They help you to categorise and sort your tasks. You can also view and search for your tasks using the tags and task lists.
            </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Question: Do I always have to add a tag for my tasks?</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Typography>
              Answer: No, you can choose not to add tags if you do not wish to do so.
            </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Question: Do I have to set a due date for my tasks?</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Typography>
            Answer: No, you do not have to set a due date if you do not wish to do so. You can find tasks without a due date under “All Tasks” → “One of these days”.
            </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Question: What if I can’t find my module on 2do?</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Typography>
            Answer: All of the modules that are available on NUSMods will be found on 2do. If there are any modules that you are unable to find but are on NUSMods, please let us know.
            </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
    </Grid>
  );
}
