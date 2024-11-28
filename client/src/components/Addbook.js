import React, { useState } from "react";
import ShowBooks from "./ShowBooks";

function Addbook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [count, setCount] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const serverUrl = "/api/addbooks";

      const response = await fetch(serverUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, author, category, count }),
      });
      if (response.ok) {
        // Show success message or perform other actions upon successful submission
        setTitle("");
        setAuthor("");
        setCategory("");
        setCount(0);
        alert("Book added successfully!");
        console.log("Book added successfully!");
      } else {
        throw new Error("Failed to add the book");
      }
    } catch (error) {
      console.error("Error adding the book:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 add-new-book">
            <h1 className="mt-5 mb-4 form-heading">Add New Book</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title *
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  placeholder="Enter title"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="author" className="form-label">
                  Author *
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="author"
                  placeholder="Enter author"
                  required
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </div>
              {/* <div className="mb-3">
              <label htmlFor="category" className="form-label">
                Category *
              </label>
              <input
                type="text"
                className="form-control"
                id="category"
                placeholder="Enter category"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div> */}
              <div className="mb-3">
                <label htmlFor="category" className="form-label">
                  Category *
                </label>
                <select
                  className="form-select"
                  id="category"
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select category</option>
                  <option value="Fiction">Fiction</option>
                  <option value="Fantasy">Fantasy</option>
                  <option value="Mystery">Mystery</option>
                  <option value="Romance">Romance</option>
                  <option value="Thriller">Thriller</option>
                  <option value="Science Fiction">Science Fiction</option>
                  <option value="Biography">Biography</option>
                  <option value="History">History</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="count" className="form-label">
                  Count *
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="count"
                  placeholder="Enter count"
                  required
                  value={count}
                  onChange={(e) => setCount(e.target.value)}
                />
              </div>
              <div className="button-center">
                <button type="submit" className="btn btn-primary">
                  Add Book
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ShowBooks />
    </>
  );
}

export default Addbook;
