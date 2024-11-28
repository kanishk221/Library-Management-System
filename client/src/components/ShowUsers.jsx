import React, { useState, useEffect } from "react";

const ShowUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch user data from the server
    fetch("/api/showusers")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return (
    <div
      className="container mt-4"
      style={{
        border: "1.5px solid #3498db",
        padding: "2rem",
        borderRadius: "10px",
      }}
    >
      <h2>Recent Registered Users</h2>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th style={{ color: "#3498db" }}>User ID</th>
            <th style={{ color: "#3498db" }}>Name</th>
            <th style={{ color: "#3498db" }}>Email</th>
            <th style={{ color: "#3498db" }}>Phone</th>
            <th style={{ color: "#3498db" }}>Age</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowUsers;
