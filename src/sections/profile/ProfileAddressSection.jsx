import { useState, useEffect, use } from "react";
import { Box, Typography, Divider, Button } from "@mui/material";
import {
  GetAddressesByUserId,
  ChangeUserSelectedAddredss,
  DeleteAdrress,
} from "../../apis/address/Address";
import { GetCurrentUser } from "../../apis/auth/Auth";
import AddressCard from "../../components/address/AddressCard";
import CustomSnackbar from "../../components/snackbar/CustomSnackbar";
import { GetOneUserById } from "../../apis/auth/Auth";
import { useNavigate } from "react-router-dom";
import LoadingSection from "../loading/LoadingSection";

const ProfileAddressSection = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true);
  const [isDeleteing, setIsDeleteing] = useState(false);
  const [isChangingDefault, setIsChangingDefault] = useState(false);
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

  const fetchAddresses = async () => {
    setLoading(true);
    try {
      const userId = GetCurrentUser().id;
      const userAddresses = await GetAddressesByUserId(userId);
      setAddresses(userAddresses);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchUser = async () => {
    setUserLoading(true);
    try {
      const userId = GetCurrentUser().id;
      const userData = await GetOneUserById(userId);
      setUser(userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setUserLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleSetDefaultAddress = async (addressId) => {
    setIsChangingDefault(true);
    try {
      await ChangeUserSelectedAddredss(addressId);
      showSnackbar("success", false, "Default address updated successfully.");
    } catch (error) {
      console.error("Error setting default address:", error);
      showSnackbar("error", false, "Failed to update default address.");
    } finally {
      setIsChangingDefault(false);
      await fetchAddresses();
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      setIsDeleteing(true);
      await DeleteAdrress(addressId);
      showSnackbar("success", false, "Address deleted successfully.");
    } catch (error) {
      console.error("Error deleting address:", error);
      showSnackbar("error", false, "Failed to delete address.");
    } finally {
      await fetchAddresses();
      setIsDeleteing(false);
    }
  };

  if (loading || userLoading) {
    return (
      <Box sx={{ width: "900px" }}>
        <LoadingSection />
      </Box>
    );
  }

  return (
    <Box>
      {addresses.length > 0 ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 2,
          }}
        >
          {addresses.map((address) => (
            <AddressCard
              key={address.address_id}
              address={address}
              handleChange={handleSetDefaultAddress}
              isChanging={isChangingDefault}
              user={user}
              onDelete={handleDeleteAddress}
              isDeleting={isDeleteing}
            />
          ))}
        </Box>
      ) : (
        <Typography variant="body1" color="text.secondary">
          No addresses found.
        </Typography>
      )}

      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2, width: "100%", fontWeight: "bold" }}
        onClick={() => navigate("/createAddress")}
      >
        Add New Address
      </Button>
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

export default ProfileAddressSection;
