
import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Recentissue from "./Recentissue";
import ShowBooks from "./ShowBooks"; // Import the Showbooks component

const Dashboard = () => {
  const [showBooks, setShowBooks] = useState(false); // State to track whether to show Showbooks component

  // Function to toggle the visibility of the Showbooks component
  const toggleShowBooks = () => {
    setShowBooks(!showBooks);
  };

  return (
    <>
      <div className="dashboard-container">
        <div className="dashboard-main">
          <header style={headerStyle}>
            <h2 style={{ color: "#3498db" }}>Library</h2>
          </header>
          <div style={sectionStyle}>
            <nav style={navStyle}>
              <div className="side-nav-item">
                <Link className="link" to="/">
                  Dashboard
                </Link>
              </div>
              <div className="side-nav-item">
                <Link className="link" to="/add-book">
                  Add Book
                </Link>
              </div>
              <div className="side-nav-item">
                <Link className="link" to="/issue-book">
                  Issue Book
                </Link>
              </div>
              <div className="side-nav-item">
                <Link className="link" to="/return-book">
                  Return Book
                </Link>
              </div>
              <div className="side-nav-item">
                <Link className="link" to="/users">
                  Users
                </Link>
              </div>
            </nav>

            <article style={articleStyle}>
              <div className="available">
                <div className="show-avail-book" onClick={toggleShowBooks}>
                  {" "}
                  {/* Toggle the visibility of Showbooks component */}
                  {showBooks ? (
                    <>
                      <h3>See Below!!</h3>
                      <h5>Click Again to close</h5>
                    </>
                  ) : (
                    <>
                      <h1>1013</h1> <h3>Available book</h3>
                    </>
                  )}
                </div>
                <div className="show-issued-book">
                  <h1>106</h1>
                  <h3>Issued Books</h3>
                </div>
              </div>
              <div className="recent-issued">
                Recent issued books
                <Recentissue />
              </div>
            </article>
          </div>
        </div>
      </div>
      <footer style={footerStyle}>{showBooks && <ShowBooks />} </footer>
    </>
  );
};

// Inline styles
const headerStyle = {
  padding: "10px",
  fontSize: "35px",
  border: "1.5px solid #3498db",
  borderRadius: "10px",
};

const sectionStyle = {
  display: "flex",
  marginTop: "2rem",
  alignItems: "stretch",
  border: "1.5px solid #3498db",
  borderRadius: "10px",
};

const navStyle = {
  flex: "15%",
  borderRight: "1.5px solid #3498db",

  //   borderRadius: "10px",
};

const articleStyle = {
  flex: "75%",
  padding: "20px",
};

const footerStyle = {
  padding: "10px",
  textAlign: "center",
};

export default Dashboard;
