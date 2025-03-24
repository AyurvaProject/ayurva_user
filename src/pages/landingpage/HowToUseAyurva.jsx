import React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import confusedwoman from "../../assets/img/confusedwoman.png";
import search from "../../assets/img/search.png";
import order from "../../assets/img/order.png";
import checked from "../../assets/img/checked.png";

const guides = [
  {
    title: "How to search medicine using prescription?",
    description:
      "From nutrition advice to exercise routines, we're here to support your journey toward a healthier life.",
    image: `${search}`,
  },
  {
    title: "How to check the prescriptions which has read by the reader?",
    description:
      "In this section, we share inspiring narratives of individuals who have overcome health challenges.",
    image: `${checked}`,
  },
  {
    title: "How to place an order?",
    description:
      "Find out how you can participate in community events and contribute to the health.",
    image: `${order}`,
  },
];

const HowToUseAyurva = () => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 4, p: 4 }}>
      <Box sx={{ maxWidth: "40%" }}>
        <img
          src={confusedwoman}
          alt="Confused Woman"
          style={{ width: "100%", borderRadius: "8px" }}
        />
      </Box>
      <Box>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
          How To Use Ayurva
        </Typography>
        {guides.map((guide, index) => (
          <Card
            key={index}
            sx={{
              display: "flex",
              mb: 2,
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <CardMedia
              component="img"
              sx={{ width: 120, height: 100 }}
              image={guide.image}
              alt={guide.title}
            />
            <CardContent>
              <Typography variant="subtitle1" fontWeight="bold">
                {guide.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                {guide.description}
              </Typography>
              <Button variant="contained" color="primary" size="small">
                Read More
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default HowToUseAyurva;
