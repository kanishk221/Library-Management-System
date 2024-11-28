import React, { useState } from "react";
import ShowUsers from "./ShowUsers";

const UserForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const serverUrl = "/api/users";

      const response = await fetch(serverUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, phone, age }),
      });
      if (response.ok) {
        // Show success message or perform other actions upon successful submission
        setName("");
        setEmail("");
        setPhone("");
        setAge("");
        alert("User added successfully!");
        console.log("User data saved successfully!");
      } else {
        throw new Error("Failed to save user data");
      }
    } catch (error) {
      console.error("Error saving user data:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-lg rounded">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">User Registration</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={name}
                      placeholder="Enter your name"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      placeholder="Enter your email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">
                      Phone
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="phone"
                      value={phone}
                      placeholder="Phone number"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="age" className="form-label">
                      Age
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="age"
                      value={age}
                      placeholder="Enter your age"
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </div>

                  <div className="button-center">
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ShowUsers />
    </>
  );
};

export default UserForm;
