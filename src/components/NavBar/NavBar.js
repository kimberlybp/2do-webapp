import AllTasksIcon from '@mui/icons-material/Assignment';
import CalendarIcon from '@mui/icons-material/CalendarToday';
import UpcomingIcon from '@mui/icons-material/EventNote';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import MenuIcon from "@mui/icons-material/Menu";
import TodayIcon from '@mui/icons-material/Today';
import {
  AppBar, Avatar, Button, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Toolbar, Tooltip, useTheme
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from '../../assets/images/2do-logo-darker.svg';
import stringAvatar from "../../utils/stringAvatar";
import { logOut } from '../../_actions/AuthAction';
import { getTags } from '../../_actions/TagAction';
import { getTasks, selectTask } from '../../_actions/TaskAction';
import { getTasklists } from '../../_actions/TasklistAction';
import CreateTaskDialog from '../CreateTaskDialog';
import SearchBar from "../SearchBar";
import TaskDetailsDialog from "../TaskDetailsDialog";
import OtherNav from "./components/OtherNav";

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
  root: {
    // display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
      position: "absolute"
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
}));

function NavBar(props) {
  const { window } = props;
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const userId = useSelector((state) => state.User.userId);
  const firstName = useSelector((state) => state.User.firstName);
  const lastName = useSelector((state) => state.User.lastName);
  const currentTask = useSelector((state) => state.Task.currentTask);
  const fullName = `${firstName} ${lastName}`;

  useEffect(() => {
    if (userId === null) navigate('/');

    if (userId && userId!=="init") {
      dispatch(getTasks());
      dispatch(getTags());
      dispatch(getTasklists());
    }
    
    

    // eslint-disable-next-line
  }, [userId])

  useEffect(() => {
    if(currentTask) {
      setDetailsOpen(true);
    } else {
      setDetailsOpen(false);
    }
  }, [currentTask])

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navLinks = [
    { title: 'Today', path: '/today', icon: <TodayIcon /> },
    { title: 'Upcoming', path: '/upcoming', icon: <UpcomingIcon /> },
    { title: 'Calendar', path: '/calendar', icon: <CalendarIcon /> },
    { title: 'All Tasks', path: '/alltasks', icon: <AllTasksIcon /> },
  ]

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onClickLogout = () => {
    handleClose();
    dispatch(logOut());
  }

  const drawer = (
    <>
      <Box className={classes.toolbar} sx={{ mx: "15px", marginTop: "15px" }}>
        <Logo style={{ color: theme.palette.primary.main }} />
      </Box>
      <Button variant="contained" sx={{ mx: "15px" }} onClick={() => {setCreateOpen(true);}}>Create Task</Button>
      <List sx={{
        '&& .Mui-selected, && .Mui-selected:hover': {
          bgcolor: 'transparent',
          '&, & .MuiListItemIcon-root': {
            color: theme.palette.primary.main,
          },
          '&, & .MuiListItemText-root span': {
            color: theme.palette.primary.main,
          },
        },
      }}>
        {navLinks.map((nav, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton selected={location.pathname === nav.path} onClick={() => navigate(nav.path)}>
              <ListItemIcon sx={{ color: "#2B3334", minWidth: '45px' }}>
                {nav.icon}
              </ListItemIcon>
              <ListItemText sx={{ span: { fontWeight: 700, color: "#2B3334" } }}>{nav.title}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <OtherNav />
      <TaskDetailsDialog />
    </>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#D1BDE1", boxShadow: "none" }}>
        <Toolbar>
          <Box component="div" sx={{ flexGrow: 1, marginLeft: { xs: "0", sm: "280px" }, ".MuiOutlinedInput-root": { backgroundColor: "#FFF" } }} >
            <IconButton
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { xs: 'inline-block', sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            {/* <TextField
              disabled
              id="standard-search"
              placeholder="Search (Under Construction 😅)"
              type="search"
              variant="outlined"
              size="small"
              sx={{ width: "40%" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            /> */}
            <SearchBar />
          </Box>
          <Box sx={{ minWidth: "fit-content" }}>
            <Tooltip title="FAQ">
              <IconButton sx={{ backgroundColor: "white", marginRight: 1, "&:hover" : {backgroundColor: '#e8e8e8'} }} onClick={() => navigate('/faq')}>
                <HelpOutlineIcon sx={{ color: "#000000" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="More options">
              <IconButton onClick={handleMenu} sx={{ p: 0 }}>
                <Avatar {...stringAvatar(fullName)} />
              </IconButton>
            </Tooltip>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem disabled onClick={handleClose}>View Profile</MenuItem>
              <MenuItem disabled onClick={handleClose}>Settings</MenuItem>
              <MenuItem onClick={onClickLogout}>Log Out</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        <Drawer
          sx={{ padding: 10, display: { sm: 'none', xs: 'block' } }}
          container={container}
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper
          }}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          sx={{ padding: 10, display: { xs: "none", sm: "block" } }}
          classes={{
            paper: classes.drawerPaper
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </nav>
      <CreateTaskDialog open={createOpen} setOpen={setCreateOpen} />
      <TaskDetailsDialog open={detailsOpen} setOpen={setDetailsOpen} onClose={() => dispatch(selectTask(null))} />
    </>
  );
}

NavBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   */
  window: PropTypes.func
};

export default NavBar;
