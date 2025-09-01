import { useState, useEffect } from "react";
import {
  Card,
  Box,
  Typography,
  Button,
  Divider,
  CardContent,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CreatePrescriptionOrder } from "../../apis/prescriptionOrder/PrescriptionOrder";
import { GetCurrentUser, GetOneUser } from "../../apis/auth/Auth";
import CustomSnackbar from "../snackbar/CustomSnackbar";
const PrescriptionProductCard = ({ prescription_detail_id, product }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
    loading: false,
  });

  const showSnackbar = (severity, loading = false, message) => {
    setSnackbar({
      open: true,
      message: loading ? "Processing..." : message,
      severity,
      loading,
    });

    if (!loading) {
      setTimeout(() => setSnackbar({ ...snackbar, open: false }), 3000);
    }
  };

  useEffect(() => {
    if (GetCurrentUser()) {
      GetOneUser(GetCurrentUser().id).then((data) => setUser(data));
    }
  }, []);

  const handlePageBack = () => {
    navigate(-1);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await CreatePrescriptionOrder({
        order_date: new Date(),
        order_time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        prescription_detail_id: Number(prescription_detail_id),
        address_id: user.selected_address_id,
        user_id: user.id,
        pharmacist_id: product.pharmacist.id,
      });
      showSnackbar("success", false, "Order placed successfully");
      setLoading(false);
      handlePageBack();
    } catch (err) {
      showSnackbar("error", false, err.response.data.message);
      setLoading(false);
    }
  };

  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <img
              src={product.product_img2 || "/default-pharmacy.jpg"}
              alt={product.product_name}
              style={{ width: "100px", height: "100px", borderRadius: "8px" }}
            />
            <Box>
              <Typography variant="body1" fontWeight="bold">
                {product.pharmacy.pharmacy_name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {product.product_name}
              </Typography>
            </Box>
          </Stack>
          <Stack
            direction="column"
            sx={{ justifyContent: "center" }}
            spacing={1}
          >
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => handleSubmit()}
              disabled={loading}
              sx={{ borderRadius: "8px", textTransform: "none" }}
            >
              Order Now
            </Button>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={() => navigate(`/pharmacies/${product.pharmacy_id}`)}
              sx={{ borderRadius: "8px", textTransform: "none" }}
            >
              View Pharmacy
            </Button>
          </Stack>
        </Box>
      </CardContent>
      <CustomSnackbar
        open={snackbar.open}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        severity={snackbar.severity}
        loading={snackbar.loading}
      />
    </Card>
  );
};

export default PrescriptionProductCard;
