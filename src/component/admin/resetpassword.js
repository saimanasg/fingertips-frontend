// Added by Srinjana
import React, { useState } from "react";
import "./home.css";
import NavbarHome from "./navbarhome";
import FooterHome from "./footer";
import swal from "sweetalert";
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
function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$.!%*#?&]{8,}$/; // Minimum eight characters, at least one uppercase letter, one lowercase letter, and one number
    return regex.test(password);
  };

  const handleNewPasswordChange = (e) => {
    const password = e.target.value;
    setNewPassword(password);
    if (!validatePassword(password)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        newPassword:
          "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, and a number.",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, newPassword: "" }));
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const password = e.target.value;
    setConfirmPassword(password);
    if (password !== newPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Passwords do not match.",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !newPassword ||
      !confirmPassword ||
      errors.newPassword ||
      errors.confirmPassword
    ) {
      swal({
        title: "Please Enter all the details correctly!",
        icon: "error",
        button: "OK",
      });
    } else {
      const token = window.location.href.split("/")[4];
      const data = {
        newPass: newPassword, // Using newPassword directly from state
      };

      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/user/resetpass/${token}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        if (response.ok) {
          swal({
            title: "Successful",
            text: "Password Successfully changed!!",
            icon: "success",
            button: "OK",
          }).then(() => {
            window.location.href = "/login"; // Redirect to login page
          });
        } else {
          // Handle other response status codes or errors
          swal({
            title: "Error",
            text: "Failed to reset password. Please try again later.",
            icon: "error",
            button: "OK",
          });
        }
      } catch (error) {
        // Handle fetch errors
        console.error("Fetch error:", error);
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
                  <div className="text-center mb-4">
                    <a href="#!">
                      <img src={logo} alt="Logo" width="150" height="50" />
                    </a>
                  </div>
                  <h2 className="h4 text-center">Reset Password</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="form-floating mb-3">
                      <input
                        type="password"
                        className="form-control"
                        name="newPassword"
                        id="newPassword"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={handleNewPasswordChange}
                        required
                      />
                      <label htmlFor="newPassword">New Password</label>
                      {errors.newPassword && (
                        <div className="text-danger">{errors.newPassword}</div>
                      )}
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="password"
                        className="form-control"
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        required
                      />
                      <label htmlFor="confirmPassword">Confirm Password</label>
                      {errors.confirmPassword && (
                        <div className="text-danger">
                          {errors.confirmPassword}
                        </div>
                      )}
                    </div>
                    <div className="d-grid">
                      <button className="btn btn-primary" type="submit">
                        Submit
                      </button>
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
export default ResetPassword;
