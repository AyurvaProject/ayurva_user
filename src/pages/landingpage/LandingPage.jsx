import React from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import GroupsIcon from "@mui/icons-material/Groups";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import MedicationIcon from "@mui/icons-material/Medication";
import doctor from "../../assets/img/doctor.png";
import PopularProduct from "./PopularProducts";
import NearestPharmacy from "./NearestPharmacy";
import SearchByCategory from "./SearchByCategory";
import Delivery from "./Delivery";
import HowToUseAyurva from "./HowToUseAyurva";

const stats = [
  {
    icon: <GroupsIcon fontSize="large" />,
    value: "14K+",
    label: "Orders Completed",
    bgColor: "#c7e9c0", // Light Green
  },
  {
    icon: <LocalPharmacyIcon fontSize="large" />,
    value: "250+",
    label: "Islandwide Pharmacies",
    bgColor: "#fceeb5", // Light Yellow
  },
  {
    icon: <EmojiPeopleIcon fontSize="large" />,
    value: "8K+",
    label: "Happy Customers",
    bgColor: "#bdf4a0", // Light Green
  },
  {
    icon: <MedicationIcon fontSize="large" />,
    value: "12K+",
    label: "Medical Product Varieties",
    bgColor: "#ede7f6", // Light Purple
  },
];

const LandingPage = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          backgroundColor: "#1e293b", // Dark blue background
          color: "#ffffff",
          // padding: "50px 0",
          maxWidth: "100%",
        }}
      >
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100vw",
            maxHeight: "380px",
            // margin: "0 auto",
          }}
        >
          {/* Left Side: Text Content */}
          <Box sx={{ maxWidth: "50%", paddingTop: "0 px" }}>
            <Typography
              variant="h3"
              sx={{
                fontSize: "2.5rem",
                fontWeight: "bold",
                marginBottom: "15px",
              }}
            >
              Your Prescription for <br />
              Affordable Health Solutions!
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: "1rem", marginBottom: "20px", opacity: 0.9 }}
            >
              Elevate your health journey with exclusive discounts and
              unparalleled convenience. Your path to well-being starts here,
              where every purchase is a prescription for savings.
            </Typography>
            <Button
              variant="contained"
              startIcon={<ShoppingCartIcon />}
              sx={{
                backgroundColor: "#ffffff",
                color: "#1e293b",
                textTransform: "none",
                padding: "10px 20px",
                fontSize: "1rem",
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "#e2e8f0", // Lighter shade on hover
                },
              }}
            >
              Start Browsing
            </Button>
          </Box>

          {/* Right Side: Image */}
          <Box sx={{ maxWidth: "400px" }}>
            <img
              src={doctor}
              alt="Doctor"
              style={{ width: "75%", height: "75%" }}
            />
          </Box>
        </Container>
      </Box>

      <Box>
        <Box
          sx={{
            padding: "20px",
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          <Grid container spacing={2}>
            {stats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box
                  sx={{
                    backgroundColor: stat.bgColor,
                    padding: "20px",
                    borderRadius: "8px",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "120px",
                    border: "2px dashed #0096FF", // Optional blue border for debugging
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: "#ffffff",
                      padding: "8px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "10px",
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2">{stat.label}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        <PopularProduct />
        <NearestPharmacy />
        <SearchByCategory />
        <Delivery />
        <HowToUseAyurva />
      </Box>
    </Box>
  );
};

export default LandingPage;
