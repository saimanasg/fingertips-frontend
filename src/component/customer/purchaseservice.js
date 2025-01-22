import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { jwtDecode } from "jwt-decode";
import FooterHome from "../admin/footer";

const PurchaseServiceForm = () => {
  const user = localStorage.getItem("jwt");

  const decodedToken = jwtDecode(user);
  const { email } = decodedToken;

  const [formData, setFormData] = useState({
    customerEmail: email,
    professionalEmail: "",
    jobType: "",
    description: "",
    location: "",
    jobDate: "",
    deadline: "",
    payment: true,
  });

  const [showPaypal, setShowPaypal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderID, setOrderID] = useState("");

  useEffect(() => {
    const emailFromLocalStorage = localStorage.getItem("procustwants");
    if (emailFromLocalStorage) {
      // Fetch professional details if email is present in localStorage
      fetchProfessionalDetails(emailFromLocalStorage);
    }
  }, []);

  const fetchProfessionalDetails = async (email) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/user/getprobyemail/${email}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch professional details");
      }
      const data = await response.json();
      // Prepopulate jobType and professionalEmail from fetched details

      setFormData((prevFormData) => ({
        ...prevFormData,
        professionalEmail: data.professional.email,
        jobType: data.professional.profession,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePaypalSuccess = (orderID) => {
    setSuccess(true);
    setOrderID(orderID);
  };

  const handlePaypalError = (error) => {
    console.error("PayPal error:", error);
    // Additional error handling
  };

  useEffect(() => {
    const runApi = async () => {
      if (success) {
        try {
          if (!formData.professionalEmail) {
            formData.professionalEmail = "notgiven@gmail.com";
          }
          console.log(formData);
          const response = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/user/purchaseservice`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            }
          );

          if (response.ok) {
            const responseData = await response.json();
            console.log("Response data:", responseData);
            console.log("Payment successful, API call successful!");

            if (localStorage.getItem("procustwants")) {
              localStorage.removeItem("procustwants");
            }
            window.location.href = `/cust/service/${responseData.uniqueid}`;
          } else {
            console.error("API call failed!");
            // Handle API call failure
          }
        } catch (error) {
          console.error("Error occurred while making the API call:", error);
          // Handle error
        }
      }
    };

    runApi();
  }, [success, formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPaypal(true);
  };

  return (
    <div>
    <div className="container lg-9 md-8 sm-6" style={{ backgroundColor: "#edf2f7", padding: "20px", borderRadius: "10px" }}>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="jobType" className="form-label">Job Type:</label>
          <select
            className="form-select"
            name="jobType"
            id="jobType"
            value={formData.jobType}
            onChange={handleChange}
            required
          >
            <option value="">Select Job Type</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Electrical">Electrical</option>
            <option value="Carpentry">Carpentry</option>
            <option value="Painting">Painting</option>
            <option value="Landscaping">Landscaping</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description:</label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="location" className="form-label">Location:</label>
          <input
            type="text"
            className="form-control"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="jobDate" className="form-label">Job Date:</label>
          <input
            type="date"
            className="form-control"
            id="jobDate"
            name="jobDate"
            value={formData.jobDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="deadline" className="form-label">Deadline:</label>
          <input
            type="date"
            className="form-control"
            id="deadline"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Purchase Service</button>
      </form>
      {showPaypal && (
        <PayPalScriptProvider
          options={{
            "client-id":
              "AQXI9MZMC1ElMmvzMHqRFHFQdjLvwhIyqivFc7SIzYuPoZN93gbjzmaR1CJn0pDpn0vuqw6A-mtPc0-6",
          }}
        >
          <div>
            <PayPalButtons
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        currency_code: "USD",
                        value: "100", // Amount can be dynamic or static based on your requirement
                      },
                    },
                  ],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then((details) => {
                  handlePaypalSuccess(details.id);
                });
              }}
              onError={(err) => {
                handlePaypalError(err);
              }}
            />
          </div>
        </PayPalScriptProvider>
      )}
      </div>
      <br></br>
    <FooterHome></FooterHome>
    </div>
  );
};

export default PurchaseServiceForm;
