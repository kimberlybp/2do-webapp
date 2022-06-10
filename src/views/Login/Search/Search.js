import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState, useRef } from 'react';
import Divider from '@mui/material/Divider';
import Radio from '@mui/material/Radio';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import RectangleRoundedIcon from '@mui/icons-material/RectangleRounded';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import SampleTasks from './sampletasks.json';
import SampleMods from './samplemods.json';
import InputBase from '@mui/material/InputBase';
import CloseIcon from '@mui/icons-material/Close';
import Tab from '@mui/material/Tab';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


const NewTab = styled(Tab)({
  textTransform:'none',
  fontWeight: 700,
  fontSize: 16
})

const NewButton = styled(Button)({
  width: 'auto',
  marginBottom: 6,
  boxShadow: 'none',
  textTransform: 'none',
  textEmphasisColor: '#f5f5f3',
  fontSize: 16,
  padding: '6px 12px',
  border: '1px solid',
  lineHeight: 1.5,
  backgroundColor: '#f5f5f3',
  borderColor: '#f5f5f3',
  '&:hover'
  
  : {
      backgroundColor: '#dbdbdb',
      borderColor: '#dbdbdb',
      boxShadow: 'none'
  }
});

function SelectTaskList() {
  const [selectTaskList, setselectTaskList] = useState('');

  const handleChange = (event) => {
    setselectTaskList(event.target.value);
  };

  return (
    <Box sx={{ minWidth: "100%" }} size="small">
      <FormControl fullWidth sx={{ height:0 }}>
        <Select
          size="small"
          variant="filled"
          disableUnderline
          value={selectTaskList}
          label="Task List"
          onChange={handleChange}
        >
          <MenuItem value={"School"}>School</MenuItem>
          <MenuItem value={"Work"}>Work</MenuItem>
          <MenuItem value={"CCA"}>CCA</MenuItem>
          <MenuItem value={"Random"}>Random</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}


const Tag = (level) => {
  if (level === "High") {return "red"}
  if (level === "Medium") {return "orange"}
  else {return "green"} //for user to select
}

const TaskType = (Type) => {
  if (Type === "School") {return Type}
  if (Type === "Work") {return Type}
  else {return "Random"} //for user to select
}

const RadioButton = () => {
    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (e) => {
        setSelectedValue(e.target.value);
    };

    return (
        <Radio
            color="default"
            checked={selectedValue === 'a'}
            onChange={handleChange}
        />
    );
    }

const PriorityButton = styled(Button) ({
  height:30,
  borderRadius:20,
  fontWeight:700,                       
  textTransform:'none',
  '&:hover': {
    opacity:'75%',
    backgroundColor:Tag("High")
}
})

const AddTagButton = styled(Button) ({
  height:30,
  borderRadius:20, 
  fontWeight:700,
  borderColor:"black", 
  color:"black",
  textTransform:'none',
  '&:hover': {
    opacity:'70%', borderColor:'black'
}
})

const SearchDisplay = styled(Grid) ({
  '&:hover': {
    backgroundColor:"#f5f5f3"
  },
  '&:focus': {
    backgroundColor:"primary"
  }
})


const ViewTask = () => {
    return (
        <Grid container sx={{ width: {xs:"150%", sm:"100%"} }}>
            <Box sx={{
                mr: '21%',
                ml: {xs:'-6%', sm:'-3%', lg:"-1.5%"},
                mt:-3,
                mb:2,
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                height: 'auto',
                width: {xs:'100%', sm:'80%'},
                backgroundColor: 'white',
                position:'absolute',
                }}
                component={Paper} elevation={2}
                >
                <Grid container sx={{ ml:'1%', mt:'0.5%'}}> 
                  <Grid container direction="row" sx={{ minWidth:"50%" }}>
                    <Grid item xs={3.2} sm={2.1} xl={0.8} md={1.3} lg={1} sx={{ maxWidth:"20%" }}>            
                        <RadioButton/>
                    </Grid>   
                    <Grid item xs={9} md={10} xl={7.5}>
                      <Grid item xs={12}> 
                          <Typography fontWeight={700} fontSize={20} sx={{ mt:'2.2%' }}>Finish & submit lab 3</Typography>
                      </Grid>
                      <Grid item xs={12}>
                      <Grid container direction="row" sx={{ maxWidth:{xs:150, sm:160, md:380} }}>
                            <Grid item sx={{ mr:'2%', height:20 }}>
                              <RectangleRoundedIcon sx={{ color:Tag("High") }} />
                            </Grid>
                            <Grid item sx={{ mr:'2%' }}>
                              <Divider orientation="vertical" sx={{ height: { sm:22 } }} />
                            </Grid>
                            <Grid item sx={{ mr:'2%' }}>
                              <Typography color='#6d6d6d'> {TaskType("School")} </Typography>
                            </Grid>
                            <Grid item sx={{ mr:'2%' }}>
                              <Divider orientation="vertical" sx={{ height: { sm:22 } }} />
                            </Grid>
                            <Grid item sx={{ mr:'2%' }}>
                              <Typography color='#6d6d6d'> CS2106 </Typography>
                            </Grid>
                            <Grid item sx={{ mr:'2%' }}>
                              <Divider orientation="vertical" sx={{ height: { xs:21, sm:22 } }} />
                            </Grid>
                            <Grid item sx={{ mr:'2%' }}>
                              <Typography color='#6d6d6d'> Due 7:00 PM </Typography>
                            </Grid>
                            <Grid item sx={{ mr:'2%' }}>
                              <Divider orientation="vertical" sx={{ height: { xs:21, sm:22 }, maxWidth:2 }} />
                            </Grid>
                            <Grid item sx={{ mr:'2%' }}>
                              <NotificationsActiveOutlinedIcon sx={{ stroke:"white", strokeWidth:0.8, color:"#6d6d6d" }}/>
                            </Grid>
                      </Grid>
                      </Grid>
                      </Grid>
                    </Grid>
                </Grid>   
                <Divider orientation="vertical" flexItem />
                    <Grid container justifyContent='flex-start' alignItems="flex-start" sx={{ mt:{xs:'1%', md:'2%'}, ml: {xs:'2%', md:'3%'}, mr: {xs:'2%', md:'3%'} }}>
                        <Grid item xs={12}>
                            <Grid container direction="row">
                                    <Typography color="#5d2ac2" fontWeight={700} fontSize={20} xs={5}>
                                        Task Details
                                    </Typography>
                                    <Box sx={{ backgroundColor:"#f5f3f3", mt:'1%', ml:'1%', height:17 }}>
                                      <Typography color="black" fontSize={12}>
                                        Incomplete
                                      </Typography>
                                    </Box>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography fontWeight={700} fontSize={{xs:30, md:38}} >
                              Finish & submit lab 3
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Grid container direction="row">
                            <PriorityButton variant="contained" size="small" disableElevation 
                            sx={{ bgcolor:"red", color:"white", mr:1, mb:1 }}>
                            High <CloseIcon fontSize="small" sx={{ mr:'-4%', mt:'-2%' }}/>
                            </PriorityButton>
                            <AddTagButton variant="outlined" size="small" disableElevation>
                              <AddIcon fontSize="small" sx={{ ml:'-4%', mt:'-2%' }}/> Add Tag
                            </AddTagButton>
                          </Grid>
                        </Grid>
                        <Grid item xs={12} sx={{ mt:'2%' }}>
                          <Typography fontWeight={700} sx={{ color:"#6d6d6d" }}> Task Description</Typography>
                        </Grid>
                        <Grid item xs={12} sx={{ mt:'0.5%' }}>
                            <TextField
                              multiline
                              variant="standard"
                              placeholder={"Add any extra notes you have here"}
                              type="text"
                              sx={{ width:"92%", border:"none", font:"inherit", outline:'none' }}
                              InputProps={{disableUnderline: true}}
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ mt:'3%' }}>
                          <Typography fontWeight={700} sx={{ color:"#6d6d6d" }}> Subtasks </Typography>
                        </Grid>
                        <Grid item xs={12} sx={{ mt:'0.5%' }}>
                          <Grid container direction="row" sx={{ ml:'-0.5%' }}>
                            <Grid item>
                              <RadioButton/>
                            </Grid>
                            <Grid item sx={{ mt:{xs:'3%', md:'1%'}, maxWidth:"75%" }}>
                              <TextField
                                multiline
                                variant="standard"
                                placeholder={"Add a subtask"}
                                type="text"
                                sx={{ width:{xs:"79%", sm:"136%", md:"160%", lg:"225%", xl:"285%"}, border:"none", font:"inherit", color:"#6d6d6d"}}
                                InputProps={{disableUnderline: true}}
                              />
                            </Grid>
                          </Grid>
                          
                          <Grid item xs={12} sx={{ mt:'2%' }}>
                            <Grid container direction="row">
                              <Grid item xs={12} md={6}>
                                <Typography fontWeight={700} sx={{ color:"#6d6d6d" }}>
                                  Due Date
                                </Typography>
                                <Box sx={{ backgroundColor:"#f5f3f3", height:49, mr:{md:'5%'}, borderRadius:1 }}>
                                  <Grid container alignItems="center" >
                                    <Typography fontSize={15} sx={{ color:"black", mt:"7%", ml:"2%" }}>
                                      3 June 2022, 7:00 PM
                                    </Typography>
                                  </Grid>
                                </Box>
                              </Grid>
                          
                              <Grid item xs={12} md={6} sx={{ mt:{xs:"4%", md:"0%"}, mb:{xs:"15%", sm:"9%", md:"0%"} }}>
                              <Typography fontWeight={700} sx={{ color:"#6d6d6d" }}>
                                Task List
                              </Typography>
                                <SelectTaskList ></SelectTaskList>
                              </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                          <Divider sx={{ mt:"2%", display: { xs: 'none', sm: 'block' } }} />
                        </Grid>
                        <Grid item xs={12}>
                          <Grid container direction="row">
                            <Grid item xs={9.8} md={11.3}>
                              <Typography fontWeight={700} sx={{ color:"#6d6d6d", my:"1%" }}>
                                Remind Me
                              </Typography>
                            </Grid>
                            <Grid item>
                              <AddIcon sx={{ ml:{xs:"1%", sm:"2.3%", md:"-1%", lg:"-0.2%", xl:"0.4%"}, mt:'0.3%', opacity:"80%", position:"absolute" }}/>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={12}>
                          <NewButton sx={{ width:"100%", height:50, overflow: "hidden", textOverflow:"ellipsis", display:"box" }}>
                            <NotificationsActiveOutlinedIcon sx={{ color:"#2f80ed", mr:"1%", ml:"-1.7%" }}/>
                            <Grid container justifyContent="flex-start" alignItems="flex-start">
                                <Typography fontWeight={700} color="#2f80ed">
                                  15 mins before (3 June 2022, 6:45 PM)
                                </Typography>
                            </Grid>
                            <CloseIcon sx={{ mr:"-1.5%", color:"black", opacity:"70%" }}/>
                          </NewButton>
                        </Grid>
                        <Grid item xs={12}>
                          <Divider sx={{ my:"1%" }}/>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography fontWeight={700} sx={{ color:"#6d6d6d", mt:"1%" }}>
                            Link to Module
                          </Typography>
                          <Typography fontSize={11} color="#6d6d6d">
                            from NUSMods
                          </Typography>
                          <ModuleSearch samplemods={SampleMods}></ModuleSearch>
                          <Grid item xs={12}>
                            <Typography color="#6d6d6d" fontStyle="italic" fontSize={11} sx={{ mt:"5%" }}>
                                Created on 1 May 2022, Monday 2:49 PM<br></br>
                                Last updated on 2 May 2022, Monday 2:49 PM
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Divider sx={{ mb:"1%", mt:"2%", background:"#464646", opacity:'80%' }}/>
                        </Grid>
                        <Grid container direction="row" justifyContent="space-between" sx={{ mt:'4%', mb:'3%' }}>
                          <NewButton sx={{ height:49, color:"red", fontSize:{xs:13, sm:16, md:18}, fontWeight:{xs:900, sm:700}, width: { xs:"39%", md:"28%" } }}>
                            <DeleteOutlineIcon sx={{ mr:"5%", ml:"-2%" }}/>
                            Delete Task
                            </NewButton>
                          <NewButton sx={{ height:49, color:"primary", fontSize:{xs:13, sm:16, md:18}, fontWeight:{xs:900, sm:700}, width: { xs:"49%", md:"38%" } }}>
                            <CheckCircleOutlineIcon sx={{ mr:"5%", ml:"-2%" }}/>
                            Mark as Complete
                          </NewButton>
                       
                        </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Grid>
    )
}

