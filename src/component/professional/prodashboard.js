import React from "react";
import { useNavigate } from "react-router-dom";
import FooterHome from "../admin/footer";

const ProfessionalDashboard = () => {
  const history = useNavigate();

  return (
    <div>
    <div>
      <h1>Professional Dashboard</h1>
      </div>
      <br></br>
    <FooterHome></FooterHome>
    </div>
  );
};

export default ProfessionalDashboard;
