import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Link,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import pharmacy1 from "../../assets/img/phamacy1.jpg";
import pharmacy2 from "../../assets/img/pharmacy2.jpg";
import pharmacy3 from "../../assets/img/pharmacy3.jpg";
import pharmacy4 from "../../assets/img/pharmacy4.jpg";

const pharmacies = [
  {
    name: "Pharmacy One",
    distance: "1km",
    image: `${pharmacy1}`, // Replace with actual image
    link: "/pharmacy-one",
  },
  {
    name: "Pharmacy Two",
    distance: "2km",
    image: `${pharmacy2}`, // Replace with actual image
    link: "/pharmacy-two",
  },
  {
    name: "Pharmacy Three",
    distance: "2.2km",
    image: `${pharmacy3}`, // Replace with actual image
    link: "/pharmacy-three",
  },
  {
    name: "Pharmacy Four",
    distance: "3.1km",
    image: `${pharmacy4}`, // Replace with actual image
    link: "/pharmacy-four",
  },
];

const NearestPharmacies = () => {
  return (
    <Box sx={{ maxWidth: "1100px", margin: "0 auto", padding: "20px" }}>
      {/* Title & View All Link */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Your Nearest Pharmacies
        </Typography>
        <Link
          href="/pharmacies"
          underline="hover"
          sx={{ fontSize: "14px", color: "#007bff", cursor: "pointer" }}
        >
          View All →
        </Link>
      </Box>

      {/* Pharmacy Cards */}
      <Grid container spacing={2}>
        {pharmacies.map((pharmacy, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ borderRadius: "8px", boxShadow: 2 }}>
              <CardMedia
                component="img"
                height="140"
                image={pharmacy.image}
                alt={pharmacy.name}
              />
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="body1" fontWeight="bold">
                  {pharmacy.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {pharmacy.distance}
                </Typography>
              </CardContent>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                href={pharmacy.link}
                sx={{
                  borderRadius: "0 0 8px 8px",
                  backgroundColor: "#0056b3",
                  "&:hover": { backgroundColor: "#003f7f" },
                }}
                endIcon={<ArrowForwardIcon />}
              >
                Show More
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default NearestPharmacies;
