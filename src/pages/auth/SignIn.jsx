import { Box } from "@mui/material";
import SignInSection from "../../sections/signIn/SignInSection";
const SignInPage = () => {
  return (
    <Box sx={{ height: "100vh", maxWidth: "100vw", p: 4 }}>
      <SignInSection />
    </Box>
  );
};

export default SignInPage;
