import React, { useState, useEffect } from "react";
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
import HomeIcon from "@mui/icons-material/Home";
import DnsIcon from "@mui/icons-material/Dns";
import BadgeIcon from "@mui/icons-material/Badge";
import { GetCurrentUser, GetOneUserById } from "../apis/auth/Auth";
import { keyframes } from "@mui/system";

const scrollAnimation = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
`;

const Navbar = () => {
  // Handle user menu
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (GetCurrentUser()) {
      GetOneUserById(GetCurrentUser().id).then((res) => {
        setUser(res);
      });
    }
    setLoading(false);
  }, []);

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
            onClick={() => navigate("/")}
            sx={{
              display: "flex",
              alignItems: "center",
              color: "#4527a0",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            <img
              src={logo}
              alt="Ayurva"
              style={{ width: 40, marginRight: 20, cursor: "pointer" }}
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
            onClick={() => navigate("/prescription/add")}
          >
            Prescription Upload
          </Button>

          {/* Icons: Cart & Profile */}
          {/* <IconButton sx={{ mx: 1 }}>
            <ShoppingCart />
          </IconButton> */}

          {/* Profile Dropdown */}
          {GetCurrentUser() ? (
            loading ? (
              <div>Loading...</div>
            ) : (
              <IconButton onClick={handleMenuOpen}>
                <Avatar src={user?.user_profile_pic} />
                <ArrowDropDown />
              </IconButton>
            )
          ) : (
            <Button
              variant="text"
              sx={{ textTransform: "none", mx: 1 }}
              onClick={() => navigate("/main")}
            >
              Login
            </Button>
          )}

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem
              onClick={() => {
                navigate("/profile/0");
                handleMenuClose();
              }}
            >
              <AccountCircleIcon sx={{ mr: 1 }} />
              Profile
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/profile/1");
                handleMenuClose();
              }}
            >
              <HomeIcon sx={{ mr: 1 }} />
              Addresses
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/profile/2");
                handleMenuClose();
              }}
            >
              <DescriptionIcon sx={{ mr: 1 }} />
              Prescriptions
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/profile/4");
                handleMenuClose();
              }}
            >
              <DnsIcon sx={{ mr: 1 }} />
              Orders
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/profile/5");
                handleMenuClose();
              }}
            >
              <BadgeIcon sx={{ mr: 1 }} />
              Prescription Orders
            </MenuItem>
            <MenuItem
              onClick={() => {
                logout();
                navigate("/");
                handleMenuClose();
              }}
              sx={{ color: "red" }}
            >
              <LogoutIcon sx={{ mr: 1 }} />
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </Container>

      {/* Categories Bar */}
      <Box
        sx={{
          overflow: "hidden",
          whiteSpace: "nowrap",
          bgcolor: "#f5f5f5",
          p: 0,
          position: "relative",
          width: "100%",
          display: "flex",
          alignItems: "center",
          height: "40px",
          borderBottom: "1px solid #ddd",
        }}
      >
        <Typography
          component="div"
          sx={{
            display: "inline-block",
            animation: `${scrollAnimation} 25s linear infinite`,
            fontSize: 14,
            color: "#333",
            fontWeight: 500,
          }}
        >
          🚀 Welcome to Ayurva! — Your one-stop solution for connecting with
          pharmacists, uploading prescriptions, finding nearby pharmacies, and
          ordering medicine online. 💊 Get fast delivery and stay healthy with
          our trusted network of pharmacies and delivery partners.
        </Typography>
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
