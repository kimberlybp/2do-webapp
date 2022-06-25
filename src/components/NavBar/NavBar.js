import React from "react";
import PropTypes from "prop-types";
import { AppBar, Divider, Drawer, Hidden, IconButton, List, ListItem, ListItemText, ListItemIcon, Toolbar, Typography, useTheme, Button, ListItemButton } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu";
import { makeStyles } from "@mui/styles";
import { ReactComponent as Logo } from '../../assets/images/2do-logo-darker.svg';
import { Box } from "@mui/system";

import TodayIcon from '@mui/icons-material/Today';
import UpcomingIcon from '@mui/icons-material/EventNote';
import CalendarIcon from '@mui/icons-material/CalendarToday';
import AllTasksIcon from '@mui/icons-material/Assignment';
import { useLocation, useNavigate } from "react-router-dom";

import OtherNav from "./components/OtherNav";

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    backgroundColor: "#D1BDE1 !important",
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
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
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navLinks = [
    { title: 'Today', path: '/today', icon: <TodayIcon /> },
    { title: 'Upcoming', path: '/upcoming', icon: <UpcomingIcon /> },
    { title: 'Calendar', path: '/calendar', icon: <CalendarIcon /> },
    { title: 'All Tasks', path: '/alltasks', icon: <AllTasksIcon /> },
  ]


  const drawer = (
    <>
      <Box className={classes.toolbar} sx={{ mx: "15px", marginTop: "15px" }}>
        <Logo style={{ color: theme.palette.primary.main }} />
      </Box>
      <Button variant="contained" sx={{ mx: "15px" }}>Create Task</Button>
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
    </>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Responsive drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            sx={{ padding: 10 }}
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
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            sx={{ padding: 10 }}
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}

NavBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   */
  window: PropTypes.func
};

export default NavBar;
