import React, { useState } from "react";

function Issuebook() {
  const [bookId, setBookId] = useState("");
  const [userId, setUserId] = useState("");
  const [issueDate, setIssueDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  // for removing warnings
  var r = false;
  if (r) {
    setIssueDate(issueDate);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const serverUrl = "/api/issuebook";

      const response = await fetch(serverUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookId, userId, issueDate }),
      });

      // Parse the JSON response
      const data = await response.json();

      if (response.ok) {
        setBookId("");
        setUserId("");
        alert("Book issued successfully!");
        console.log("Book issued successfully!");
      } else {
        // If response status is not ok, throw an error with the message from the server
        throw new Error(data.error || "Failed to issue the book");
      }
    } catch (error) {
      console.error("Error issuing the book:", error);
      // Handle error (e.g., show error message to user)
      alert(error.message || "An error occurred");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 add-new-book">
          <h1 className="mt-5 mb-4 form-heading">Issue Book</h1>
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
            <div className="mb-3">
              <label htmlFor="issueDate" className="form-label">
                Issue Date
              </label>
              <input
                type="text"
                className="form-control"
                id="issueDate"
                value={issueDate} // Display today's date
                readOnly // Make it read-only
              />
            </div>
            <div className="button-center">
              <button type="submit" className="btn btn-primary">
                Issue Book
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Issuebook;
