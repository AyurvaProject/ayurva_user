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
  Skeleton,
} from "@mui/material";
import ProductCard from "../../components/product/ProductCard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { GetNonPrescriptionProducts } from "../../apis/products/Products";
import { motion, AnimatePresence } from "framer-motion";

const PopularProducts = () => {
  const [nonPrescriptionProducts, setNonPrescriptionProducts] = React.useState(
    []
  );
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await GetNonPrescriptionProducts();
        setNonPrescriptionProducts(products);
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Auto-rotate every 5 seconds
  React.useEffect(() => {
    if (nonPrescriptionProducts.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 4) % nonPrescriptionProducts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [nonPrescriptionProducts]);

  // Pick current 4 products (wrap around if needed)
  const currentProducts =
    nonPrescriptionProducts.slice(currentIndex, currentIndex + 4).length === 4
      ? nonPrescriptionProducts.slice(currentIndex, currentIndex + 4)
      : [
          ...nonPrescriptionProducts.slice(currentIndex),
          ...nonPrescriptionProducts.slice(
            0,
            4 - (nonPrescriptionProducts.length - currentIndex)
          ),
        ];

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
        {/* <Link
          href="/products"
          underline="hover"
          sx={{ fontSize: "14px", color: "#007bff", cursor: "pointer" }}
        >
          View All →
        </Link> */}
      </Box>

      {/* Loading State */}
      {loading ? (
        <Grid container spacing={2}>
          {Array.from(new Array(4)).map((_, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ borderRadius: "8px", boxShadow: 2 }}>
                <Skeleton variant="rectangular" height={180} />
                <CardContent sx={{ textAlign: "center" }}>
                  <Skeleton width="60%" />
                  <Skeleton width="40%" />
                </CardContent>
                <Skeleton variant="rectangular" height={40} />
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid container spacing={2} sx={{ overflow: "hidden" }}>
          <AnimatePresence mode="wait">
            {currentProducts.map((product, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                key={product.product_id || index}
              >
                <motion.div
                  key={product.product_id || index}
                  initial={{ opacity: 0, x: 200 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -200 }}
                  transition={{ duration: 0.6 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              </Grid>
            ))}
          </AnimatePresence>
        </Grid>
      )}
    </Box>
  );
};

export default PopularProducts;
