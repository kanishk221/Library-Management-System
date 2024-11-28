import React, { useState, useEffect } from "react";

const Recentissue = () => {
  const [recentIssues, setRecentIssues] = useState([]);

  useEffect(() => {
    // Fetch recent issues data from the server
    fetch("/api/recentissue")
      .then((response) => response.json())
      .then((data) => setRecentIssues(data))
      .catch((error) => console.error("Error fetching recent issues:", error));
  }, []);

  // Function to format the issue date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Returns the date part in the format MM/DD/YYYY
  };

  return (
    // <div className="container mt-4">
    <table className="table">
      <thead className="thead-dark">
        <tr>
          <th style={{ color: "#3498db" }}>Serial No</th>
          <th style={{ color: "#3498db" }}>Issue Date</th>
          <th style={{ color: "#3498db" }}>Book ID</th>
          <th style={{ color: "#3498db" }}>Title</th>
          <th style={{ color: "#3498db" }}>Issued By</th>
        </tr>
      </thead>
      <tbody>
        {recentIssues.map((issue, index) => (
          <tr key={issue.id}>
            <td>{index + 1}</td>
            <td>{formatDate(issue.issueDate)}</td>
            <td>{issue.bookId}</td>
            <td>{issue.title}</td> {/* Add title column */}
            <td>{issue.userName}</td> {/* Add username column */}
          </tr>
        ))}
      </tbody>
    </table>
    // </div>
  );
};

export default Recentissue;
