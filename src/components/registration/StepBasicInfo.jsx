import React, { useState } from "react";
import {
  Box,
  TextField,
  Stack,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { textFieldStyle } from "../../styles/TextFields.styles";
import { VisibilityOff } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";

const StepBasicInfo = () => {
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);

  const handleSetVisible1 = () => {
    if (visible1 === true) {
      setVisible1(false);
    } else {
      setVisible1(true);
    }
  };
  const handleSetVisible2 = () => {
    if (visible2 === true) {
      setVisible2(false);
    } else {
      setVisible2(true);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Stack gap={1}>
        <TextField
          label="Email Address"
          variant="filled"
          size="small"
          sx={textFieldStyle}
        />
        <TextField
          label="Username"
          variant="filled"
          size="small"
          sx={textFieldStyle}
        />
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <TextField
            label="Password"
            variant="filled"
            size="small"
            sx={textFieldStyle}
            type={visible1 === true ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSetVisible1}>
                    {visible1 === true ? <VisibilityIcon /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Confirm Password"
            variant="filled"
            size="small"
            sx={textFieldStyle}
            type={visible2 === true ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSetVisible2}>
                    {visible2 === true ? <VisibilityIcon /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default StepBasicInfo;
