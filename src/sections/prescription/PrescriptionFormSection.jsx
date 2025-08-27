import React, { useState } from "react";
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
  CardContent,
  Divider,
  Radio,
  RadioGroup,
  FormLabel,
  FormControlLabel,
} from "@mui/material";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { FileUpload } from "../../components/fileUpload/FileUpload";
import CustomSnackbar from "../../components/snackbar/CustomSnackbar";
import { CreatePrescription } from "../../apis/prescription/Prescription";
import { GetCurrentUser } from "../../apis/auth/Auth";
import { prescriptionFormSchema } from "../../validations/prescriptionFormValidation/PrescriptionFormValidation";

const customTextFieldStyles = {
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

const PrescriptionFormSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
    loading: false,
  });
  const navigate = useNavigate();

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
    resolver: zodResolver(prescriptionFormSchema),
    defaultValues: {
      user_id: GetCurrentUser().id,
      pres_active_status: true,
      pres_uploaded_date: new Date(),
      pres_uploaded_time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      pres_status: "pending",
    },
  });

  const handleFileChange = async (fieldName, file) => {
    setValue(fieldName, file);
    await trigger(fieldName);
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      if (data.pres_img_01) {
        formData.append("files", data.pres_img_01);
      }
      if (data.pres_img_02) {
        formData.append("files", data.pres_img_02);
      }
      if (data.pres_description) {
        formData.append("pres_description", data.pres_description);
      }
      if (data.pres_uploaded_date) {
        formData.append(
          "pres_uploaded_date",
          data.pres_uploaded_date.toISOString().split("T")[0]
        );
      }
      if (data.pres_uploaded_time) {
        formData.append("pres_uploaded_time", data.pres_uploaded_time);
      }
      if (data.pres_status) {
        formData.append("pres_status", data.pres_status);
      }
      if (data.pres_active_status) {
        formData.append("pres_active_status", data.pres_active_status);
      }
      if (data.user_id) {
        formData.append("user_id", data.user_id);
      }
      await CreatePrescription(formData);
      showSnackbar(
        "success",
        false,
        "Prescription added successfully. Be alert for updates."
      );
      reset();
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
  return (
    <Box sx={{ width: "100%", padding: 2 }}>
      <Box
        sx={{ maxWidth: "100%" }}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box sx={{ mb: 2, width: "100%" }}>
          <Typography variant="h5" gutterBottom>
            Add Prescription
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Please fill in the details below to add a new prescription.
          </Typography>
          <Divider sx={{ my: 2 }} />
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 4,
          }}
        >
          <FileUpload
            name="pres_img_01"
            label="Prescription Image 1"
            description="Upload a clear image of you (JPEG, PNG, WEBP)"
            control={control}
            maxSize={5 * 1024 * 1024}
            mediaType="image"
            enableCrop={false}
            onFileChange={(file) => handleFileChange("pres_img_01", file)}
            error={errors.pres_img_01?.message}
            initialPreview={null}
            standalone={false}
          />
          <FileUpload
            name="pres_img_02"
            label="Prescription Image 2"
            description="Upload a clear image of you (JPEG, PNG, WEBP)"
            control={control}
            maxSize={5 * 1024 * 1024}
            mediaType="image"
            enableCrop={false}
            onFileChange={(file) => handleFileChange("pres_img_02", file)}
            error={errors.pres_img_02?.message}
            initialPreview={null}
            standalone={false}
          />

          <Box sx={{ gridColumn: "1 / -1" }}>
            <TextField
              label="Decscription"
              variant="filled"
              multiline
              rows={4}
              fullWidth
              size="small"
              {...register("pres_description")}
              error={!!errors.pres_description}
              helperText={errors.pres_description?.message}
              sx={customTextFieldStyles}
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

export default PrescriptionFormSection;
