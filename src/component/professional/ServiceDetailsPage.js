import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import FooterHome from "../admin/footer";
import Swal from "sweetalert";
const ServiceDetailsPage = () => {
  const { serviceId } = useParams();
  const [serviceDetails, setServiceDetails] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackRating, setFeedbackRating] = useState(0);

  const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);
  const [newNoteText, setNewNoteText] = useState("");

  useEffect(() => {
    const fetchServiceDetails = async () => {
      const user = localStorage.getItem("jwt");
      if (user) {
        const decodedToken = jwtDecode(user);
        const { email } = decodedToken;

        try {
          const response = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/user/getservicebyid/${email}/${serviceId}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch service details");
          }
          const data = await response.json();

          setServiceDetails(data);
          setSelectedStatus(data.status);

          if (data.status === "completed") {
            setFeedbackText(data.feedback_from_pro_to_cust);
            setFeedbackRating(data.pro_rating_to_cust);
            setIsFeedbackVisible(true);
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchServiceDetails();
  }, [serviceId]);

  const handleStatusChange = (event) => {
    const newStatus = event.target.value;
    setSelectedStatus(newStatus);
    if (newStatus !== "completed") {
      if (serviceDetails.status !== "completed") {
        setFeedbackText("");
        setFeedbackRating(0);
        setIsFeedbackVisible(false);
      }
    }
  };

  const handleFeedbackTextChange = (event) => {
    setFeedbackText(event.target.value);
  };

  const handleFeedbackRatingChange = (event) => {
    setFeedbackRating(Number(event.target.value));
  };

  const handleUpdateStatus = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/user/changejobstatus`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            serviceId: serviceDetails._id,
            newStatus: selectedStatus,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update status");
      } else {
        Swal({
          title: "Success!",
          text: "Status Changed",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
      const user = localStorage.getItem("jwt");
      if (user) {
        const decodedToken = jwtDecode(user);
        const { email } = decodedToken;
        const updatedServiceResponse = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/user/getservicebyid/${email}/${serviceId}`
        );
        if (!updatedServiceResponse.ok) {
          throw new Error("Failed to fetch updated service details");
        }
        const updatedServiceData = await updatedServiceResponse.json();
        setServiceDetails(updatedServiceData);
        if (updatedServiceData.status === "completed") {
          setIsFeedbackVisible(true);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePostFeedback = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/user/fbptc`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            serviceId: serviceDetails._id,
            rating: feedbackRating,
            text: feedbackText,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to post feedback");
      } else {
        Swal({
          title: "Success!",
          text: "Feedback Posted",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
      const user = localStorage.getItem("jwt");
      if (user) {
        const decodedToken = jwtDecode(user);
        const { email } = decodedToken;
        const updatedServiceResponse = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/user/getservicebyid/${email}/${serviceId}`
        );
        if (!updatedServiceResponse.ok) {
          throw new Error("Failed to fetch updated service details");
        }
        const updatedServiceData = await updatedServiceResponse.json();
        setServiceDetails(updatedServiceData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddNote = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/user/addNoteFromProfessional/${serviceDetails._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: newNoteText,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add note");
      } else {
        Swal({
          title: "Success!",
          text: "Note Added",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
      // Fetch updated service details
      const user = localStorage.getItem("jwt");
      if (user) {
        const decodedToken = jwtDecode(user);
        const { email } = decodedToken;
        const updatedServiceResponse = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/user/getservicebyid/${email}/${serviceId}`
        );
        if (!updatedServiceResponse.ok) {
          throw new Error("Failed to fetch updated service details");
        }
        const updatedServiceData = await updatedServiceResponse.json();
        setServiceDetails(updatedServiceData);
        setNewNoteText("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!serviceDetails) {
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
        <div className="row">
          <div className="col">
            <h2>Service Details</h2>
            <p>Location: {serviceDetails.location}</p>
            <p>
              Job Date: {new Date(serviceDetails.job_date).toLocaleDateString()}
            </p>
            <p>
              Deadline: {new Date(serviceDetails.deadline).toLocaleDateString()}
            </p>
            <p>Client Name: {serviceDetails.client_name}</p>
            <p>Client Email: {serviceDetails.client_email}</p>
            <p>Client Phone: {serviceDetails.client_phone}</p>
            <p>
              Status:
              <select
                value={selectedStatus}
                onChange={handleStatusChange}
                style={{ marginRight: "10px" }} // Use double curly braces for inline styles
              >
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
              <button
                onClick={handleUpdateStatus}
                style={{
                  backgroundColor: "cobaltblue",
                  padding: "5px 10px",
                  fontSize: "14px",
                  border: "none",
                  borderRadius: "3px",
                }} // Use double curly braces for inline styles
              >
                Update Status
              </button>
            </p>

            <p>Payment: {serviceDetails.payment ? "Paid" : "Unpaid"}</p>
          </div>
          <div className="col">
            {isFeedbackVisible && (
              <>
                {serviceDetails.feedback_from_cust_to_pro && (
                  <p>
                    Feedback Received:{" "}
                    {serviceDetails.feedback_from_cust_to_pro}
                  </p>
                )}
                {serviceDetails.client_rating_to_pro && (
                  <p>
                    Rating Received:{" "}
                    <div
                      className="star-rating"
                      style={{ display: "inline-block" }}
                    >
                      {[1, 2, 3, 4, 5].map((value) => (
                        <span
                          key={value}
                          className={`star ${
                            value <= serviceDetails.client_rating_to_pro
                              ? "active"
                              : ""
                          }`}
                          style={{
                            fontSize: "24px",
                            color:
                              value <= serviceDetails.client_rating_to_pro
                                ? "gold"
                                : "#ddd",
                          }}
                        >
                          &#9733;
                        </span>
                      ))}
                    </div>
                  </p>
                )}
                <p style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ marginRight: "10px" }}>
                    Give Feedback to Customer:
                  </span>
                  <input
                    type="text"
                    value={feedbackText}
                    onChange={handleFeedbackTextChange}
                    className="form-control mb-3 border-highlight-service"
                    style={{ width: "200px" }} // Adjust the width as needed
                  />
                </p>

                <div>
                  <span>Give Rating to Customer:</span>
                  <div
                    className="star-rating"
                    style={{ display: "inline-block", marginLeft: "10px" }}
                  >
                    {[1, 2, 3, 4, 5].map((value) => (
                      <span
                        key={value}
                        className={`star ${
                          value <= feedbackRating ? "active" : ""
                        }`}
                        style={{
                          fontSize: "24px",
                          color: value <= feedbackRating ? "gold" : "#ddd",
                          cursor: "pointer",
                        }}
                        onClick={() => setFeedbackRating(value)}
                      >
                        &#9733;
                      </span>
                    ))}
                  </div>
                </div>

                <input
                  type="number"
                  value={feedbackRating}
                  onChange={handleFeedbackRatingChange}
                  className="form-control mb-3 border-highlight-service"
                  hidden
                />
                <br />
                <button
                  className="btn btn-primary"
                  onClick={handlePostFeedback}
                >
                  {"Post Feedback"}
                </button>
              </>
            )}
          </div>
        </div>
        <div className="row mt-3">
          <div className="col">
            <h3>Notes:</h3>
            <ul>
              {serviceDetails.notes.map((note, index) => (
                <li key={index}>
                  {note.text} - {note.author}
                </li>
              ))}
            </ul>
            <div>
              <input
                type="text"
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                placeholder="Enter note text"
                className="form-control mb-3 border-highlight-service"
              />
              <button className="btn btn-primary" onClick={handleAddNote}>
                {"Add Note"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <br></br>
      <div className="wrapper">
        <div className="divider div-transparent"></div>
      </div>
      <FooterHome></FooterHome>
    </div>
  );
};

export default ServiceDetailsPage;
