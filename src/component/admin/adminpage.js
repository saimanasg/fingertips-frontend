import React, { useState, useEffect } from "react";
import FooterHome from "./footer";
import Navbar from "./navbar";
import "./adminpage.css";
import Swal from "sweetalert";
function UserApproval() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch data from API
    fetch(`${process.env.REACT_APP_BACKEND_URL}/user/getallunauth`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Data received:", data.professionals); // Log the array of users
        // Check if data.professionals is an array before setting state
        if (Array.isArray(data.professionals)) {
          setUsers(data.professionals);
        } else {
          throw new Error("Data received from API is not an array");
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleApprove = (email) => {
    // Post request to approve user
    fetch(`${process.env.REACT_APP_BACKEND_URL}/user/auth/${email}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    })
      .then((response) => {
        if (response.ok) {
          // If approval successful, update state to remove the approved user
          Swal({
            title: "Success!",
            text: "Professional Approved",
            icon: "success",
            confirmButtonText: "OK",
          });
          setUsers(users.filter((user) => user.email !== email));
        } else {
          throw new Error("Failed to approve user");
        }
      })
      .catch((error) => console.error("Error approving user:", error));
  };

  return (
    <div>
      <div className="wrapper">
        <div className="divider div-transparent"></div>
      </div>
      <br />
      <h1 style={{ textAlign: "center" }}>Unapproved Professionals</h1>

      <br />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Profession</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.email}>
              <td>
                {user.firstname} {user.lastname}
              </td>
              <td>{user.profession}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleApprove(user.email)}>
                  Approve
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <br />
      <div className="wrapper">
        <div className="divider div-transparent"></div>
      </div>
      <br />
      <br />
      <FooterHome />
    </div>
  );
}

export default UserApproval;
