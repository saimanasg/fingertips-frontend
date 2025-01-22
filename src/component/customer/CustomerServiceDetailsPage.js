import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import FooterHome from "../admin/footer";
import Swal from "sweetalert";
const CustomerServiceDetailsPage = () => {
  const { serviceId } = useParams();
  const [serviceDetails, setServiceDetails] = useState(null);

  const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);
  const [newNoteText, setNewNoteText] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackRating, setFeedbackRating] = useState(0);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      const user = localStorage.getItem("jwt");
      if (user) {
        const decodedToken = jwtDecode(user);
        const { email } = decodedToken;

        try {
          const response = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/user/getcustservicebyid/${email}/${serviceId}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch service details");
          }
          const data = await response.json();
          setServiceDetails(data);
          if (data.status === "completed") {
            setFeedbackText(data.feedback_from_cust_to_pro);
            setFeedbackRating(data.client_rating_to_pro);
            setIsFeedbackVisible(true);
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchServiceDetails();
  }, [serviceId]);
  const handleFeedbackTextChange = (event) => {
    setFeedbackText(event.target.value);
  };

  const handleFeedbackRatingChange = (event) => {
    setFeedbackRating(Number(event.target.value));
  };

  const handlePostFeedback = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/user/fbctp`,
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
          `${process.env.REACT_APP_BACKEND_URL}/user/getcustservicebyid/${email}/${serviceId}`
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
        `${process.env.REACT_APP_BACKEND_URL}/user/addNoteFromCustomer/${serviceDetails._id}`,
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
          text: "Note added",
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
          `${process.env.REACT_APP_BACKEND_URL}/user/getcustservicebyid/${email}/${serviceId}`
        );
        if (!updatedServiceResponse.ok) {
          throw new Error("Failed to fetch updated service details");
        }
        const updatedServiceData = await updatedServiceResponse.json();
        console.log(updatedServiceData);
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
        <div>
          <h2>Service Details</h2>
          <p>Location: {serviceDetails.location}</p>
          <p>
            Job Date: {new Date(serviceDetails.job_date).toLocaleDateString()}
          </p>
          <p>
            Deadline: {new Date(serviceDetails.deadline).toLocaleDateString()}
          </p>
          <p>Status: {serviceDetails.status}</p>
          <p>Payment: {serviceDetails.payment ? "Paid" : "Unpaid"}</p>
          <p>Professional Name: {serviceDetails.professional_name}</p>
          <p>Professional Phone: {serviceDetails.professional_phone}</p>
          <p>Professional Email: {serviceDetails.professional_email}</p>
          {isFeedbackVisible && (
            <>
              {serviceDetails.feedback_from_pro_to_cust && (
                <p>
                  Feedback Received: {serviceDetails.feedback_from_pro_to_cust}
                </p>
              )}
              {serviceDetails.pro_rating_to_cust && (
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
                          value <= serviceDetails.pro_rating_to_cust
                            ? "active"
                            : ""
                        }`}
                        style={{
                          fontSize: "24px",
                          color:
                            value <= serviceDetails.pro_rating_to_cust
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
              <p>
                Give Feedback to Professional:
                <input
                  type="text"
                  value={feedbackText}
                  onChange={handleFeedbackTextChange}
                />
              </p>
              <div>
                <span>Give Rating to Professional:</span>
                <div
                  className="star-rating"
                  style={{ display: "inline-block" }}
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
              <button className="btn btn-primary" onClick={handlePostFeedback}>
                {"Post Feedback"}
              </button>
            </>
          )}
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
              Add Note
            </button>
          </div>
        </div>
      </div>
      <br></br>
      <div className="wrapper">
        <div className="divider div-transparent"></div>
      </div>
      <FooterHome></FooterHome>
    </div>

    // <div>
    //   <h2>Service Details</h2>
    //   <p>Location: {serviceDetails.location}</p>
    //   <p>Job Date: {new Date(serviceDetails.job_date).toLocaleDateString()}</p>
    //   <p>Deadline: {new Date(serviceDetails.deadline).toLocaleDateString()}</p>
    //   <p>Status: {serviceDetails.status}</p>
    //   <p>Payment: {serviceDetails.payment ? "Paid" : "Unpaid"}</p>
    //   <p>Professional Name: {serviceDetails.professional_name}</p>
    //   <p>Professional Phone: {serviceDetails.professional_phone}</p>
    //   <p>Professional Email: {serviceDetails.professional_email}</p>
    //   {isFeedbackVisible && (
    //     <>
    //       {serviceDetails.feedback_from_pro_to_cust && (
    //         <p>
    //           Feedback from Professional to Customer:{" "}
    //           {serviceDetails.feedback_from_pro_to_cust}
    //         </p>
    //       )}
    //       {serviceDetails.pro_rating_to_cust && (
    //         <p>
    //           Professional Rating to Customer:{" "}
    //           {serviceDetails.pro_rating_to_cust}
    //         </p>
    //       )}
    //       <p>
    //         Feedback from Customer to Professional:
    //         <input
    //           type="text"
    //           value={feedbackText}
    //           onChange={handleFeedbackTextChange}
    //         />
    //       </p>
    //       <p>
    //         Customer Rating to Professional:
    //         <input
    //           type="number"
    //           value={feedbackRating}
    //           onChange={handleFeedbackRatingChange}
    //         />
    //       </p>
    //       <button onClick={handlePostFeedback}>{"Post Feedback"}</button>
    //     </>
    //   )}
    //   <h3>Notes:</h3>
    //   <ul>
    //     {serviceDetails.notes.map((note, index) => (
    //       <li key={index}>
    //         {note.text} - {note.author}
    //       </li>
    //     ))}
    //   </ul>
    //   <div>
    //     <input
    //       type="text"
    //       value={newNoteText}
    //       onChange={(e) => setNewNoteText(e.target.value)}
    //       placeholder="Enter note text"
    //     />
    //     <button onClick={handleAddNote}>{"Add Note"}</button>
    //   </div>
    // </div>
  );
};

export default CustomerServiceDetailsPage;
