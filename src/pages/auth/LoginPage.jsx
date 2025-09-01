import React, { useState } from "react";
import {
  Container,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Typography,
  Link,
  Box,
  Stack,
} from "@mui/material";
import { styled } from "@mui/system";
import logo from "../../assets/img/logo.png";
import loginbg1 from "../../assets/img/loginbg1.png";
import { VisibilityOff } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { textFieldStyle } from "../../styles/TextFields.styles";

const Background = styled("div")({
  display: "flex",
  height: "100vh",
  justifyContent: "center",
  alignItems: "center",
  // background: "#121212",
});

const FormContainer = styled(Box)({
  //   background: "black",
  //   margin: "0% 70%",
  padding: "30px",
  borderRadius: "10px",
  // boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
  //   color: "white",
  width: "400px",
});

const LoginPage = () => {
  const [visible1, setVisible1] = useState(false);
  const handleSetVisible1 = () => {
    if (visible1 === true) {
      setVisible1(false);
    } else {
      setVisible1(true);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: "100%",
        maxHeight: "100vh",
        display: "flex",
        background: `url(${loginbg1})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        justifyContent: "space-between",
        //flexDirection: "row",
        // padding: "10px",
      }}
    >
      <Box sx={{ width: "auto" }}>
        <Background>
          <Container maxWidth="sm">
            <FormContainer>
              <Typography variant="h4" gutterBottom align="center">
                Login to your Account
              </Typography>
              <Stack gap={1}>
                <TextField
                  label="Usename"
                  variant="filled"
                  size="small"
                  sx={{
                    "& .MuiFilledInput-root": {
                      backgroundColor: "filled", // Keeps background clear
                      "&:before, &:after": {
                        display: "none", // Removes bottom underline
                      },
                    },
                  }}
                />
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
                          {visible1 === true ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>

              <Button variant="contained" fullWidth sx={{ mt: 2 }}>
                Login
              </Button>
              <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                Don't you have an account?{" "}
                <Link href="#" color="inherit">
                  Sign Up
                </Link>
              </Typography>
            </FormContainer>
          </Container>
        </Background>
      </Box>
      <Box sx={{ flexDirection: "row", width: "25%", padding: "10px" }}>
        <Box sx={{ display: "flex", justifyContent: "end", marginTop: "15px" }}>
          <img
            src={logo}
            alt="logo"
            style={{ width: "50px", height: "50px" }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
