import React, { useState } from "react";
import {
  Container,
  // TextField,
  // Checkbox,
  Button,
  Typography,
  // Link,
  Box,
  // Stack,
} from "@mui/material";
import { styled } from "@mui/system";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import logo from "../../assets/img/logo.png";
import loginbg1 from "../../assets/img/loginbg1.png";
import StepBasicInfo from "../../components/registration/StepBasicInfo";
import StepEmailVerification from "../../components/registration/StepEmailVerification";
import StepAdditionalInfo from "../../components/registration/StepAdditionalInfo";

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

// const InputField = styled(TextField)({
//   marginBottom: "15px",
//   width: "100%",
// });

const steps = ["Step 01", "Step 02", "Step 03"];

const Registration = () => {
  // const [activeStep, setActiveStep] = useState(0);
  // const [formData, setFormData] = useState({
  //   username: "",
  //   email: "",
  //   password: "",
  //   nic: "",
  //   age: "",
  //   address: "",
  // });

  const [step, setStep] = useState(0);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handleBackStep = () => {
    setStep(step - 1);
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
              <Box
                variant="body2"
                align="center"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  alignContent: "center",
                  gap: 1,
                  mt: 2,
                }}
              >
                <Typography variant="h5" gutterBottom align="center">
                  Welcome to
                </Typography>
                <Typography
                  variant="h4"
                  gutterBottom
                  align="center"
                  sx={{ color: "blue" }}
                >
                  Ayurva
                </Typography>
              </Box>
              {(step === 1 || step === 2) && (
                <Button startIcon={<ArrowBackIcon />} onClick={handleBackStep}>
                  Back
                </Button>
              )}

              <Box
                sx={{
                  width: "100%",
                  margin: "20px",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <Box>
                  {step === 0 && <StepBasicInfo />}
                  {step === 1 && <StepEmailVerification />}

                  {step === 2 && <StepAdditionalInfo />}
                </Box>
                <Box>
                  <Button onClick={handleNextStep}>
                    {/* {" "} */}
                    {step === 0 ? "Next" : step === 1 ? "Next" : "Submit"}
                  </Button>
                </Box>
                <Box sx={{ padding: "20px" }}>
                  <Stepper activeStep={step} alternativeLabel>
                    {steps.map((label, index) => (
                      <Step key={index}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Box>
              </Box>
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

export default Registration;
