import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Chip,
  Button,
  CircularProgress,
  TextField,
} from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DescriptionIcon from "@mui/icons-material/Description";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import StoreIcon from "@mui/icons-material/Store";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import { GetOneProductById } from "../../apis/products/Products";
import { CreateOrder } from "../../apis/order/Order";
import { orderFormSchema } from "../../validations/orderFormValidation/OrderFormValidation";
import CustomSnackbar from "../../components/snackbar/CustomSnackbar";
import { GetCurrentUser, GetOneUserById } from "../../apis/auth/Auth";
import { IsAddressAvailableForUser } from "../../apis/address/Address";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { set } from "nprogress";

const customTextFieldStyles = {
  width: "50%",
  "& .MuiFilledInput-root": {
    "&:before": {
      borderBottom: "none",
    },
    "&:after": {
      borderBottom: "none",
    },
    "&:hover:not(.Mui-disabled):before": {
      borderBottom: "none",
    },
  },
};

const ProductDetailsSection = ({ id }) => {
  const user = GetCurrentUser() || null;
  const [userDetails, setUserDetails] = useState(null);
  const [addressAvailable, setAddressAvailable] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    trigger,
    reset,
    getValues,
    control,
  } = useForm({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      order_pharmacy_status: "pending",
      order_delivery_status: "pending",
      user_id: user?.id,
    },
  });

  console.log("Form errors:", errors);
  console.log("Form values:", watch());

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await GetOneProductById(id);
        setProduct(data);
        if (user) {
          const userRes = await GetOneUserById(user.id);
          setUserDetails(userRes);
          const isAvailable = await IsAddressAvailableForUser(user.id);
          setAddressAvailable(isAvailable);
          if (isAvailable) {
            //await IsAddressAvailableForUser(user.id);
          }
        }
      } catch (err) {
        console.error("Failed to fetch product", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    setValue("order_date", new Date());
    setValue(
      "order_time",
      new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
    setValue("address_id", userDetails?.selected_address_id);
    setValue("pharmacist_id", product?.pharmacist.id);
    setValue("product_id", product?.product_id);
  }, [addressAvailable, userDetails, product]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      console.log("Order Data at Submit", data);
      await CreateOrder(data);
      showSnackbar("success", false, "Order Placed Successfully");
    } catch (error) {
      showSnackbar(
        "error",
        false,
        error.response.data.message || "Something Went Wrong. Please try Again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  const stockStatus =
    product.product_quantity > 10
      ? "In Stock"
      : product.product_quantity > 0
      ? "Low Stock"
      : "Out of Stock";

  const stockColor =
    stockStatus === "In Stock"
      ? "success"
      : stockStatus === "Low Stock"
      ? "warning"
      : "error";

  return (
    <Box p={4}>
      {/* Product Header */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            <Card>
              <CardMedia
                component="img"
                height="300"
                image={product.product_img1} // parse first image from JSON
                alt={product.product_name}
              />
            </Card>
          </Grid>

          <Grid item xs={12} md={7}>
            <CardContent>
              <Typography variant="h4" fontWeight="medium" gutterBottom>
                {product.product_name}
              </Typography>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                {product.product_price} LKR
              </Typography>

              <Chip
                label={stockStatus}
                color={stockColor}
                sx={{ fontSize: "0.9rem", fontWeight: "bold", mb: 2 }}
              />

              <Typography variant="body1" gutterBottom>
                <DescriptionIcon /> License No: {product.product_license_no}
              </Typography>

              <Typography variant="body1" gutterBottom>
                <StoreIcon /> Sold by: {product.pharmacy.pharmacy_name}
              </Typography>

              <Typography variant="body1" gutterBottom>
                <InventoryIcon /> Quantity Available: {product.product_quantity}
              </Typography>

              <Typography variant="body1" gutterBottom>
                <AssignmentTurnedInIcon /> Orders: {product.orders?.length || 0}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Box
                sx={{ display: "flex", gap: 2 }}
                component="form"
                onSubmit={handleSubmit(onSubmit)}
              >
                <TextField
                  label="Quantity"
                  variant="filled"
                  type="number"
                  fullWidth
                  size="small"
                  {...register("quantity", { valueAsNumber: true })}
                  error={!!errors.quantity}
                  helperText={errors.quantity?.message}
                  sx={customTextFieldStyles}
                  disabled={product.product_quantity === 0 || isSubmitting}
                  onChange={(e) => {
                    const value = Math.min(
                      product.product_quantity,
                      Number(e.target.value)
                    );
                    setValue("quantity", value); // from react-hook-form
                  }}
                  inputProps={{ min: 1 }}
                />

                <Button
                  variant="contained"
                  color="primary"
                  // size="large"s
                  type="submit"
                  sx={{ height: "50px", px: 4 }}
                  size="small"
                  disabled={
                    product.product_quantity === 0 ||
                    isSubmitting ||
                    !user ||
                    !addressAvailable
                  }
                  startIcon={
                    isSubmitting ? (
                      <CircularProgress size={12} />
                    ) : (
                      <LocalShippingIcon />
                    )
                  }
                >
                  {product.product_quantity > 0
                    ? "Place Order"
                    : "Out of Stock"}
                </Button>
              </Box>
            </CardContent>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Product Information
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Typography variant="body1" color="text.secondary" mt={1}>
          {product.product_description}
        </Typography>
      </Box>

      {/* Product Gallery */}
      <Box>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Gallery
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          {[product.product_img1, product.product_img2, product.product_img3]
            .filter(Boolean)
            .map((img, idx) => (
              <Grid item xs={12} sm={4} key={idx}>
                <CardMedia
                  component="img"
                  height="250"
                  image={img}
                  alt={`Product Image ${idx + 1}`}
                  style={{}}
                />
              </Grid>
            ))}
        </Grid>
      </Box>
      <CustomSnackbar
        open={snackbar.open}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        severity={snackbar.severity}
        loading={snackbar.loading}
      />
    </Box>
  );
};

export default ProductDetailsSection;
