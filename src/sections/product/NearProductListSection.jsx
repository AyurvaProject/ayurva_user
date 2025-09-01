import { useState, useEffect } from "react";
import { GetNearProducts } from "../../apis/products/Products";
import PrescriptionProductCard from "../../components/product/PrescriptionProductCard";
import { Divider, Box, Typography } from "@mui/material";
const NearProductListSection = ({ presDetailId, licenseNo }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await GetNearProducts(licenseNo);
        setProducts(products);
      } catch (err) {
        console.error("Failed to fetch pharmacies", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [licenseNo]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (products.length === 0) {
    return (
      <Box
        sx={{ width: "100%", my: 4, display: "flex", flexDirection: "column" }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Nearby Pharmacies
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
          <Typography variant="body1">No pharmacies found.</Typography>
        </Box>
      </Box>
    );
  }

  if (products.length > 0) {
    return (
      <Box
        sx={{ width: "100%", my: 4, display: "flex", flexDirection: "column" }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Nearby Pharmacies
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
          {products.map((product) => (
            <PrescriptionProductCard
              key={product.id}
              product={product}
              prescription_detail_id={presDetailId}
            />
          ))}
        </Box>
      </Box>
    );
  }
};

export default NearProductListSection;
