import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Alert,
  Snackbar,
  CircularProgress,
  Stack,
  FormHelperText,
  FilledInput,
  Box,
  Typography,
  Card,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  MenuItem,
  Select,
} from "@mui/material";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { GetCurrentUser } from "../../apis/auth/Auth";
import { addressFormSchema } from "../../validations/addressFormValidation/AddressFormValidation";
import LocationMap from "../../components/locationMap/LocationMap";
import {
  ChangeUserSelectedAddredss,
  IsAddressAvailableForUser,
} from "../../apis/address/Address";
import CustomSnackbar from "../../components/snackbar/CustomSnackbar";

const sriLankanDistricts = [
  "Colombo",
  "Gampaha",
  "Kalutara",
  "Kandy",
  "Matale",
  "Nuwara Eliya",
  "Galle",
  "Matara",
  "Hambantota",
  "Jaffna",
  "Kilinochchi",
  "Mannar",
  "Vavuniya",
  "Mullaitivu",
  "Batticaloa",
  "Ampara",
  "Trincomalee",
  "Kurunegala",
  "Puttalam",
  "Anuradhapura",
  "Polonnaruwa",
  "Badulla",
  "Monaragala",
  "Ratnapura",
  "Kegalle",
];

const AddressFormSection = ({ initialData = null, onSubmit }) => {
  const navigate = useNavigate();
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
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      address_l1: initialData?.address_l1 || "",
      address_l2: initialData?.address_l2 || "",
      address_l3: initialData?.address_l3 || "",
      address_district: initialData?.address_district || "",
      address_zip_code: initialData?.address_zip_code || "",
      user_lat: initialData?.user_lat || "",
      user_lng: initialData?.user_lng || "",
      user_id: initialData?.user_id || GetCurrentUser()?.id,
    },
  });

  const handleSubmitForm = async (data) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      showSnackbar("success", false, "Address Details Saved.");
    } catch (error) {
      showSnackbar("error", false, error.response.data.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Box sx={{ maxWidth: "100%" }}>
      <Box
        sx={{ maxWidth: "100%" }}
        component="form"
        onSubmit={handleSubmit(handleSubmitForm)}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Address Line One"
              variant="filled"
              fullWidth
              {...register("address_l1")}
              error={!!errors.address_l1}
              helperText={errors.address_l1?.message}
              size="small"
              sx={{
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
              }}
            />
            <TextField
              label="Address Line Two"
              variant="filled"
              fullWidth
              {...register("address_l2")}
              error={!!errors.address_l2}
              helperText={errors.address_l2?.message}
              size="small"
              sx={{
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
              }}
            />
            <TextField
              label="City / Town"
              variant="filled"
              fullWidth
              {...register("address_l3")}
              error={!!errors.address_l3}
              helperText={errors.address_l3?.message}
              size="small"
              sx={{
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
              }}
            />
            <FormControl variant="filled" fullWidth size="small">
              <InputLabel>District</InputLabel>
              <Select
                {...register("address_district")}
                value={watch("address_district")}
                onChange={(e) =>
                  setValue("address_district", e.target.value, {
                    shouldValidate: true,
                  })
                }
                error={!!errors.address_district}
              >
                {sriLankanDistricts.map((district, index) => (
                  <MenuItem key={index} value={district}>
                    {district}
                  </MenuItem>
                ))}
              </Select>
              {errors.address_district && (
                <FormHelperText error>
                  {errors.address_district.message}
                </FormHelperText>
              )}
            </FormControl>

            <TextField
              label="Zip Code"
              variant="filled"
              fullWidth
              {...register("address_zip_code")}
              error={!!errors.address_zip_code}
              helperText={errors.address_zip_code?.message}
              size="small"
              sx={{
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
              }}
            />
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 1,
              }}
            >
              <Box sx={{ gridColumn: "1 / -1" }}>
                <Typography variant="subtitle1" gutterBottom>
                  Select Your Location on Map
                </Typography>
              </Box>
              <TextField
                label="Longitude"
                variant="filled"
                fullWidth
                value={watch("user_lng") || ""}
                onChange={(e) =>
                  setValue("user_lng", e.target.value, {
                    shouldValidate: true,
                    // valueAsNumber: true,
                  })
                }
                error={!!errors.user_lng}
                helperText={errors.user_lng?.message}
                size="small"
                sx={{
                  "& .MuiFilledInput-root": {
                    "&:before": { borderBottom: "none" },
                    "&:after": { borderBottom: "none" },
                    "&:hover:not(.Mui-disabled):before": {
                      borderBottom: "none",
                    },
                  },
                }}
                disabled
              />

              <TextField
                label="Latitude"
                variant="filled"
                fullWidth
                value={watch("user_lat") || ""}
                onChange={(e) =>
                  setValue("user_lat", e.target.value, {
                    shouldValidate: true,
                    // valueAsNumber: true,
                  })
                }
                error={!!errors.user_lat}
                helperText={errors.user_lat?.message}
                size="small"
                sx={{
                  "& .MuiFilledInput-root": {
                    "&:before": { borderBottom: "none" },
                    "&:after": { borderBottom: "none" },
                    "&:hover:not(.Mui-disabled):before": {
                      borderBottom: "none",
                    },
                  },
                }}
                disabled
              />
            </Box>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <LocationMap
              initialLat={initialData?.user_lat || null}
              initialLng={initialData?.user_lng || null}
              onLocationSelect={(lat, lng) => {
                setValue("user_lat", lat, { shouldValidate: true });
                setValue("user_lng", lng, { shouldValidate: true });
              }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 2,
            marginTop: 4,
          }}
        >
          <Button
            variant="outlined"
            size="large"
            onClick={() => reset()}
            disabled={isSubmitting}
            sx={{ width: "160px" }}
          >
            Reset
          </Button>
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={isSubmitting}
            endIcon={isSubmitting ? <CircularProgress size={12} /> : null}
            sx={{ width: "160px" }}
          >
            {isSubmitting ? "Submitting" : "Submit"}
          </Button>
        </Box>
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

export default AddressFormSection;
