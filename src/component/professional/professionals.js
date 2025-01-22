import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Pagination } from "react-bootstrap";
import FooterHome from "../admin/footer";

const ListProfessionals = () => {
  const history = useNavigate();
  const [professionals, setProfessionals] = useState([]);
  const [filteredProfessionals, setFilteredProfessionals] = useState([]);
  const [filter, setFilter] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6; // Number of items per page

  useEffect(() => {
    // Fetch professionals from the API
    localStorage.removeItem("procustwants");
    const fetchProfessionals = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/user/getallprofessionals`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch professionals");
        }
        const data = await response.json();
        setProfessionals(data.professionals);
        setFilteredProfessionals(data.professionals); // Set filtered professionals initially
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfessionals();
  }, []);

  const handleFilterChange = (event) => {
    const profession = event.target.value;
    setFilter(profession);
    if (profession === "all") {
      setFilteredProfessionals(professionals);
    } else {
      const filtered = professionals.filter(
        (prof) => prof.profession === profession
      );
      setFilteredProfessionals(filtered);
    }
  };

  const handleProfessionalClick = (professionalemail) => {
    localStorage.setItem("procustwants", professionalemail);
    history(`/buy`);
  };

  return (
    <div>
      <div className="wrapper">
        <div className="divider div-transparent"></div>
      </div>
      <div
        className="container mt-4"
        style={{
          backgroundColor: "#edf2f7",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <div className="text-white mb-3">
          <h3 style={{ color: "black", padding: "10px" }}>
            Filter by profession:
          </h3>
          <select
            className="form-select"
            value={filter}
            onChange={handleFilterChange}
          >
            <option value="all">All</option>
            <option value="Electrical">Electrical</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Carpentry">Carpentry</option>
            <option value="Painting">Painting</option>
            <option value="Landscaping">Landscaping</option>
          </select>
        </div>
        <div className="row">
          {filteredProfessionals.map((professional) => (
            <div key={professional._id} className="col-md-4 mb-4">
              <div
                className="card"
                style={{
                  backgroundColor: "white",
                  borderRadius: "10px",
                  padding: "10px",
                }}
              >
                <p className="card-text">
                  Name: {professional.firstname} {professional.lastname}
                </p>
                <p className="card-text">
                  Profession: {professional.profession}
                </p>
                <p>Rating:</p>
                {professional.avgrating !== 0 ? (
                  <div
                    className="star-rating"
                    style={{ display: "inline-block" }}
                  >
                    {[1, 2, 3, 4, 5].map((value) => (
                      <span
                        key={value}
                        className={`star ${
                          value <= Math.round(professional.avgrating)
                            ? "active"
                            : ""
                        }`}
                        style={{
                          fontSize: "24px",
                          color:
                            value <= Math.round(professional.avgrating)
                              ? "gold"
                              : "#ddd",
                        }}
                      >
                        &#9733;
                      </span>
                    ))}
                  </div>
                ) : (
                  <p>New to the Team</p>
                )}
                <button
                  className="btn btn-primary"
                  onClick={() => handleProfessionalClick(professional.email)}
                >
                  Select
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <br></br>
      <div className="wrapper">
        <div className="divider div-transparent"></div>
      </div>
      <FooterHome></FooterHome>
    </div>
  );

  //   return (
  //     <div>
  //       <div>
  //         Filter by profession:
  //         <select value={filter} onChange={handleFilterChange}>
  //           <option value="all">All</option>
  //           <option value="Electrical">Electrical</option>
  //           <option value="Plumbing">Plumbing</option>
  //           <option value="Carpentry">Carpentry</option>
  //           <option value="Painting">Painting</option>
  //           <option value="Landscaping">Landscaping</option>
  //         </select>
  //       </div>
  //       <div>
  //         {filteredProfessionals.map((professional) => (
  //           <div key={professional._id} className="card">
  //             <p>
  //               Name: {professional.firstname} {professional.lastname}
  //             </p>
  //             <p>Profession: {professional.profession}</p>
  //             <p>Average Rating: {professional.avgrating}</p>
  //             <button onClick={() => handleProfessionalClick(professional.email)}>
  //               Select
  //             </button>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   );
};

export default ListProfessionals;
