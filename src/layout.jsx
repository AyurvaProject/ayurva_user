import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Container } from "@mui/material";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Container sx={{ minHeight: "80vh", width: "100%", mt: 2 }}>
        <Outlet />
      </Container>
      <Footer />
    </>
  );
};

export default Layout;
