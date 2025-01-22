import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import NavbarHome from "./navbarhome.js";
import FooterHome from "./footer.js";
import swal from "sweetalert";
import logo from "./assest/images/logo.png";
function SignIn() {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    const user = localStorage.getItem("jwt");
    if (user) {
      const decodedToken = jwtDecode(user);

      const { userType } = decodedToken;
      if (userType == "admin") {
        history("/adminpage");
      }
      if (userType == "customer") {
        history("/pros");
      }
      if (userType == "professional") {
        history("/pro/myjobs");
      }
    }
  }, [history]);
  const handleSignIn = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/user/authenticate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        swal({
          title: "Error",
          text: "Invalid email or password",
          icon: "error",
          button: "OK",
        });
        throw new Error("Invalid email or password");
      }

      const data = await response.json();
      localStorage.setItem("jwt", data.token);
      const user = localStorage.getItem("jwt");
      if (user) {
        const decodedToken = jwtDecode(user);

        const { userType } = decodedToken;
        if (userType == "admin") {
          history("/adminpage");
        }
        if (userType == "customer") {
          history("/pros");
        }
        if (userType == "professional") {
          history("/pro/myjobs");
        }
      }
    } catch (error) {
      setError(error.message);
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
                  <h2 className="h4 text-center">Sign In</h2>

                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      value={email}
                      className="form-control"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="email">Email</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-control"
                      required
                    />
                    <label htmlFor="password">Password</label>
                  </div>
                  <div className="d-grid">
                    <button
                      onClick={handleSignIn}
                      className="btn btn-primary"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                  <hr />
                  <p className="text-center">
                    New user?{" "}
                    <a
                      href="/customer/signup"
                      className="text-success"
                      style={{ textDecoration: "none" }}
                    >
                      Register here
                    </a>
                  </p>
                  <p className="text-center">
                    <a
                      href="/forgotpassword"
                      className="text-danger"
                      style={{ textDecoration: "none" }}
                    >
                      Forgot password?
                    </a>
                  </p>
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

export default SignIn;
