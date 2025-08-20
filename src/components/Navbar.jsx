import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Avatar,
  Box,
  Container,
  Select,
  FormControl,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import { Search, ShoppingCart, ArrowDropDown } from "@mui/icons-material";
import { styled } from "@mui/system";
import logo from "../assets/img/logo.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { GetCurrentUser } from "../apis/auth/Auth";

const Navbar = () => {
  // Handle user menu
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <AppBar
      position="static"
      sx={{
        background: "#fff",
        boxShadow: "none",
        borderBottom: "1px solid #ddd",
      }}
    >
      <Container sx={{ padding: 1.5 }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Logo */}
          <Typography
            variant="h6"
            component="div"
            sx={{
              display: "flex",
              alignItems: "center",
              color: "#4527a0",
              fontWeight: "bold",
            }}
          >
            <img
              src={logo}
              alt="Ayurva"
              style={{ width: 40, marginRight: 20 }}
            />
            Ayurva
          </Typography>

          {/* Category & Search */}
          <Box
            sx={{ display: "flex", alignItems: "center", flexGrow: 1, mx: 2 }}
          >
            <FormControl size="small" sx={{ mr: 1, minWidth: 140 }}>
              <Select defaultValue="All Categories">
                <MenuItem value="All Categories">All Categories</MenuItem>
                <MenuItem value="Pain Relief">Pain Relief</MenuItem>
                <MenuItem value="Diabetes Care">Diabetes Care</MenuItem>
              </Select>
            </FormControl>

            <SearchBox sx={{ height: "40px" }}>
              <InputBase
                placeholder="Search medicine, medical products"
                fullWidth
                sx={{ paddingLeft: "10px", height: "80%" }}
              />
              <IconButton
                type="submit"
                sx={{
                  borderRadius: 0,
                  p: "10px",
                  color: "#fff",
                  backgroundColor: "#1976d2",
                  paddingRight: "10px",
                }}
              >
                <Search />
              </IconButton>
            </SearchBox>
          </Box>

          {/* Upload Prescription Button */}
          <Button
            variant="contained"
            endIcon={<DescriptionIcon />}
            sx={{
              backgroundColor: "#1976d2",
              color: "#fff",
              px: 3,
              borderRadius: 2,
              textTransform: "none",
            }}
          >
            Prescription Upload
          </Button>

          {/* Icons: Cart & Profile */}
          <IconButton sx={{ mx: 1 }}>
            <ShoppingCart />
          </IconButton>

          {/* Profile Dropdown */}
          <IconButton onClick={handleMenuOpen}>
            <Avatar src={GetCurrentUser()?.user_profile_pic} />
            <ArrowDropDown />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => navigate("/profile")}>
              <AccountCircleIcon sx={{ mr: 1 }} />
              Profile
            </MenuItem>
            <MenuItem onClick={() => logout()}>
              <LogoutIcon sx={{ mr: 1 }} />
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </Container>

      {/* Categories Bar */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          p: 1,
          bgcolor: "#f5f5f5",
        }}
      >
        {[
          "Pain Relief",
          "Cold and Flu",
          "Diabetes Care",
          "Digestive Health",
          "First Aid",
          "Skin Care",
          "Child and Baby Care",
          "Heart Health",
          "Eye and Ear Care",
          "Respiratory Health",
        ].map((category) => (
          <Typography
            key={category}
            sx={{ mx: 2, fontSize: 14, color: "#333", cursor: "pointer" }}
          >
            {category}
          </Typography>
        ))}
      </Box>
    </AppBar>
  );
};

// Styled Search Box
const SearchBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  border: "1px solid #ccc",
  borderRadius: "8px",
  overflow: "hidden",
  width: "100%",
  maxWidth: "500px",
  background: "#fff",
});

export default Navbar;
