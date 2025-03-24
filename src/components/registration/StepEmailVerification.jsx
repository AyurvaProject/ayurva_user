import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { textFieldStyle } from "../../styles/TextFields.styles";

const StepEmailVerification = ({ onNext, onBack }) => {
  // const [code, setCode] = useState("");

  const handleVerify = () => {
    // Add verification logic here (e.g., API call)
    // onNext({});
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        label="Enter verification Code"
        variant="filled"
        size="small"
        sx={textFieldStyle}
      />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="contained" onClick={handleVerify}>
          Verify
        </Button>
      </Box>
    </Box>
  );
};

export default StepEmailVerification;
