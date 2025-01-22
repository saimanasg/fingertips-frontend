import React from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { jwtDecode } from "jwt-decode";
import ProServicesPage from "./component/professional/projobs";
import ServiceDetailsPage from "./component/professional/ServiceDetailsPage";
import CustServicesPage from "./component/customer/custjobs";
import CustomerServiceDetailsPage from "./component/customer/CustomerServiceDetailsPage";
import ListProfessionals from "./component/professional/professionals";
import PurchaseServiceForm from "./component/customer/purchaseservice";
import ProfessionalDashboard from "./component/professional/prodashboard";
import CustomerDashboard from "./component/customer/customerdashboard";
import SignIn from "./component/admin/signin";
import Navbar from "./component/admin/navbar";
import EditProfessionalPage from "./component/professional/editpro";
import EditCustomerPage from "./component/customer/editcust";

import RegisterPage from "./component/admin/customerregister";
import RegisterProfessional from "./component/admin/professionalregister";
import Home from "./component/admin/home";
import UserApproval from "./component/admin/adminpage";
import AllServices from "./component/admin/allservices";
import About from "./component/admin/about";
import ForgotPassword from "./component/admin/forgotpassword";
import ResetPassword from "./component/admin/resetpassword";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/" element={<Home />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/customer/signup" element={<RegisterPage />} />
        <Route path="/professional/signup" element={<RegisterProfessional />} />
        <Route path="/services" element={<AllServices />} />
        <Route path="/about" element={<About />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword/:token" element={<ResetPassword />} />
        <Route
          path="/adminpage"
          element={<ProtectedRoute element={<UserApproval />} />}
        />
        <Route
          path="/pro/myjobs"
          element={<ProtectedRoute element={<ProServicesPage />} />}
        />
        <Route
          path="/customer/myjobs"
          element={<ProtectedRoute element={<CustServicesPage />} />}
        />
        <Route
          path="/pros"
          element={<ProtectedRoute element={<ListProfessionals />} />}
        />
        <Route
          path="/buy/"
          element={<ProtectedRoute element={<PurchaseServiceForm />} />}
        />
        <Route
          path="/pro/dashboard"
          element={<ProtectedRoute element={<ProfessionalDashboard />} />}
        />
        <Route
          path="/customer/dashboard"
          element={<ProtectedRoute element={<CustomerDashboard />} />}
        />
        <Route
          path="/pro/service/:serviceId"
          element={<ProtectedRoute element={<ServiceDetailsPage />} />}
        />

        <Route
          path="/customer/edit-profile"
          element={<ProtectedRoute element={<EditCustomerPage />} />}
        />
        <Route
          path="/pro/edit-profile"
          element={<ProtectedRoute element={<EditProfessionalPage />} />}
        />
        <Route
          path="/cust/service/:serviceId"
          element={<ProtectedRoute element={<CustomerServiceDetailsPage />} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

// function ProtectedRoute({ element }) {
//   const location = useLocation();
//   const isAuthenticated = localStorage.getItem("jwt");
//   const userType = isAuthenticated ? jwtDecode(isAuthenticated).userType : null;

//   if (location.pathname !== "/" && isAuthenticated) {
//     return (
//       <>
//         <Navbar />
//         {element}
//       </>
//     );
//   }

//   // If user is not authenticated, redirect to login page
//   return <Navigate to="/" />;
// }
function ProtectedRoute({ element }) {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("jwt");
  const userType = isAuthenticated ? jwtDecode(isAuthenticated).userType : null;

  // If user is not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  // Admin can only access /adminpage
  if (userType === "admin" && location.pathname !== "/adminpage") {
    return <Navigate to="/adminpage" />;
  }

  // Customer can only access specific routes
  if (userType === "customer") {
    const allowedRoutes = [
      "/customer/myjobs",
      "/buy",
      "/pros",
      "/customer/dashboard",
      "/customer/edit-profile",
    ];
    if (
      !allowedRoutes.includes(location.pathname) &&
      !location.pathname.startsWith("/cust/service/")
    ) {
      return <Navigate to="/customer/dashboard" />;
    }
  }

  // Professional can only access specific routes
  if (userType === "professional") {
    const allowedRoutes = [
      "/pro/edit-profile",
      "/pro/dashboard",
      "/pro/myjobs",
    ];
    if (
      !allowedRoutes.includes(location.pathname) &&
      !location.pathname.startsWith("/pro/service/")
    ) {
      return <Navigate to="/pro/dashboard" />;
    }
  }

  // Render the element for authenticated users
  return (
    <>
      <Navbar />
      {element}
    </>
  );
}

export default App;
