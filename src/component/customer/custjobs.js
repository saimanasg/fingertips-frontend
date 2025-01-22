import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import FooterHome from "../admin/footer";

const CustServicesPage = () => {
  const history = useNavigate();
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [filter, setFilter] = useState("pending");

  useEffect(() => {
    localStorage.removeItem("procustwants");
    // Fetch services based on customer email
    const fetchServices = async () => {
      const user = localStorage.getItem("jwt");
      if (user) {
        const decodedToken = jwtDecode(user);
        const { email } = decodedToken;
        try {
          const response = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/user/${email}/custservices`
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
  }, []); // Fetch services on component mount

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
    history(`/cust/service/${uniqueId}`);
  };

  return (
    <div>
  <div className="container lg-8 md-8 sm-6" style={{ backgroundColor: "#edf2f7", padding: "20px", borderRadius: "10px" }}>
    <div>
      <h3>Filter by status:</h3>
      <div className="row row-cols-2 row-cols-md-4">
        <div className="col mb-3">
          <label className="form-check">
            <input
              type="radio"
              value="all"
              checked={filter === "all"}
              onChange={handleFilterChange}
              className="form-check-input"
            />
            All
          </label>
        </div>
        <div className="col mb-3">
          <label className="form-check">
            <input
              type="radio"
              value="pending"
              checked={filter === "pending"}
              onChange={handleFilterChange}
              className="form-check-input"
            />
            Pending
          </label>
        </div>
        <div className="col mb-3">
          <label className="form-check">
            <input
              type="radio"
              value="in_progress"
              checked={filter === "in_progress"}
              onChange={handleFilterChange}
              className="form-check-input"
            />
            In Progress
          </label>
        </div>
        <div className="col mb-3">
          <label className="form-check">
            <input
              type="radio"
              value="completed"
              checked={filter === "completed"}
              onChange={handleFilterChange}
              className="form-check-input"
            />
            Completed
          </label>
        </div>
      </div>
    </div>
    <div className="mt-4">
      {filteredServices.map((service) => (
        <div key={service._id} className="card mb-3">
          <div className="card-body">
            <p className="card-text">Service ID: {service.uniqueId}</p>
            <p className="card-text">Professional Name: {service.professional_name}</p>
            <p className="card-text">Job Date: {new Date(service.job_date).toLocaleDateString()}</p>
            <button className="btn btn-primary" onClick={() => handleViewDetails(service.uniqueId)}>
              View
            </button>
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
    //         <p>Professional Name: {service.professional_name}</p>
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

export default CustServicesPage;
