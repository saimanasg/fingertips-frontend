// Added by Srinjana
import React, { useState } from "react";
import "./home.css";
import NavbarHome from "./navbarhome";
import FooterHome from "./footer";
import swal from "sweetalert";
import axios from "axios";
import homeImg1 from "./assest/images/home2.png";
import homeImg2 from "./assest/images/home1.png";
import service1 from "./assest/images/service1.webp";
import service2 from "./assest/images/service2.webp";
import service3 from "./assest/images/service3.webp";
import service4 from "./assest/images/service4.webp";
import service5 from "./assest/images/service5.webp";
import service6 from "./assest/images/service6.webp";
import service7 from "./assest/images/service7.webp";
import logo from "./assest/images/logo.png";
function ForgotPassword() {
  // State to hold the email and validation error message
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  // Regex pattern for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Function to handle email input changes
  const handleEmailChange = (event) => {
    const emailValue = event.target.value;
    setEmail(emailValue);
    if (!emailRegex.test(emailValue)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (emailError || !email) {
      alert("Please fix the errors before submitting");
    } else {
      try {
        await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/user/forgotpassword`,
          { email: email }
        );
        swal({
          title: "Mail Sent!",
          text: "Please check your email for the Password reset link",
          icon: "success",
          button: "OK",
        });
        setEmail("");
      } catch (error) {
        console.error("Error:", error);
        swal({
          title: "Error",
          text: "An error occurred. Please try again later.",
          icon: "error",
          button: "OK",
        });
      }
    }
  };

  return (
    <div>
      <NavbarHome></NavbarHome>
      <div className="wrapper">
        <div className="divider div-transparent"></div>
      </div>

      <section className="bg-light p-3 p-md-4 p-xl-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6 col-xxl-5">
              <div className="card border border-light-subtle rounded-4">
                <div className="card-body p-3 p-md-4 p-xl-5">
                  <div className="row">
                    <div className="col-12">
                      <div className="mb-5">
                        <div className="text-center mb-4">
                          <a href="#!">
                            <img
                              src={logo}
                              alt="Logo"
                              width="150"
                              height="50"
                            />
                          </a>
                        </div>
                        <h2 className="h4 text-center">Forgot Password</h2>
                        <h3 className="fs-6 fw-normal text-secondary text-center m-0">
                          Provide the email address associated with your account
                          to recover your password.
                        </h3>
                      </div>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="row gy-3 overflow-hidden">
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input
                            type="email"
                            className="form-control"
                            name="email"
                            id="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={handleEmailChange}
                            required
                            pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                          />
                          <label htmlFor="email">Email</label>
                          {emailError && (
                            <div className="text-danger">{emailError}</div>
                          )}
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="d-grid">
                          <button
                            className="btn bsb-btn-xl btn-primary"
                            type="submit"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <br />
      <FooterHome></FooterHome>
    </div>
  );
}
export default ForgotPassword;
