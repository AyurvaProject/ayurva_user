import React, { useState } from "react";
import { TextField, Button, CircularProgress, Box } from "@mui/material";
import { LocationOn } from "@mui/icons-material";

const LocationPicker = () => {
  const [location, setLocation] = useState(""); // Stores the address
  const [loading, setLoading] = useState(false); // Controls the loading state

  // Function to get the user's current location
  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true); // Start loading
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        console.log("Coordinates:", latitude, longitude);
        fetchAddress(latitude, longitude); // Call function to get address
      },
      (error) => {
        alert("Error fetching location: " + error.message);
        setLoading(false); // Stop loading if error occurs
      }
    );
  };

  // Function to fetch address from Nominatim API
  const fetchAddress = async (lat, lng) => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data && data.display_name) {
        setLocation(data.display_name); // Set address in state
      } else {
        alert("No address found.");
      }
    } catch (error) {
      alert("Error fetching address: " + error.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      {/* MUI Input Field to show the address */}
      <TextField
        label="Current Location"
        variant="outlined"
        fullWidth
        value={location}
        disabled
      />

      {/* Button to trigger location fetching */}
      <Button
        variant="contained"
        startIcon={<LocationOn />}
        onClick={getLocation}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : "Use Current Location"}
      </Button>
    </Box>
  );
};

export default LocationPicker;
