import React from "react";
import { GetCurrentUser, IsTokenExpired } from "../../apis/auth/Auth";
import {
  GetAllPharmacies,
  GetNearPharmacyByUserId,
} from "../../apis/pharmacy/Pharmacy";
import PharmacyCard from "../../components/pharmacy/PharmacyCard";
import { IsAddressAvailableForUser } from "../../apis/address/Address";
import AllPharmacyListSection from "./AllPharmacyListSection";
import NearPharmacyListSection from "./NearPharmacyListSection";
import { Box } from "@mui/material";
const PharmacyListSection = () => {
  const user = GetCurrentUser();
  const [loading, setLoading] = React.useState(true);
  const [hasAddress, setHasAddress] = React.useState(false);

  React.useEffect(() => {
    const checkAddress = async () => {
      if (user) {
        const available = await IsAddressAvailableForUser(user.id);
        setHasAddress(available);
      }
      setLoading(false);
    };
    checkAddress();
  });
  return (
    <Box
      sx={{ width: "100%", my: 4, display: "flex", flexDirection: "column" }}
    >
      {/* {!loading && hasAddress && <NearPharmacyListSection />} */}
      <AllPharmacyListSection />
    </Box>
  );
};

export default PharmacyListSection;
