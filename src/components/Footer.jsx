import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box sx={{ textAlign: "center", py: 2, backgroundColor: "#f5f5f5", mt: 2 }}>
      <Typography variant="body2">
        &copy; 2025 Ayurva. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
