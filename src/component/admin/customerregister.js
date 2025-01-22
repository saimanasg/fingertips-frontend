import React, { Component } from "react";
import { useState, useEffect } from "react";
import "./customerregister.css";
import AddressAutocomplete from "./AddressAutoComplete";
import NavbarHome from "./navbarhome";
import FooterHome from "./footer";
import axios from "axios";
import swal from "sweetalert";

const password_regExp = RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':\"|,.<>\/?]).{8,}$/
);
const alpha_regExp = RegExp(/^[a-zA-Z ]*$/);
const email_regExp = RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
const cityRegex = RegExp(/^[^0-9]*$/);
const stateRegex = RegExp(/^[^0-9]*$/);
const phoneRegex = RegExp(/^(\d{3}-?\d{3}-?\d{4}|\d{10})$/);

export default class RegisterUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: "",
      lastname: "",
      dob: "",
      email: "",
      password: "",
      confirmpassword: "",
      phone: "",
      address: {
        line1: "",
        line2: "",
        city: "",
        state: "",
        zip: "",
      },
      isError: {
        firstname: "",
        lastname: "",
        city: "",
        email: "",
        password: "",
        confirmpassword: "",
        state: "",
        phone: "",
        address: {
          city: "",
          state: "",
        },
      },
    };

    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
    this.onChangeDob = this.onChangeDob.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
  }
  onChangeFirstName = (event) => {
    this.setState({
      firstname: event.target.value,
    });
  };
  onChangeLastName = (event) => {
    this.setState({
      lastname: event.target.value,
    });
  };
  onChangeEmail = (event) => {
    this.setState({
      mail: event.target.value,
    });
  };
  onChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };
  onChangeConfirmPassword = (event) => {
    this.setState({
      confirmpassword: event.target.value,
    });
  };
  onChangePhone = (event) => {
    this.setState({
      phone: event.target.value,
    });
  };
  onChangeDob = (event) => {
    this.setState({
      dob: event.target.value,
    });
  };
  onChangeAddress(e) {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      address: {
        ...prevState.address,
        [name]: value,
      },
    }));
  }
  updateAddress = (addressDetails) => {
    this.setState({
      address: addressDetails,
    });
  };

  formValChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let isError = { ...this.state.isError };
    switch (name) {
      case "phone":
        isError.phone = phoneRegex.test(value) ? "" : "Only 10 Numbers allowed";
        break;
      case "password":
        isError.password = password_regExp.test(value)
          ? ""
          : "Password must be 8-20 characters consisting of numbers,uppercase and lowercase letters and Special Characters(@#$&)";
        break;
      case "confirmpassword":
        isError.confirmpassword =
          value !== this.state.password ? "Passwords do not match" : "";
        break;
      case "firstname":
        isError.firstname = alpha_regExp.test(value)
          ? ""
          : "Numbers and Special Characters not allowed";
        break;
      case "lastname":
        isError.lastname = alpha_regExp.test(value)
          ? ""
          : "Numbers and Special Characters not allowed";
        break;
      case "email":
        isError.email = email_regExp.test(value)
          ? ""
          : "Enter Valid  E-Mail ID";
        break;
      case "city":
        isError.address.city = cityRegex.test(value) ? "" : "Enter Valid City";
        break;
      case "state":
        isError.address.state = stateRegex.test(value)
          ? ""
          : "Enter Valid State";
        break;

      default:
        break;
    }
    this.setState({
      isError,
      [name]: value,
    });
  };
  saveUser = async () => {
    if (
      this.state.firstname === "" ||
      this.state.lastname === "" ||
      this.state.phone === "" ||
      this.state.password === "" ||
      this.state.confirmpassword === "" ||
      this.state.email === "" ||
      this.state.isError.firstname !== "" ||
      this.state.isError.lastname !== "" ||
      this.state.isError.phone !== "" ||
      this.state.isError.password !== "" ||
      this.state.isError.confirmpassword !== "" ||
      this.state.isError.email !== "" ||
      this.state.isError.address.state !== "" ||
      this.state.isError.address.city !== ""
    ) {
      swal({
        title: "Please Enter all the details",
        icon: "error",
        button: "OK",
      });
    } else {
      var data = {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        phonenum: this.state.phone,
        dob: this.state.dob,
        email: this.state.email,
        password: this.state.password,
        address: this.state.address,
      };
      console.log(data);
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/user/createcustomer`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        console.log("here");
        swal({
          title: "User registered successfully",
          icon: "success",
          button: "OK",
        }).then(() => {
          window.location.href = "/login"; // Redirect to login page
        });
      } else {
        throw new Error("Failed to register user");
      }
    }
  };

  render() {
    const { isError } = this.state;
    return (
      <div>
        <NavbarHome></NavbarHome>
        <div className="wrapper">
          <div className="divider div-transparent"></div>
          <AddressAutocomplete updateAddress={this.updateAddress} />
        </div>
        <div className="container">
          <div className="row justify-content-center mt-5">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header text-white bg-primary">
                  <h3 className="text-center">Sign me Up!</h3>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">
                      First Name*
                    </label>
                    <input
                      className={
                        isError.firstname.length > 0
                          ? "is-invalid form-control"
                          : "form-control"
                      }
                      type="text"
                      id="firstname"
                      name="firstname"
                      placeholder="Enter First Name"
                      value={this.state.firstname}
                      onChange={(this.onChangeFirstName, this.formValChange)}
                      required
                    />
                    {isError.firstname.length > 0 && (
                      <span className="errormessage">{isError.firstname}</span>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">
                      Last Name*
                    </label>
                    <input
                      type="text"
                      className={
                        isError.lastname.length > 0
                          ? "is-invalid form-control"
                          : "form-control"
                      }
                      id="lastname"
                      name="lastname"
                      placeholder="Enter Last Name"
                      value={this.state.lastname}
                      onChange={(this.onChangeLastName, this.formValChange)}
                      required
                    />
                    {isError.lastname.length > 0 && (
                      <span className="errormessage">{isError.lastname}</span>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="dob" className="form-label">
                      Date of Birth*
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="dob"
                      name="dob"
                      value={this.state.dob}
                      onChange={this.onChangeDob}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email ID*
                    </label>
                    <input
                      type="email"
                      className={
                        isError.email.length > 0
                          ? "is-invalid form-control"
                          : "form-control"
                      }
                      id="email"
                      name="email"
                      placeholder="Enter Email ID"
                      value={this.state.email}
                      onChange={(this.onChangeEmail, this.formValChange)}
                      required
                    />
                    {isError.email.length > 0 && (
                      <span className="errormessage">{isError.email}</span>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password*
                    </label>
                    <input
                      type="password"
                      className={
                        isError.password.length > 0
                          ? "is-invalid form-control"
                          : "form-control"
                      }
                      id="password"
                      name="password"
                      placeholder="Enter Password"
                      value={this.state.password}
                      onChange={(this.onChangePassword, this.formValChange)}
                      required
                    />
                    {isError.password.length > 0 && (
                      <span className="errormessage">{isError.password}</span>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">
                      Confirm Password*
                    </label>
                    <input
                      type="password"
                      className={
                        isError.confirmpassword.length > 0
                          ? "is-invalid form-control"
                          : "form-control"
                      }
                      id="confirmpassword"
                      name="confirmpassword"
                      placeholder="Confirm Password"
                      value={this.state.confirmpassword}
                      onChange={
                        (this.onChangeConfirmPassword, this.formValChange)
                      }
                      required
                    />
                    {isError.confirmpassword.length > 0 && (
                      <span className="errormessage">
                        {isError.confirmpassword}
                      </span>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">
                      Phone Number*
                    </label>
                    <input
                      type="text"
                      className={
                        isError.phone.length > 0
                          ? "is-invalid form-control"
                          : "form-control"
                      }
                      id="phone"
                      name="phone"
                      placeholder="Enter Phone Number"
                      value={this.state.phone}
                      onChange={(this.onChangePhone, this.formValChange)}
                      required
                    />
                    {isError.phone.length > 0 && (
                      <span className="errormessage">{isError.phone}</span>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="address1" className="form-label">
                      Address Line 1*
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="line1"
                      name="line1"
                      placeholder="Enter Address Line 1"
                      value={this.state.address.line1}
                      onChange={this.onChangeAddress}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="address2" className="form-label">
                      Address Line 2 (Apt, Suite or Building No.)*
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="line2"
                      name="line2"
                      placeholder="Enter Address Line 2"
                      value={this.state.address.line2}
                      onChange={this.onChangeAddress}
                      required
                    />
                  </div>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="city" className="form-label">
                        City*
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="city"
                        name="city"
                        placeholder="Enter City"
                        value={this.state.address.city}
                        onChange={this.onChangeAddress}
                        required
                      />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="state" className="form-label">
                        State*
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="state"
                        name="state"
                        placeholder="Enter State"
                        value={this.state.address.state}
                        onChange={this.onChangeAddress}
                        required
                      />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="zip" className="form-label">
                        Zip*
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="zip"
                        name="zip"
                        placeholder="Enter Zip Code"
                        value={this.state.address.zip}
                        onChange={this.onChangeAddress}
                        required
                      />
                    </div>
                  </div>
                  <br />
                  <div className="col">
                    <button
                      onClick={this.saveUser}
                      type="submit"
                      className="btn btn-primary mt-3 float-end"
                    >
                      Sign Up
                    </button>
                    <br />
                    <p className="alreadyregistered">
                      Already registered? <a href="/login">Log In</a>
                    </p>
                  </div>

                  <br></br>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <FooterHome></FooterHome>
      </div>
    );
  }
}
