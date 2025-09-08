import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import DescriptionIcon from "@mui/icons-material/Description";
import BusinessIcon from "@mui/icons-material/Business";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const roles = [
  {
    title: "Normal Users",
    icon: <PersonIcon sx={{ fontSize: 50, color: "#4F46E5" }} />,
    path: "https://ayurva-user-v2.pages.dev/login",
    color: "#EEF2FF",
  },
  {
    title: "Pharmacists",
    icon: <LocalPharmacyIcon sx={{ fontSize: 50, color: "#059669" }} />,
    path: "https://ayurva-pharmacist.pages.dev/",
    color: "#ECFDF5",
  },

  {
    title: "Prescription Readers",
    icon: <DescriptionIcon sx={{ fontSize: 50, color: "#2563EB" }} />,
    path: "https://ayurva-prescription-reader.pages.dev/",
    color: "#EFF6FF",
  },
  {
    title: "Delivery Organizations",
    icon: <BusinessIcon sx={{ fontSize: 50, color: "#7C3AED" }} />,
    path: "https://ayurva-delivery-org.pages.dev/",
    color: "#F5F3FF",
  },
  {
    title: "Delivery Persons",
    icon: <LocalShippingIcon sx={{ fontSize: 50, color: "#DC2626" }} />,
    path: "https://ayurva-delivery-person.pages.dev/",
    color: "#FEF2F2",
  },
  {
    title: "Admin",
    icon: <AdminPanelSettingsIcon sx={{ fontSize: 50, color: "#D97706" }} />,
    path: "https://ayurva-admin.pages.dev/",
    color: "#FFFBEB",
  },
];

const LandingSection = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        // minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        // background: "linear-gradient(to right, #E0EAFC, #CFDEF3)",
        px: 3,
        py: 6,
      }}
    >
      {/* Role Cards */}
      <Grid container spacing={4} justifyContent="center" maxWidth="lg">
        {roles.map((role, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card
                sx={{
                  backgroundColor: role.color,
                  borderRadius: "20px",
                  textAlign: "center",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
                  },
                }}
                onClick={() => (window.location.href = role.path)}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 2,
                    }}
                  >
                    {role.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    color="text.primary"
                  >
                    {role.title}
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      mt: 2,
                      textTransform: "none",
                      borderRadius: "10px",
                    }}
                  >
                    Go to {role.title}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default LandingSection;
