import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { List, ListItem, ListItemText, Typography } from "@mui/material"

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem', color: '#2B3334' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "#FFFFFF",
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    "p": {
      color: "#2B3334",
    fontWeight: 700,
    },
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: 0
}));

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Lists</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {["School", "Work"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemText primary={text} sx={{ marginLeft: '1.3rem'}} />
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Tags</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {["Tag 1", "Tag 2", "Tag 3"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemText primary={text} sx={{ marginLeft: '1.3rem'}} />
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Modules</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {["Mod 1", "Mod 2", "Mod 3"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemText primary={text} sx={{ marginLeft: '1.3rem'}} />
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
