import { useMemo, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { List, ListItem, ListItemText, Typography, IconButton, Box, Chip } from "@mui/material"
import { useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import CreateTasklistDialog from '../../CreateTasklistDialog';
import CreateTagDialog from '../../CreateTagDialog';

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
    margin: "0",
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: 0,
  maxHeight: '290px',
  overflow: 'auto',
  '::-webkit-scrollbar': {
    height: '6px',
    width: '6px',
  },
  '::-webkit-scrollbar-track': {
    marginX: '10px',
  },
  '::-webkit-scrollbar-thumb': {
    background: 'rgba(0, 0, 0, 0.08)',
    borderRadius: '20px',
  },
}));

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = useState('panel1');
  const theme = useTheme();
  const navigate = useNavigate();
  const [showCreateTasklist, setShowCreateTasklist] = useState(false);
  const [showCreateTag, setShowCreateTag] = useState(false);
  const tasklists = useSelector((state) => state.Tasklist.tasklists);
  const tags = useSelector((state) => state.Tag.tags);
  const tasks = useSelector((state) => state.Task.tasks);


  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleCreateTasklist = (e) => {
    e.stopPropagation();
    setShowCreateTasklist(true);
  }

  const handleCreateTag = (e) => {
    e.stopPropagation();
    setShowCreateTag(true);
  }

  const modules = useMemo(() => {
    if (tasks) {
      const withModules = tasks.filter(t => !!t.module)
      const mods = [];
      withModules.forEach(t => {
        if (mods.findIndex(m => m.moduleCode === t.module.moduleCode) === -1) mods.push(t.module)
      })
      return mods
    } return [];

  }, [tasks])

  return (
    <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Box display="flex" alignItems="center" sx={{ width: "100%" }}>
            <Typography sx={{ flex: 1 }}>Lists</Typography>
            <IconButton onClick={handleCreateTasklist}><AddIcon /></IconButton>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {tasklists && tasklists.map((list, index) => (
              <ListItem button key={index} onClick={() => navigate(`/list/${list._id}`) }>
                <ListItemText primary={list.name} sx={{ marginLeft: '1.3rem'}} />
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Box display="flex" alignItems="center" sx={{ width: "100%" }}>
            <Typography sx={{ flex: 1 }}>Tags</Typography>
            <IconButton onClick={handleCreateTag}><AddIcon /></IconButton>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {tags && tags.map((tag, index) => (
              <ListItem button key={tag.name} onClick={() => navigate(`/tag/${tag._id}`)}>
                {/* <ListItemText primary={tag.name} sx={{ marginLeft: '1.3rem'}} />
                 */}
                <Chip
                  label={tag.name}
                  sx={{
                    backgroundColor: tag.colour,
                    color: `${theme.palette.getContrastText(tag.colour)} !important`,
                    marginLeft: '16px'
                  }}
                />
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
            {modules.map((mod, index) => (
              <ListItem button key={index} onClick={() => navigate(`/module/${mod.moduleCode}`)}>
                <ListItemText primary={`${mod.moduleCode} ${mod.title}`} sx={{ marginLeft: '1.3rem'}} />
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
      <CreateTasklistDialog open={showCreateTasklist} setOpen={setShowCreateTasklist}/>
      <CreateTagDialog open={showCreateTag} setOpen={setShowCreateTag}/>
    </div>
  );
}
