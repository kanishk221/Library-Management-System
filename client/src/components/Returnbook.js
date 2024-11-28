import React, { useState } from "react";

function Returnbook() {
  const [bookId, setBookId] = useState("");
  const [userId, setUserId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const serverUrl = "/api/returnbook";

      const response = await fetch(serverUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookId, userId }),
      });
      const data = await response.json(); // Parse the JSON response

      if (response.ok) {
        // Show success message or perform other actions upon successful submission
        setBookId("");
        setUserId("");
        alert(data.message || "Book returned successfully!"); // Display message from server if available
        console.log("Book returned successfully!");
      } else {
        // If response status is not ok, throw an error with the message from the server
        throw new Error(data.error || "Failed to return the book");
      }
    } catch (error) {
      console.error("Error returning the book:", error);
      // Handle error (e.g., show error message to user)
      alert(error.message || "An error occurred");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 add-new-book">
          <h1 className="mt-5 mb-4 form-heading">Return Book</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Book Id *
              </label>
              <input
                type="text"
                className="form-control"
                id="bookid"
                placeholder="Enter book id"
                required
                value={bookId}
                onChange={(e) => setBookId(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                User Id *
              </label>
              <input
                type="text"
                className="form-control"
                id="userid"
                placeholder="Enter user id"
                required
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </div>
            <div className="button-center">
              <button type="submit" className="btn btn-primary">
                Return Book
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Returnbook;
