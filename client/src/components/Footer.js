import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const style = {
    backgroundImage: "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)",
  };
  return (
    <footer className=" text-dark text-center py-1" style={style}>
      <div className="container" style={{ margin: "20px" }}>
        <div className="row">
          <div className="col-md-6">
            <h5>Contact Us</h5>
            <p>Email: kanishkkm820@gmail.com</p>
            <p>Phone: +919437484083</p>
          </div>
          <div className="col-md-6">
            <h5>Follow Us</h5>
            <ul className="list-inline">
              <li className="list-inline-item">
                <Link to="#" className="text-dark">
                  <i
                    className="fab fa-facebook-square"
                    style={{ color: "#3b5998" }}
                  ></i>
                </Link>
              </li>
              <li className="list-inline-item">
                <Link to="#" className="text-dark">
                  <i
                    className="fab fa-twitter-square"
                    style={{ color: "#1da1f2" }}
                  ></i>
                </Link>
              </li>
              <li className="list-inline-item">
                <Link to="#" className="text-dark">
                  <i
                    className="fab fa-instagram-square"
                    style={{ color: "#c13584" }}
                  ></i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <p className="mb-0">
              © 2024 Library Management System. All Rights Reserved.
            </p>
            <p>Design by @kanishkkm820</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
