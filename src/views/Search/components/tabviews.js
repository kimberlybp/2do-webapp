import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import TaskList from "./tasklist";
import Tags from "./tag";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import React from "react";

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
    <Box sx={{ width: "100%" }}>
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="inherit"
          indicatorColor="primary"
        >
          <NewTab label="Tasks" sx={{ minWidth: 2 }} />
          <NewTab label="Task Lists" sx={{ minWidth: 2 }} />
          <NewTab label="Tags" sx={{ minWidth: 2 }} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TaskList></TaskList>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Tags></Tags>
      </TabPanel>
    </Box>
  );
}

export default Views;
