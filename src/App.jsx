import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "./App.css";
import LandingPage from "./pages/landingpage/LandingPage";
import VerifyOtpPage from "./pages/auth/VerifyOTP";
import Layout from "./layout";
import Profile from "./pages/auth/Profile";
import ProfilePage from "./pages/profile/ProfilePage";
import LoginPage from "./pages/auth/LoginPage";
import Registration from "./pages/auth/Registration";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import SignInPage from "./pages/auth/SignIn";
import AddressEdit from "./pages/address/AddressEdit";
import AddPrescription from "./pages/prescription/AddPrescription";
import PharmacyList from "./pages/pharmacy/PharmacyList";
import SinglePharmacy from "./pages/pharmacy/SinglePharmacy";
import SingleProduct from "./pages/product/SingleProduct";
import SinglePrescription from "./pages/prescription/SinglePrescription";
import NearProducts from "./pages/product/NearProducts";

function App() {
  return (
    <AuthProvider>
      <Router>
        <LoadingHandler />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<LandingPage />} />
            <Route element={<ProtectedRoute roles={["user"]} />}>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/createAddress" element={<AddressEdit />} />
              <Route path="/editAddress/:id" element={<AddressEdit />} />
              <Route path="/prescription/add" element={<AddPrescription />} />
              <Route
                path="/prescription/:id"
                element={<SinglePrescription />}
              />
              <Route
                path="/nearProducts/:pres_detail_id/:license_no"
                element={<NearProducts />}
              />
            </Route>
            <Route path="/pharmacies" element={<PharmacyList />} />
            <Route path="/pharmacies/:id" element={<SinglePharmacy />} />
            <Route path="/products/:id" element={<SingleProduct />} />
          </Route>
          <Route path="/login" element={<SignInPage />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/verifyOtp/:id" element={<VerifyOtpPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

// Loading handler to trigger NProgress when navigating
const LoadingHandler = () => {
  const location = useLocation();

  useEffect(() => {
    NProgress.start(); // Start loading bar
    setTimeout(() => {
      NProgress.done(); // Stop loading bar after small delay
      console.log("loading");
    }, 500);
  }, [location]);
  return null;
};

export default App;
