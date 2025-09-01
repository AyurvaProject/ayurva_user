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
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { signUpFormValidationSchema } from "../../validations/signUpFormValidation/SignUpFormValidation";
import { FileUpload } from "../../components/fileUpload/FileUpload";
import { SignUp } from "../../apis/auth/Auth";
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

const RegisterFormSection = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    resolver: zodResolver(signUpFormValidationSchema),
    defaultValues: {
      ayurva_admin_id: 6,
    },
  });

  console.log("Values:", getValues());
  console.log("Form errors:", errors);

  const handleFileChange = async (fieldName, file) => {
    setValue(fieldName, file);
    await trigger(fieldName);
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      if (data.user_profile_pic) {
        formData.append("files", data.user_profile_pic);
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

      const response = await SignUp(formData);
      console.log("Registration Response:", response);
      showSnackbar("success", false, "Success. Please Verify your Email.");
      navigate(`/verifyOtp/${response.user.id}`);
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
    <Card
      sx={{
        maxMidth: "100%",
        display: "flex",
        flexDirection: "column",
        padding: 4,
      }}
    >
      <Box
        sx={{
          maxWidth: "100%",
          display: "flex",
          marginBottom: 5,
          gap: 2,
          alignItems: "center",
        }}
      >
        <Box>
          <img
            src="/logo.png"
            alt="logo"
            style={{ width: "100px", Height: "100px" }}
            //style={{ width: "80px", height: "80px" }}
          ></img>
        </Box>
        <Box>
          <Typography variant="h4">Signup</Typography>
          <Typography variant="h6" color="gray">
            Please fill in the form below to register as a user.
          </Typography>
          <Divider sx={{ marginTop: "5px" }}></Divider>
        </Box>
      </Box>
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
              onFileChange={(file) =>
                handleFileChange("user_profile_pic", file)
              }
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
                />
                <TextField
                  label="Age"
                  type="number"
                  variant="filled"
                  fullWidth
                  size="small"
                  {...register("user_age")}
                  error={!!errors.user_age}
                  helperText={errors.user_age?.message}
                  sx={customTextFieldStyles}
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

                <FormControl
                  variant="filled"
                  fullWidth
                  error={!!errors.password}
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
                >
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <FilledInput
                    id="password"
                    size="small"
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          size="small"
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {errors.password && (
                    <FormHelperText error>
                      {errors.password.message}
                    </FormHelperText>
                  )}
                </FormControl>

                <FormControl
                  variant="filled"
                  fullWidth
                  error={!!errors.confirmPassword}
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
                >
                  <InputLabel htmlFor="confirmPassword">
                    Confirm Password
                  </InputLabel>
                  <FilledInput
                    size="small"
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    {...register("confirmPassword")}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          edge="end"
                          size="small"
                        >
                          {showConfirmPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Confirm Password"
                  />
                  {errors.confirmPassword && (
                    <FormHelperText error>
                      {errors.confirmPassword.message}
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
      </Box>
    </Card>
  );
};

export default RegisterFormSection;
