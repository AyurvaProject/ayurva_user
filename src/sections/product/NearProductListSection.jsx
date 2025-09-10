import { useState, useEffect } from "react";
import { GetNearProducts } from "../../apis/products/Products";
import { GetPrescriptionDetailById } from "../../apis/prescriptionDetail/PrescriptionDetail";
import PrescriptionProductCard from "../../components/product/PrescriptionProductCard";
import { Divider, Box, Typography } from "@mui/material";
import LoadingSection from "../loading/LoadingSection";
const NearProductListSection = ({ presDetailId, licenseNo }) => {
  const [products, setProducts] = useState([]);
  const [prescriptionDetail, setPrescriptionDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await GetNearProducts(licenseNo);
        const presDetail = await GetPrescriptionDetailById(presDetailId);
        setPrescriptionDetail(presDetail);
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
    return <LoadingSection />;
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
              prescriptionDetail={prescriptionDetail}
            />
          ))}
        </Box>
      </Box>
    );
  }
};

export default NearProductListSection;
