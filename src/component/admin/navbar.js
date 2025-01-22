import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "./assest/images/logo.png";
function Navbar() {
  const [userType, setUserType] = useState("");

  useEffect(() => {
    // Retrieve JWT token from localStorage
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      // Decode JWT token to get user information
      const decodedToken = parseJwt(jwt);
      // Set user type
      setUserType(decodedToken.userType);
    }
  }, []);

  // Function to decode JWT token
  const parseJwt = (token) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(jsonPayload);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <img
          src={logo}
          alt="Website Logo"
          style={{ maxHeight: "15%", maxWidth: "15%" }}
          data-bs-toggle="tooltip"
          data-bs-title="You've come to the right site"
        />
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="nav nav-pills nav-justified">
            {userType === "customer" && (
              <>
                {/* <li className="nav-item d-none d-lg-block">
                  <a className="nav-link" href="/customer/dashboard"
                  style={{ whiteSpace: "nowrap" }}>
                    Home
                  </a>
                </li> */}
                <li className="nav-item d-none d-lg-block">
                  <a
                    className="nav-link"
                    href="/pros"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Professionals
                  </a>
                </li>

                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="/buy"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Buy Service
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="/customer/myjobs"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    History
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="/customer/edit-profile"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Edit Profile
                  </a>
                </li>
              </>
            )}
            {userType === "professional" && (
              <>
                {/* <li className="nav-item d-none d-lg-block">
                  <a className="nav-link" href="/pro/dashboard"
                   style={{ whiteSpace: "nowrap" }}>
                    Home
                  </a>
                </li> */}
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="/pro/myjobs"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Jobs
                  </a>
                </li>

                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="/pro/edit-profile"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Edit Profile
                  </a>
                </li>
              </>
            )}

            {userType === "admin" && (
              <>
                <li className="nav-item d-none d-lg-block">
                  <a
                    className="nav-link"
                    href="/adminpage"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Home
                  </a>
                </li>
              </>
            )}
            <li className="nav-item">
              <a className="nav-link" href="/" onClick={handleLogout}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
