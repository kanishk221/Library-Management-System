import React, { useState, useEffect } from "react";

const ShowBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch book data from the server
    fetch("/api/showbooks")
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Error fetching books:", error));
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
      <h2>Available Books</h2>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th style={{ color: "#3498db" }}>Book ID</th>
            <th style={{ color: "#3498db" }}>Title</th>
            <th style={{ color: "#3498db" }}>Author</th>
            <th style={{ color: "#3498db" }}>Category</th>
            <th style={{ color: "#3498db" }}>Count</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.category}</td>
              <td>{book.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowBooks;
