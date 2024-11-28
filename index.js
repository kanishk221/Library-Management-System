const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const {
  pool,
  connectToDatabase,
  addUser,
  addBook,
  createBooksTable,
  createIssueBooksTable,
  createUsersTable,
  issueBook,
  returnBook,
} = require("./db"); 

const app = express();
app.use(cors());

// Middleware
app.use(bodyParser.json());
// Use the client app
app.use(express.static(path.join(__dirname, "client", "build")));

// Render client for any path

connectToDatabase((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }

  // Create tables if they don't exist
  createBooksTable((err) => {
    if (err) {
      console.error("Error creating books table:", err);
      return;
    }
    console.log("Books table created successfully");
  });

  createIssueBooksTable((err) => {
    if (err) {
      console.error("Error creating issue_books table:", err);
      return;
    }
    console.log("Issue_books table created successfully");
  });

  createUsersTable((err) => {
    if (err) {
      console.error("Error creating users table:", err);
      return;
    }
    console.log("Users table created successfully");
  });

  // Routes
  app.post("/api/users", (req, res) => {
    const { name, email, phone, age } = req.body;
    addUser(name, email, phone, age, (err, result) => {
      if (err) {
        console.error("Error inserting user:", err);
        res.status(500).json({ message: "Internal server error" });
        return;
      }
      console.log("User inserted:", result);
      res.status(201).json({ message: "User created successfully" });
    });
  });

  app.post("/api/addbooks", (req, res) => {
    const { title, author, category, count } = req.body;
    addBook(title, author, category, count, (err, result) => {
      if (err) {
        console.error("Error adding book:", err);
        res.status(500).json({ message: "Internal server error" });
        return;
      }
      console.log("Book added:", result);
      res.status(201).json({ message: "Book added successfully" });
    });
  });

  app.post("/api/issuebook", (req, res) => {
    const { bookId, userId, issueDate } = req.body;

    issueBook(bookId, userId, issueDate, (err, result) => {
      if (err) {
        console.error("Error issuing book:", err);
        // Determine the specific error message to send back to the client
        let errorMessage;
        if (err === "Book does not exist or is not available") {
          errorMessage =
            "The requested book does not exist or is not available.";
        } else if (err === "User does not exist") {
          errorMessage = "The user does not exist.";
        } else if (err === "Book is already issued to this user") {
          errorMessage = "The book is already issued to this user.";
        } else {
          errorMessage = "Internal server error.";
        }
        res.status(500).json({ error: errorMessage });
        return;
      }
      console.log("Book issued:", result);
      res.status(201).json({ message: "Book issued successfully" });
    });
  });

  app.post("/api/returnbook", (req, res) => {
    const { bookId, userId } = req.body;

    returnBook(bookId, userId, (err, result) => {
      if (err) {
        console.error("Error returning book:", err);
        // Determine the specific error message to send back to the client
        let errorMessage;
        if (err === "Book is not issued to this user") {
          errorMessage = "The book is not issued to this user.";
        } else {
          errorMessage = "Internal server error.";
        }
        res.status(500).json({ error: errorMessage });
        return;
      }
      console.log("Book returned:", result);
      res.status(200).json({ message: result });
    });
  });

  app.get("/api/recentissue", (req, res) => {
    console.log(req);
    const query = `
      SELECT 
        issue_books.issueDate,
        issue_books.bookId,
        books.title,
        issue_books.userId,
        users.name AS userName
      FROM 
        issue_books
      INNER JOIN 
        books ON issue_books.bookId = books.id
      INNER JOIN 
        users ON issue_books.userId = users.id
      ORDER BY 
        issue_books.id DESC 
      LIMIT 
        5`; // Query to retrieve recent issues with book title and user name
    pool.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching recent issues:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      console.log(results);
      res.json(results); // Send the recent issues data as JSON response
    });
  });

  app.get("/api/showusers", (req, res) => {
    const query = "SELECT * FROM users ORDER BY id DESC LIMIT 10";
    pool.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      res.json(results); // Send the users data as JSON response
    });
  });
  app.get("/api/showbooks", (req, res) => {
    const query = "SELECT * FROM books WHERE count != 0";
    pool.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching books:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      res.json(results); // Send the books data as JSON response
    });
  });
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
  // Port
  const PORT = process.env.PORT || 5000;

  // Start server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