function ViewTaskList() {
  return (
    <Grid container>
      <Box 
      sx={{ 
        mr: '21%',
        ml: {xs:'-7%', sm:'-1.5%'},
        mt:-3,
        mb:2,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        height: 500,
        width: {xs:'100%', sm:'60%', md:'40%'},
        bgcolor:"white" }}
        component={Paper} elevation={2}>
        <Grid item xs={11.5} sx={{ my:"2%" }}>
          <Box sx={{ border:0.5, borderRadius:1 }}>
            <Grid item sx={{ ml:'1%', my:'1%' }}>
              <Typography fontWeight={700}>
                School
              </Typography>
              <Typography fontSize={13.5} color="#6d6d6d">
                0/10 Tasks completed
              </Typography>
            </Grid>
          </Box>
        </Grid>
          
      </Box>
    </Grid>
  )
};

function ViewTag() {
  return (
    <Grid container>
      <Box 
      sx={{ 
        mr: '21%',
        ml: {xs:'-7%', sm:'-1.5%'},
        mt:-3,
        mb:2,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        height: 500,
        width: {xs:'100%', sm:'60%', md:'40%'},
        bgcolor:"white" }}
        component={Paper} elevation={2}>
        <Grid item xs={11.5} sx={{ my:"2%" }}>
          <Box sx={{ border:0.5, borderRadius:1 }}>
            <Grid item sx={{ ml:'1%', my:'1%' }}>
              <Typography fontWeight={700}>
                High
              </Typography>
            </Grid>
            <Grid container direction="row" sx={{ ml:'1%', mt:'-1%', mb:'1%' }}>
              <RectangleRoundedIcon sx={{ color:Tag("High"), mr:'1%', fontSize:18 }} />
              <Typography fontSize={13.5} color="#6d6d6d">
                0/10 Tasks completed
              </Typography>
            </Grid>
          </Box>
        </Grid>
        </Box>
      </Grid>
  )
}

