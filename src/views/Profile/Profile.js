import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import * as React from "react";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Password from "./components/password";
import EditProfile from "./components/editprofile";

const NewTab = styled(Tab)({
  textTransform: "none",
  fontWeight: 700,
  fontSize: 16,
});

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <div hidden={value !== index}>
      {value === index && (
        <Box>
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

export default function Profile() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container justifyContent="center" alignItems="flex-start">
      <Box
        sx={{ bgcolor: "background.paper", display: "flex", height: "auto" }}
      >
        <Tabs
          variant="scrollable"
          color="secondary"
          orientation="vertical"
          value={value}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
          sx={{
            minWidth: { xs: 100, sm: 150 },
            borderRight: 1,
            borderColor: "divider",
            my: 1,
          }}
        >
          <NewTab label="Edit Profile" />
          <NewTab label="Password" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <EditProfile></EditProfile>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Password></Password>
        </TabPanel>
      </Box>
    </Grid>
  );
}
