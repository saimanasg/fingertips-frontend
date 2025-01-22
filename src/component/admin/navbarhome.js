import React from "react";
import logo from "./assest/images/logo.png";
function NavbarHome() {
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
            <li className="nav-item d-none d-lg-block">
              <a className="nav-link" href="/"
              style={{ whiteSpace: "nowrap" }}>
                Home
              </a>
            </li>
            <li className="nav-item d-none d-lg-block">
              <a
                className="nav-link"
                href="/professional/signup"
                style={{ whiteSpace: "nowrap" }}
              >
                Join as a Pro
              </a>
            </li>
            <li className="nav-item d-none d-md-block">
              <a className="nav-link" href="/services"
              style={{ whiteSpace: "nowrap" }}>
                Services
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about"
              style={{ whiteSpace: "nowrap" }}>
                About
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="/customer/signup"
                style={{ whiteSpace: "nowrap" }}
              >
                Sign Up
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/login">
                Login
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavbarHome;