const SearchIconWrapper = styled('div')({
  paddingLeft:10,
  paddingTop:8,
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
});

const SearchBox = styled('div')({
  borderRadius: 3,
  backgroundColor: "white",
  width: 350
});

const StyledInputBase = styled(InputBase)({
  color: "#2b3334",
  '& .MuiInputBase-input': {
    padding: 7,
    paddingLeft: 40,
    width: '100%',
  },
});


const ModuleSearch = () => {
  return (
    <Autocomplete
      id="mod"
      disableClearable
      options={SampleMods.map((option) => option.module)}
      renderInput={(params) => (
        <Grid item ref={params.InputProps.ref} sx={{ mt:"1%" }}>
          <input 
          placeholder='Search for a module'
          type="text" 
          {...params.inputProps}
          style={{ 
            height:50, border:"none", 
            backgroundColor:"#f5f5f3", borderRadius:4.5, 
            width:'100%', font:"inherit" }}
          />
        </Grid>
      )}
    />
  )
}

const SearchBar = ({sampletasks}) => {
    const [filteredTask, setFilteredTask] = useState([]);
    const [wordEntered, setWordEntered] = useState("");

    const ref = useRef();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
    useEffect(() => {
      const checkClickedOutside = (e) => {
        if (isDropdownOpen && ref.current && !ref.current.contains(e.target)) {
          setIsDropdownOpen(false);
        }
      };

      document.addEventListener("mousedown", checkClickedOutside);

      return () => {
        document.removeEventListener("mousedown", checkClickedOutside);
      };
    }, [isDropdownOpen]);

    const handleFilter = (e) => {
      const searchWord = e.target.value;
      setWordEntered(searchWord);
      const newFilter = sampletasks.filter((value) => {
          if (value.task.toLowerCase().includes(searchWord.toLowerCase())) { return (
          value.task.toLowerCase().includes(searchWord.toLowerCase())
          )} if (!value.task.toLowerCase().includes(searchWord.toLowerCase()) && value.tasklist.toLowerCase().includes(searchWord.toLowerCase())) { return (
            value.tasklist.toLowerCase().includes(searchWord.toLowerCase())
          )} else
          { return (
            value.tag.toLowerCase().includes(searchWord.toLowerCase())
          )} 
      });

      if (searchWord === "") {
        setFilteredTask([]);
      } else {
        setFilteredTask(newFilter);
      }
    };

    const clearInput = () => {
      setFilteredTask([]);
      setWordEntered("");
    }
    
    return (
      <Grid container ref={ref} sx={{ width:350 }}>
      <SearchBox onChange={handleFilter} onClick={() => setIsDropdownOpen((oldState) => !oldState)}>
        <SearchIconWrapper>
          <SearchIcon/>
        </SearchIconWrapper>
        <Grid container justifyContent="flex-end" sx={{ height:2 }}>
          <Grid item sx={{ mr:"2%", mt:"1.7%" }}>
            <CloseIcon onClick={clearInput} sx={{ color:"#6d6d6d" }}/>
          </Grid>
        </Grid>
        <StyledInputBase
          placeholder="Search" value={wordEntered} />
      </SearchBox>
      <Box 
        component={Paper} 
        elevation={2}
        bgcolor="white" 
        sx={{ width:"inherit", borderRadius:1, mt:4.8, opacity:'99%', zIndex:1, position:'absolute' }}>
        {filteredTask.length !== 0 && isDropdownOpen && (
          <div>
          {filteredTask.slice(0,5).map((value, index) => {
            return (
              <SearchDisplay container direction="column" sx={{ width:'inherit' }} key={index}>
                <Typography fontWeight={700} sx={{ ml:"11%" }}>{value.module} {value.task}</Typography>
                <Typography sx={{ ml:"11%" }}>{value.tasklist} | {value.tag}</Typography>
              </SearchDisplay>
            )
          })}
          </div>
        )
        }
      </Box>
      </Grid>
    );
  } 


  function TabPanel(props) {
    const { children, value, index } = props;
  
    return (
      <div
        hidden={value !== index}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Box>{children}</Box>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  
  function Views() {
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <Box sx={{ width: '100%' }}>
        <Box >
          <Tabs value={value} onChange={handleChange} textColor='inherit' indicatorColor="primary" >
            <NewTab label="Tasks" sx={{ minWidth:2 }}/>
            <NewTab label="Task Lists" sx={{ minWidth:2}}/>
            <NewTab label="Tags" sx={{ minWidth:2 }}/>
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <ViewTask></ViewTask>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ViewTaskList></ViewTaskList>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ViewTag></ViewTag>
        </TabPanel>
      </Box>
    );
  } //need edit tab header according to number of tasks

const Search = () => {
    return (
        <Grid container sx={{ ml: '18%', mt: '1.5%' }}>
            <Grid item xs={12} >
                <SearchBar sampletasks={SampleTasks}></SearchBar>
            </Grid>
            <Grid item xs={12} sx={{ my:2 }}>
                <Typography variant="h4" fontWeight='bold' letterSpacing={0.5}>
                    Search Results 
                </Typography>
            <Grid item xs={12}>
                <Views></Views>
            </Grid>
            </Grid>
        </Grid>
    )
}


export {AddTagButton, Search, RadioButton, SelectTaskList, NewButton, ModuleSearch}