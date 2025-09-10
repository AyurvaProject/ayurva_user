import React from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Divider,
  Tooltip,
  Button,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { GetCurrentUser } from "../../apis/auth/Auth";

const AddressCard = ({
  address,
  handleChange,
  isChanging,
  user,
  onDelete,
  isDeleting,
}) => {
  const navigate = useNavigate();
  console.log("AddressCard rendered with address:", address);
  console.log("CurrentUser:", user);
  const isDefaultAddress = address.address_id === user.selected_address_id;
  console.log("Is Default Address:", isDefaultAddress);
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 1,
        p: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "linear-gradient(135deg, #f9f9f9, #ffffff)",
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          📍 Address
        </Typography>

        <Typography variant="body1">
          {address.address_l1}, {address.address_l2}, {address.address_l3}
        </Typography>

        <Typography variant="body2" color="text.secondary" mt={1}>
          District: {address.address_district} <br />
          Zip Code: {address.address_zip_code}
        </Typography>

        <Typography variant="body2" color="text.secondary" mt={1}>
          Coordinates: {address.user_lat}, {address.user_lng}
        </Typography>
      </CardContent>

      <Divider />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          variant={isDefaultAddress ? "contained" : "outlined"}
          color="primary"
          size="small"
          sx={{ height: 24 }}
          disabled={isChanging || isDefaultAddress}
          onClick={() => handleChange(address.address_id)}
        >
          {isDefaultAddress ? "Default Address" : "Set as Default"}
        </Button>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 1,
            mt: 1,
          }}
        >
          <Tooltip title="View">
            <IconButton
              color="primary"
              sx={{ borderRadius: 2 }}
              onClick={() => navigate(`/editAddress/${address.address_id}`)}
            >
              <VisibilityIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Edit">
            <IconButton
              color="warning"
              onClick={() => navigate(`/editAddress/${address.address_id}`)}
              sx={{ borderRadius: 2 }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton
              color="error"
              onClick={() => {
                onDelete(address.address_id);
              }}
              sx={{ borderRadius: 2 }}
              disabled={isDeleting}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Card>
  );
};

export default AddressCard;
