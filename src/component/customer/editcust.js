import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import FooterHome from "../admin/footer";
import Swal from "sweetalert";
const EditCustomerPage = () => {
  const [customer, setCustomer] = useState(null);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    password: "",
    phonenum: "",
    address: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      zip: "",
    },
  });

  useEffect(() => {
    const fetchCustomer = async () => {
      const user = localStorage.getItem("jwt");
      if (user) {
        const decodedToken = jwtDecode(user);
        const { email } = decodedToken;
        try {
          const response = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/user/getcustomerbyemail/${email}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch customer details");
          }
          const data = await response.json();
          setCustomer(data.customer);
        } catch (error) {
          console.error("Error fetching customer details:", error);
        }
      }
    };

    fetchCustomer();
  }, []);

  useEffect(() => {
    if (customer) {
      setFormData({
        firstname: customer.firstname,
        lastname: customer.lastname,
        password: customer.password,
        phonenum: customer.phonenum,
        address: customer.address,
      });
    }
  }, [customer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      address: {
        ...prevData.address,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = localStorage.getItem("jwt");
      if (user) {
        const decodedToken = jwtDecode(user);
        const { email } = decodedToken;
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/user/editcustomer/${email}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to update customer details");
        } else {
          Swal({
            title: "Success!",

            icon: "success",
            confirmButtonText: "OK",
          });
        }
        console.log("customer details updated successfully");
      }
    } catch (error) {
      console.error("Error updating customer details:", error);
    }
  };

  if (!customer) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="wrapper">
        <div className="divider div-transparent"></div>
      </div>
      <div
        className="container lg-8 md-8 sm-6"
        style={{
          backgroundColor: "#edf2f7",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <h2>Edit Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="firstname" className="form-label">
              First Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="firstname"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastname" className="form-label">
              Last Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phonenum" className="form-label">
              Phone Number:
            </label>
            <input
              type="text"
              className="form-control"
              id="phonenum"
              name="phonenum"
              value={formData.phonenum}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="line1" className="form-label">
              Address Line 1:
            </label>
            <input
              type="text"
              className="form-control"
              id="line1"
              name="line1"
              value={formData.address.line1}
              onChange={handleAddressChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="line2" className="form-label">
              Address Line 2:
            </label>
            <input
              type="text"
              className="form-control"
              id="line2"
              name="line2"
              value={formData.address.line2}
              onChange={handleAddressChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="city" className="form-label">
              City:
            </label>
            <input
              type="text"
              className="form-control"
              id="city"
              name="city"
              value={formData.address.city}
              onChange={handleAddressChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="state" className="form-label">
              State:
            </label>
            <input
              type="text"
              className="form-control"
              id="state"
              name="state"
              value={formData.address.state}
              onChange={handleAddressChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="zip" className="form-label">
              Zip:
            </label>
            <input
              type="text"
              className="form-control"
              id="zip"
              name="zip"
              value={formData.address.zip}
              onChange={handleAddressChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Update Details
          </button>
        </form>
      </div>
      <br></br>
      <div className="wrapper">
        <div className="divider div-transparent"></div>
      </div>
      <FooterHome></FooterHome>
    </div>

    // <div>
    //   <h2>Edit customer Details</h2>
    //   <form onSubmit={handleSubmit}>
    //     <label>
    //       First Name:
    //       <input
    //         type="text"
    //         name="firstname"
    //         value={formData.firstname}
    //         onChange={handleChange}
    //       />
    //     </label>
    //     <br />
    //     <label>
    //       Last Name:
    //       <input
    //         type="text"
    //         name="lastname"
    //         value={formData.lastname}
    //         onChange={handleChange}
    //       />
    //     </label>
    //     <br />

    //     <br />
    //     <label>
    //       Phone Number:
    //       <input
    //         type="text"
    //         name="phonenum"
    //         value={formData.phonenum}
    //         onChange={handleChange}
    //       />
    //     </label>
    //     <br />
    //     <label>
    //       Address Line 1:
    //       <input
    //         type="text"
    //         name="line1"
    //         value={formData.address.line1}
    //         onChange={handleAddressChange}
    //       />
    //     </label>
    //     <br />
    //     <label>
    //       Address Line 2:
    //       <input
    //         type="text"
    //         name="line2"
    //         value={formData.address.line2}
    //         onChange={handleAddressChange}
    //       />
    //     </label>
    //     <br />
    //     <label>
    //       City:
    //       <input
    //         type="text"
    //         name="city"
    //         value={formData.address.city}
    //         onChange={handleAddressChange}
    //       />
    //     </label>
    //     <br />
    //     <label>
    //       State:
    //       <input
    //         type="text"
    //         name="state"
    //         value={formData.address.state}
    //         onChange={handleAddressChange}
    //       />
    //     </label>
    //     <br />
    //     <label>
    //       Zip:
    //       <input
    //         type="text"
    //         name="zip"
    //         value={formData.address.zip}
    //         onChange={handleAddressChange}
    //       />
    //     </label>
    //     <br />
    //     <button type="submit">Update Details</button>
    //   </form>
    // </div>
  );
};

export default EditCustomerPage;
