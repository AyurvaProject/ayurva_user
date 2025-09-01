import React from "react";
import { Box, TextField } from "@mui/material";
import { textFieldStyle } from "../../styles/TextFields.styles";
import LocationPicker from "../LocationPicker";

const StepAdditionalInfo = ({ onBack, onSubmit }) => {
  // const [data, setData] = useState({ nic: "", age: "", address: "" });

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        label="NIC Number"
        variant="filled"
        size="small"
        sx={textFieldStyle}
      />

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <TextField
          label="Age"
          variant="filled"
          size="small"
          sx={textFieldStyle}
        />
        <TextField
          label="Gender"
          variant="filled"
          size="small"
          sx={textFieldStyle}
        />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <TextField
          label="Home No."
          variant="filled"
          size="small"
          sx={textFieldStyle}
        />
        <TextField
          label="Street No."
          variant="filled"
          size="small"
          sx={textFieldStyle}
        />
        <TextField
          label="Line No."
          variant="filled"
          size="small"
          sx={textFieldStyle}
        />
        <TextField
          label="District"
          variant="filled"
          size="small"
          sx={textFieldStyle}
        />
      </Box>

      <LocationPicker />

      {/* <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="contained">Submit</Button>
      </Box> */}
    </Box>
  );
};

export default StepAdditionalInfo;
