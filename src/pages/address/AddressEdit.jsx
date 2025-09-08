import AddressFormSection from "../../sections/address/AddressFormSection";
import {
  CreateAddress,
  UpdateAddress,
  GetOneAddress,
  IsAddressAvailableForUser,
  ChangeUserSelectedAddredss,
} from "../../apis/address/Address";
import { GetCurrentUser } from "../../apis/auth/Auth";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Divider, Typography } from "@mui/material";
import LoadingSection from "../../sections/loading/LoadingSection";

const AddressEdit = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const [address, setAddress] = useState({});

  useEffect(() => {
    if (id) {
      setLoading(true);
      GetOneAddress(id).then((res) => {
        setAddress(res);
        setLoading(false);
      });
    }
  }, []);

  const handleSubmit = async (data) => {
    try {
      if (id) {
        await UpdateAddress(id, data);
      } else {
        const res = await CreateAddress(data);
        const isAvailable = await IsAddressAvailableForUser(
          GetCurrentUser().id
        );
        if (!isAvailable) {
          await ChangeUserSelectedAddredss(res.address_id);
        }
      }
    } catch (error) {
      console.error("Error saving address:", error);
      throw error; // Propagate the error to be handled by the form
    }
  };
  if (loading) {
    return <LoadingSection />;
  }

  return (
    <Box sx={{ padding: 2, mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        {id ? "Edit Address" : "Add New Address"}
      </Typography>
      <Divider sx={{ marginBottom: 4 }} />
      <AddressFormSection
        initialData={address || undefined}
        onSubmit={handleSubmit}
      />
    </Box>
  );
};

export default AddressEdit;
