import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Link,
  Skeleton,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  GetNearPharmacyByUserId,
  GetAllPharmacies,
} from "../../apis/pharmacy/Pharmacy";
import { GetCurrentUser } from "../../apis/auth/Auth";
import { motion, AnimatePresence } from "framer-motion";
import PharmacyCard from "../../components/pharmacy/PharmacyCard";
import { IsAddressAvailableForUser } from "../../apis/address/Address";

const NearestPharmacies = () => {
  const [pharmacies, setPharmacies] = React.useState([]);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        let data;
        const isAvailable = await IsAddressAvailableForUser(
          GetCurrentUser()?.id
        );
        if (GetCurrentUser() && isAvailable) {
          data = await GetAllPharmacies();
        } else {
          data = await GetAllPharmacies();
        }

        setPharmacies(data);
      } catch (err) {
        console.error("Failed to fetch pharmacies", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPharmacies();
  }, []);

  // Auto-rotate every 5 seconds
  React.useEffect(() => {
    if (pharmacies.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 4) % pharmacies.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [pharmacies]);

  // Pick current 4 pharmacies (wrap around if needed)
  const currentPharmacies =
    pharmacies.slice(currentIndex, currentIndex + 4).length === 4
      ? pharmacies.slice(currentIndex, currentIndex + 4)
      : [
          ...pharmacies.slice(currentIndex),
          ...pharmacies.slice(0, 4 - (pharmacies.length - currentIndex)),
        ];

  return (
    <Box sx={{ maxWidth: "1100px", margin: "0 auto", padding: "20px" }}>
      {/* Title & View All Link */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Your Nearest Pharmacies
        </Typography>
        <Link
          href="/pharmacies"
          underline="hover"
          sx={{ fontSize: "14px", color: "#007bff", cursor: "pointer" }}
        >
          View All →
        </Link>
      </Box>

      {/* Loading State */}
      {loading ? (
        <Grid container spacing={2}>
          {Array.from(new Array(4)).map((_, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ borderRadius: "8px", boxShadow: 2 }}>
                <Skeleton variant="rectangular" height={140} />
                <CardContent sx={{ textAlign: "center" }}>
                  <Skeleton width="60%" />
                  <Skeleton width="40%" />
                </CardContent>
                <Skeleton variant="rectangular" height={40} />
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid container spacing={2} sx={{ overflow: "hidden" }}>
          <AnimatePresence mode="wait">
            {currentPharmacies.map((pharmacy, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                key={pharmacy.pharmacy_id || index}
              >
                <motion.div
                  key={pharmacy.pharmacy_id || index}
                  initial={{ opacity: 0, x: 200 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -200 }}
                  transition={{ duration: 0.6 }}
                >
                  <PharmacyCard pharmacy={pharmacy} />
                  {/* <Card sx={{ borderRadius: "8px", boxShadow: 2 }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={
                        pharmacy.pharmacy_img_01 || "/default-pharmacy.jpg"
                      }
                      alt={pharmacy.pharmacy_name}
                    />
                    <CardContent sx={{ textAlign: "center" }}>
                      <Typography variant="body1" fontWeight="bold">
                        {pharmacy.pharmacy_name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {pharmacy.pharmacy_district}
                      </Typography>
                    </CardContent>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      href={`/pharmacy/${pharmacy.pharmacy_id}`}
                      sx={{
                        borderRadius: "0 0 8px 8px",
                        backgroundColor: "#0056b3",
                        "&:hover": { backgroundColor: "#003f7f" },
                      }}
                      endIcon={<ArrowForwardIcon />}
                    >
                      Show More
                    </Button>
                  </Card> */}
                </motion.div>
              </Grid>
            ))}
          </AnimatePresence>
        </Grid>
      )}
    </Box>
  );
};

export default NearestPharmacies;
