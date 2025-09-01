import React from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Divider,
  Chip,
  Button,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import DescriptionIcon from "@mui/icons-material/Description";
import PersonIcon from "@mui/icons-material/Person";
import { GetOnePharmacy } from "../../apis/pharmacy/Pharmacy";
import PharmacyProductSection from "../product/PharmacyProductSection";

const PharmacyDetailsSection = ({ id }) => {
  const [pharmacy, setPharmacy] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchPharmacy = async () => {
      try {
        const pharmacy = await GetOnePharmacy(id);
        setPharmacy(pharmacy);
      } catch (err) {
        console.error("Failed to fetch pharmacy", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPharmacy();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Box p={4}>
      {/* Pharmacy Header */}
      <Box sx={{ mb: 4, boxShadow: 0 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <CardMedia
              component="img"
              height="250"
              image={pharmacy.pharmacy_img_01}
              alt={pharmacy.pharmacy_name}
              style={{}}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <CardContent>
              <Typography variant="h4" fontWeight="medium">
                {pharmacy.pharmacy_name}
              </Typography>

              <Typography>
                <LocationOnIcon />{" "}
                {`${pharmacy.pharmacy_address_l1}, ${pharmacy.pharmacy_address_l2}, ${pharmacy.pharmacy_address_l3}, ${pharmacy.pharmacy_district}`}
              </Typography>
              <Typography>
                <EmailIcon /> {pharmacy.pharmacy_email}
              </Typography>
              <Typography>
                <PhoneIcon /> {pharmacy.pharmacy_contact_01} |{" "}
                {pharmacy.pharmacy_contact_02}
              </Typography>
              <Typography>
                <DescriptionIcon /> Reg. No: {pharmacy.pharmacy_registration_no}
              </Typography>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                sx={{ mt: 2 }}
                gutterBottom
              >
                Pharmacist
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <PersonIcon />
                <Typography variant="body1">
                  {pharmacy.pharmacist.pharmacist_name} |{" "}
                </Typography>
                <PhoneIcon />
                <Typography variant="body1">
                  {pharmacy.pharmacist.pharmacist_contact_no} |{" "}
                </Typography>
                <EmailIcon />
                <Typography variant="body1">
                  {pharmacy.pharmacist.pharmacist_email}
                </Typography>
              </Box>
            </CardContent>
          </Grid>
        </Grid>
      </Box>

      {/* Pharmacy Details */}
      <Box sx={{ mb: 4, p: 2 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Pharmacy Information
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Typography variant="body1" color="text.secondary" mt={1}>
          {pharmacy.pharmacy_description}
        </Typography>
      </Box>

      {/* Images */}
      <Box sx={{ mb: 4, p: 2 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Gallery
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          {[pharmacy.pharmacy_img_01, pharmacy.pharmacy_img_02].map(
            (img, idx) => (
              <Grid item xs={12} sm={6} key={idx}>
                <CardMedia
                  component="img"
                  height="300"
                  image={img}
                  alt={`Pharmacy Image ${idx + 1}`}
                  style={{}}
                />
              </Grid>
            )
          )}
        </Grid>
      </Box>

      <PharmacyProductSection id={id} />
    </Box>
  );
};

export default PharmacyDetailsSection;
