import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import ProfileDetailSection from "./ProfileDetailSection";
import ProfileAddressSection from "./ProfileAddressSection";
import ProfilePrRequestSections from "./ProfilePrRequestSection";
import ProfileReadPrSection from "./ProfileReadPrSection";
import ProfileOrderSection from "./ProfileOrderSection";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
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

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const ProfileMainSection = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ flexGrow: 1, bgcolor: "background.paper", display: "flex" }}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        <Tab label="Profile" {...a11yProps(0)} />
        <Tab label="Adrress Box" {...a11yProps(1)} />
        <Tab label="Requests" {...a11yProps(2)} />
        <Tab label="Read Prescriptions" {...a11yProps(3)} />
        <Tab label="Orders" {...a11yProps(4)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <ProfileDetailSection />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ProfileAddressSection />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ProfilePrRequestSections />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <ProfileReadPrSection />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <ProfileOrderSection />
      </TabPanel>
    </Box>
  );
};

export default ProfileMainSection;
