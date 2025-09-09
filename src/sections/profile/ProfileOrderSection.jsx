import React from "react";
import { Box, Tabs, Tab } from "@mui/material";
import OrdersListSection from "../order/OrdersListSection";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import BlockIcon from "@mui/icons-material/Block";
import BeenhereIcon from "@mui/icons-material/Beenhere";

const ProfileOrderSection = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ mb: 2, width: "100%" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="icon label tabs example"
        >
          <Tab label="PENDING" />
          <Tab label="CANCELLED" />
          <Tab label="ACCEPTED" />
          <Tab label="READY" />
        </Tabs>
      </Box>

      <Box sx={{ mb: 2, width: "100%" }}>
        <OrdersListSection
          status={
            value === 0
              ? "pending"
              : value === 1
              ? "rejected"
              : value === 2
              ? "accepted"
              : "completed"
          }
        />
      </Box>
    </Box>
  );
};

export default ProfileOrderSection;
