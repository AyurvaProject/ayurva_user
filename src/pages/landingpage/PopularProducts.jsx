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
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import medicalmask from "../../assets/img/medicalmask.png";
import surgicalgloves from "../../assets/img/segicalgloves.jpg";
import handsanitizer from "../../assets/img/sanitizer.jpg";
import oxygenmask from "../../assets/img/oxygenmask.jpg";

const products = [
  {
    name: "Oxygen Mask",
    price: "rs. 2.00",
    image: `${oxygenmask}`, // Replace with actual image
  },
  {
    name: "Surgical Gloves",
    price: "rs. 10.99",
    image: `${surgicalgloves}`, // Replace with actual image
  },
  {
    name: "Medical Mask",
    price: "rs. 20.89",
    image: `${medicalmask}`, // Replace with actual image
  },
  {
    name: "Hand Sanitizer",
    price: "rs. 180.00",
    image: `${handsanitizer}`, // Replace with actual image
  },
];

const PopularProducts = () => {
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
          Popular Products
        </Typography>
        <Link
          href="/products"
          underline="hover"
          sx={{ fontSize: "14px", color: "#007bff", cursor: "pointer" }}
        >
          View All →
        </Link>
      </Box>

      {/* Product Cards */}
      <Grid container spacing={2}>
        {products.map((product, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ borderRadius: "8px", boxShadow: 2 }}>
              <CardMedia
                sx={{ height: "180px", width: "100%" }}
                component="img"
                height="140"
                image={product.image}
                alt={product.name}
              />
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="body1" fontWeight="bold">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {product.price}
                </Typography>
              </CardContent>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  borderRadius: "0 0 8px 8px",
                  backgroundColor: "#0056b3",
                  "&:hover": { backgroundColor: "#003f7f" },
                }}
                startIcon={<ShoppingCartIcon />}
              >
                Add to Cart
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PopularProducts;
