import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import FooterHome from "../admin/footer";

const ProServicesPage = () => {
  const history = useNavigate();
  //const professionalEmail = match.params.professionalEmail;
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [filter, setFilter] = useState("pending");

  useEffect(() => {
    // Fetch services based on professionalEmail
    const fetchServices = async () => {
      const user = localStorage.getItem("jwt");
      if (user) {
        const decodedToken = jwtDecode(user);
        const { email } = decodedToken;

        try {
          const response = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/user/${email}/proservices`
          );
          const data = await response.json();
          setServices(data);
          filterServices(filter, data);
        } catch (error) {
          console.error("Error fetching services:", error);
        }
      }
    };

    fetchServices();
  }, []); // Make sure to pass an empty dependency array to execute the effect only once

  // const filterServices = (status, data) => {
  //   const filtered = data.filter((service) => service.status === status);
  //   setFilteredServices(filtered);
  // };

  const filterServices = (status, data) => {
    let filtered;
    if (status === "all") {
      filtered = data;
    } else {
      filtered = data.filter((service) => service.status === status);
    }
    setFilteredServices(filtered);
  };

  const handleFilterChange = (event) => {
    const status = event.target.value;
    setFilter(status);
    filterServices(status, services);
  };

  const handleViewDetails = (uniqueId) => {
    history(`/pro/service/${uniqueId}`);
  };

  return (
  <div>
    <div className="container lg-8 md-8 sm-6" style={{ backgroundColor: "#edf2f7", padding: "20px", borderRadius: "10px" }}>
      <div>
        <h2>Filter by status:</h2>
        <div className="btn-group" role="group" aria-label="Filter by status">
          <input
            type="radio"
            id="all"
            className="btn-check"
            checked={filter === "all"}
            onChange={handleFilterChange}
            value="all"
          />
          <label className="btn btn-outline-primary" htmlFor="all">All</label>

          <input
            type="radio"
            id="pending"
            className="btn-check"
            checked={filter === "pending"}
            onChange={handleFilterChange}
            value="pending"
          />
          <label className="btn btn-outline-primary" htmlFor="pending">Pending</label>

          <input
            type="radio"
            id="in_progress"
            className="btn-check"
            checked={filter === "in_progress"}
            onChange={handleFilterChange}
            value="in_progress"
          />
          <label className="btn btn-outline-primary" htmlFor="in_progress">In Progress</label>

          <input
            type="radio"
            id="completed"
            className="btn-check"
            checked={filter === "completed"}
            onChange={handleFilterChange}
            value="completed"
          />
          <label className="btn btn-outline-primary" htmlFor="completed">Completed</label>
        </div>
      </div>
      <div className="mt-3">
        {filteredServices.map((service) => (
          <div key={service._id} className="card mb-3">
            <div className="card-body">
              <p className="card-text">Service ID: {service.uniqueId}</p>
              <p className="card-text">Client Name: {service.client_name}</p>
              <p className="card-text">Job Date: {new Date(service.job_date).toLocaleDateString()}</p>
              <button className="btn btn-primary" onClick={() => handleViewDetails(service.uniqueId)}>View</button>
            </div>
          </div>
        ))}
      </div>
      </div>
      <br></br>
    <FooterHome></FooterHome>
  </div>

    // <div>
    //   <div>
    //     Filter by status:
    //     <label>
    //       <input
    //         type="radio"
    //         value="all"
    //         checked={filter === "all"}
    //         onChange={handleFilterChange}
    //       />
    //       All
    //     </label>
    //     <label>
    //       <input
    //         type="radio"
    //         value="pending"
    //         checked={filter === "pending"}
    //         onChange={handleFilterChange}
    //       />
    //       Pending
    //     </label>
    //     <label>
    //       <input
    //         type="radio"
    //         value="in_progress"
    //         checked={filter === "in_progress"}
    //         onChange={handleFilterChange}
    //       />
    //       In Progress
    //     </label>
    //     <label>
    //       <input
    //         type="radio"
    //         value="completed"
    //         checked={filter === "completed"}
    //         onChange={handleFilterChange}
    //       />
    //       Completed
    //     </label>
    //   </div>
    //   <div>
    //     {filteredServices.map((service) => (
    //       <div key={service._id} className="card">
    //         <p>Service ID: {service.uniqueId}</p>
    //         <p>Client Name: {service.client_name}</p>
    //         <p>Job Date: {new Date(service.job_date).toLocaleDateString()}</p>
    //         <button onClick={() => handleViewDetails(service.uniqueId)}>
    //           View
    //         </button>
    //       </div>
    //     ))}
    //   </div>
    // </div>
  );
};

export default ProServicesPage;
