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
import RegisterFormSection from "../../sections/auth/RegisterFormSection";

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
    <Box sx={{ height: "100vh", maxWidth: "100vw", p: 4 }}>
      <RegisterFormSection />
    </Box>
  );
};

export default Registration;
