import React, { useState, useEffect } from "react";
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
import { profileUpdateFormValidationSchema } from "../../validations/profileUpdateFormValidation/ProfileUpdateForValidation";
import { UpdateUser, GetCurrentUser } from "../../apis/auth/Auth";
import { FileUpload } from "../../components/fileUpload/FileUpload";
import CustomSnackbar from "../../components/snackbar/CustomSnackbar";

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

const ProfileDetailSection = () => {
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
    resolver: zodResolver(profileUpdateFormValidationSchema),
    defaultValues: {
      user_name: GetCurrentUser()?.user_name,
      user_email: GetCurrentUser()?.user_email,
      user_contact: GetCurrentUser()?.user_contact,
      user_nic_no: GetCurrentUser()?.user_nic_no,
      user_age: GetCurrentUser()?.user_age,
      user_gender: GetCurrentUser()?.user_gender,
      user_profile_pic: GetCurrentUser()?.user_profile_pic || null,
      password: GetCurrentUser()?.password || "",
      ayurva_admin_id: 6,
    },
  });
  console.log("Values:", getValues());
  console.log("Form errors:", errors);

  useEffect(() => {
    if (typeof GetCurrentUser().user_profile_pic === "string") {
      setValue("user_profile_pic", GetCurrentUser().user_profile_pic, {
        shouldValidate: true,
      });
    }
  }, [setValue]);

  const handleFileChange = async (fieldName, file) => {
    setValue(fieldName, file);
    await trigger(fieldName);
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      if (data.user_profile_pic instanceof File) {
        formData.append("files", data.user_profile_pic);
      } else if (data.user_profile_pic) {
        formData.append("user_profile_pic", data.user_profile_pic);
      }
      if (data.user_name) {
        formData.append("user_name", data.user_name);
      }
      if (data.user_email) {
        formData.append("user_email", data.user_email);
      }
      if (data.password) {
        formData.append("password", data.password);
      }
      if (data.user_contact) {
        formData.append("user_contact", data.user_contact);
      }
      if (data.user_nic_no) {
        formData.append("user_nic_no", data.user_nic_no);
      }
      if (data.user_age) {
        formData.append("user_age", data.user_age);
      }
      if (data.user_gender) {
        formData.append("user_gender", data.user_gender);
      }
      formData.append("ayurva_admin_id", 6);

      console.log("Password:", data.ayurva_admin_id);

      await UpdateUser(GetCurrentUser()?.id, formData);
      showSnackbar("success", false, "Profile updated successfully!");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        showSnackbar(
          "error",
          false,
          error.response.data.message ||
            "Something Went Wrong. Please try Again."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Box sx={{ maxWidth: "100%" }}>
      <Box
        sx={{ maxWidth: "100%" }}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 4,
          }}
        >
          <FileUpload
            name="user_profile_pic"
            label="Profile Picture"
            description="Upload a clear image of you (JPEG, PNG, WEBP)"
            control={control}
            maxSize={5 * 1024 * 1024}
            mediaType="image"
            enableCrop={true}
            cropAspectRatio={1 / 1}
            onFileChange={(file) => handleFileChange("user_profile_pic", file)}
            error={errors.user_profile_pic?.message}
            initialPreview={null}
            standalone={false}
          />
          <Box sx={{ gridColumn: "span 2" }}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 2,
              }}
            >
              <TextField
                label="User Name"
                variant="filled"
                fullWidth
                size="small"
                {...register("user_name")}
                error={!!errors.user_name}
                helperText={errors.user_name?.message}
                sx={customTextFieldStyles}
                disabled
              />
              <TextField
                label="Email"
                variant="filled"
                fullWidth
                size="small"
                {...register("user_email")}
                error={!!errors.user_email}
                helperText={errors.user_email?.message}
                sx={customTextFieldStyles}
                disabled
              />
              <TextField
                label="Contact Number"
                variant="filled"
                fullWidth
                size="small"
                {...register("user_contact")}
                error={!!errors.user_contact}
                helperText={errors.user_contact?.message}
                sx={customTextFieldStyles}
                disabled={isSubmitting}
              />
              <TextField
                label="NIC Number"
                variant="filled"
                fullWidth
                size="small"
                {...register("user_nic_no")}
                error={!!errors.user_nic_no}
                helperText={errors.user_nic_no?.message}
                sx={customTextFieldStyles}
                disabled={isSubmitting}
              />
              <TextField
                label="Age"
                type="number"
                variant="filled"
                fullWidth
                size="small"
                {...register("user_age", { valueAsNumber: true })}
                error={!!errors.user_age}
                helperText={errors.user_age?.message}
                sx={customTextFieldStyles}
                disabled={isSubmitting}
              />
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Gender
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={watch("user_gender") || ""}
                  onChange={(e) => {
                    setValue("user_gender", e.target.value);
                    trigger("user_gender");
                  }}
                  disabled={isSubmitting}
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio size="small" />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio size="small" />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio size="small" />}
                    label="Other"
                  />
                </RadioGroup>
                {errors.user_gender && (
                  <FormHelperText error>
                    {errors.user_gender.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Box>
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

export default ProfileDetailSection;
