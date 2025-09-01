import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  Stack,
  IconButton,
  Card,
  CardContent,
  Avatar,
  CircularProgress,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import { GetOnePres } from "../../apis/prescription/Prescription";
import CustomSnackbar from "../../components/snackbar/CustomSnackbar";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate } from "react-router-dom";

const SinglePrescriptionSection = ({ id }) => {
  const navigate = useNavigate();
  const [pres, setPres] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imgIndex, setImgIndex] = useState(0);
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
    if (!loading)
      setTimeout(() => setSnackbar({ ...snackbar, open: false }), 3000);
  };

  useEffect(() => {
    GetOnePres(id).then((res) => {
      setPres(res);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", p: 2 }}>
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Prescription #{pres.pres_id}
        </Typography>
      </Box>
      <Divider sx={{ mb: 3 }} />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
          gap: 3,
        }}
      >
        {/* Prescription Image Section */}
        <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
          <CardContent>
            <img
              src={
                imgIndex === 0
                  ? pres.pres_img_01
                  : pres.pres_img_02 || pres.pres_img_01
              }
              alt="Prescription"
              style={{ width: "100%", borderRadius: "12px" }}
            />
            {pres.pres_img_02 && (
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                mt={2}
              >
                <IconButton onClick={() => setImgIndex(imgIndex === 0 ? 1 : 0)}>
                  <ArrowBackIosIcon />
                </IconButton>
                <Typography variant="subtitle2">Switch Image</Typography>
                <IconButton onClick={() => setImgIndex(imgIndex === 0 ? 1 : 0)}>
                  <ArrowForwardIosIcon />
                </IconButton>
              </Stack>
            )}
          </CardContent>
        </Card>

        {/* User Info Section */}
        <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Read By
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center" mb={2}>
              <Avatar
                src={pres.prescriptionreader.pr_profile_pic}
                alt={pres.user.user_name}
                sx={{ width: 56, height: 56 }}
              />
              <Typography variant="h6">
                {pres.prescriptionreader.pr_name +
                  " (" +
                  pres.prescriptionreader.user_name +
                  ")"}{" "}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <EmailIcon fontSize="small" />
              <Typography variant="body2">
                {pres.prescriptionreader.pr_email}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center" mt={1}>
              <PhoneIcon fontSize="small" />
              <Typography variant="body2">
                {pres.prescriptionreader.pr_contact_no}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center" mt={1}>
              <LocationOnIcon fontSize="small" />
              <Typography variant="body2">
                {pres.prescriptionreader.pr_address_l1 +
                  ", " +
                  pres.prescriptionreader.pr_address_l2 +
                  ", " +
                  pres.prescriptionreader.pr_address_l3}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="start" mt={1}>
              <InfoIcon fontSize="small" />
              <Typography variant="body2">
                {pres.prescriptionreader.pr_bio}
              </Typography>
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body2" color="text.secondary">
              Uploaded on: {pres.pres_uploaded_date} at{" "}
              {pres.pres_uploaded_time}
            </Typography>
            <Typography
              variant="body2"
              color={
                pres.pres_status === "pending" ? "warning.main" : "success.main"
              }
            >
              Status: {pres.pres_status.toUpperCase()}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Card sx={{ borderRadius: 3, boxShadow: 3, mt: 3 }}>
        <CardContent>
          {/* <PrescriptionDetailListSection id={id} /> */}
          <Typography variant="h6" gutterBottom>
            Prescription Results
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Click on the result to view details.
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Stack direction="column" spacing={2}>
            {pres.prescriptionDetails.map((detail, index) => (
              <Typography
                key={index}
                variant="body1"
                sx={{ cursor: "pointer" }}
                onClick={() =>
                  navigate(
                    `/nearProducts/${detail.prescription_detail_id}/${detail.product_license_no}`
                  )
                }
              >
                {"Result " + (index + 1) + ":"} {detail?.product_license_no}
                <span
                  style={{
                    color: `${detail?.active_status ? "green" : "red"}`,
                  }}
                >
                  {" - " + (detail?.active_status ? "Active" : "Inactive")}
                </span>
              </Typography>
            ))}
          </Stack>
        </CardContent>
      </Card>
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

export default SinglePrescriptionSection;
