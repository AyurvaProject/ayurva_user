import { useState, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
import { GetOneUserById, GetCurrentUser } from "../../apis/auth/Auth";
import {
  IsAddressAvailableForUser,
  GetOneAddress,
} from "../../apis/address/Address";
import { CreatePrescriptionOrder } from "../../apis/prescriptionOrder/PrescriptionOrder";
import { GetRoadDistance } from "../../apis/location/Location";

const PharmacyCard = ({ pharmacy }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    if (GetCurrentUser()) {
      setLoading(true);
      GetOneUserById(GetCurrentUser().id).then((data) => setUser(data));
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    calculateDistance().then((data) => setDistance(data));
  }, [user]);

  const calculateDistance = async () => {
    if (user) {
      const isAvailable = await IsAddressAvailableForUser(GetCurrentUser()?.id);
      if (isAvailable) {
        console.log("User has an address, calculating distance...", user);
        const address = await GetOneAddress(user?.selected_address_id);
        const distance = await GetRoadDistance(
          address?.user_lat,
          address?.user_lng,
          pharmacy?.pharmacy_lat,
          pharmacy?.pharmacy_lng
        );

        console.log("Calculated distance:", distance);
        return distance;
      }
      return 0;
    }
    return 0;
  };

  console.log("Distance:", pharmacy, distance, user);

  if (loading) {
    return (
      <Card sx={{ borderRadius: "8px", boxShadow: 2 }}>
        <Skeleton variant="rectangular" height={140} />
        <CardContent sx={{ textAlign: "center" }}>
          <Skeleton width="60%" />
          <Skeleton width="40%" />
        </CardContent>
        <Skeleton variant="rectangular" height={40} />
      </Card>
    );
  }

  return (
    <Card sx={{ borderRadius: "8px", boxShadow: 2 }}>
      <CardMedia
        component="img"
        height="140"
        image={pharmacy.pharmacy_img_01 || "/default-pharmacy.jpg"}
        alt={pharmacy.pharmacy_name}
      />
      <CardContent sx={{ textAlign: "center" }}>
        <Typography variant="body1" fontWeight="bold">
          {pharmacy.pharmacy_name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {/* {pharmacy.pharmacy_district} */}
          {GetCurrentUser()
            ? distance
              ? `${distance} km away`
              : "No address found"
            : pharmacy.pharmacy_district}
        </Typography>
      </CardContent>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        // href={`/pharmacy/${pharmacy.pharmacy_id}`}
        onClick={() => navigate(`/pharmacies/${pharmacy.pharmacy_id}`)}
        sx={{
          borderRadius: "0 0 8px 8px",
          backgroundColor: "#0056b3",
          "&:hover": { backgroundColor: "#003f7f" },
        }}
        endIcon={<ArrowForwardIcon />}
      >
        Show More
      </Button>
    </Card>
  );
};

export default PharmacyCard;
