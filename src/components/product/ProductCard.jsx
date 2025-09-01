import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Link,
  Skeleton,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ borderRadius: "8px", boxShadow: 2 }}>
      <CardMedia
        component="img"
        height="140"
        image={product.product_img2 || "/default-pharmacy.jpg"}
        alt={product.product_name}
      />
      <CardContent sx={{ textAlign: "center" }}>
        <Typography variant="body1" fontWeight="bold">
          {product.product_name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {/* {pharmacy.pharmacy_district} */}
          LKR {product.product_price}
        </Typography>
      </CardContent>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={() => navigate(`/products/${product.product_id}`)}
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
  );
};

export default ProductCard;
