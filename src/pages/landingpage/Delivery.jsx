import React from "react";
import { Box, Typography, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import deliveryperson from "../../assets/img/deliveryperson.png";

const Delivery = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#F8FAFC",
        padding: "40px",
        borderRadius: "8px",
      }}
    >
      <Box sx={{ maxWidth: "50%" }}>
        <Typography variant="subtitle1" color="textSecondary">
          Island wide
        </Typography>
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
          24 Hour Delivery
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
          Embrace wellness without breaking the bank! Enjoy a generous 25%
          discount on a wide range of vital medicines at our online pharmacy.
          Your health matters, and so does your budget.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          endIcon={<ArrowForwardIcon />}
          sx={{ borderRadius: "8px", textTransform: "none" }}
        >
          Place An Order Now
        </Button>
      </Box>
      <Box sx={{ maxWidth: "40%" }}>
        <img
          src={deliveryperson}
          alt="Delivery"
          style={{ width: "100%", height: "auto" }}
        />
      </Box>
    </Box>
  );
};

export default Delivery;
