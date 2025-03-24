import { BrowserRouter as Router, Routes, Route,useLocation } from "react-router-dom";
import { useEffect } from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import './App.css';
import LandingPage from "./pages/landingpage/LandingPage";
import Layout from "./layout";
import Profile from "./pages/auth/Profile";
import LoginPage from "./pages/auth/LoginPage";
import Registration from "./pages/auth/Registration";

function App() {
      return (
        <Router>
          <LoadingHandler />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/profile" element={<Profile />} />
              
              
              
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registration" element={<Registration />} />
          </Routes>
        </Router>
      );
}

// Loading handler to trigger NProgress when navigating
const LoadingHandler = () => {
  const location = useLocation();

  useEffect(() => {
    NProgress.start(); // Start loading bar
    setTimeout(() => {
      NProgress.done(); // Stop loading bar after small delay
      console.log('loading')
    }, 500);
  }, [location]);
  return null;
};

export default App;
