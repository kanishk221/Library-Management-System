// const mysql = require("mysql2");
// require("dotenv").config();

// const pool = mysql.createPool({
//   connectionLimit: 10,
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

// // Function to establish database connection
// function connectToDatabase(callback) {
//   pool.getConnection((err, connection) => {
//     if (err) {
//       console.error("Error connecting to database:", err);
//       return callback(err);
//     }
//     console.log("Connected to database");
//     // Release the connection when done
//     connection.release();
//     return callback(null);
//   });
// }

// // Create books table if it doesn't exist
// function createBooksTable(callback) {
//   const sql = `
//     CREATE TABLE IF NOT EXISTS books (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       title VARCHAR(255) NOT NULL,
//       author VARCHAR(255) NOT NULL,
//       category VARCHAR(255) NOT NULL,
//       count INT NOT NULL
//     )
//   `;
//   pool.query(sql, (err, result) => {
//     if (err) {
//       console.error("Error creating books table:", err);
//       return callback(err);
//     }
//     // console.log("Books table created successfully:", result);
//     return callback(null);
//   });
// }

// // Create issue_books table if it doesn't exist
// function createIssueBooksTable(callback) {
//   const sql = `
//     CREATE TABLE IF NOT EXISTS issue_books (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       bookId INT NOT NULL,
//       userId INT NOT NULL,
//       issueDate DATE NOT NULL,
//       FOREIGN KEY (bookId) REFERENCES books(id),
//       FOREIGN KEY (userId) REFERENCES users(id)
//     )
//   `;
//   pool.query(sql, (err, result) => {
//     if (err) {
//       console.error("Error creating issue_books table:", err);
//       return callback(err);
//     }
//     // console.log("Issue_books table created successfully:", result);
//     return callback(null);
//   });
// }

// // Create users table if it doesn't exist
// function createUsersTable(callback) {
//   const sql = `
//     CREATE TABLE IF NOT EXISTS users (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       name VARCHAR(255) NOT NULL,
//       email VARCHAR(255) NOT NULL,
//       phone VARCHAR(20) NOT NULL,
//       age INT NOT NULL
//     )
//   `;
//   pool.query(sql, (err, result) => {
//     if (err) {
//       console.error("Error creating users table:", err);
//       return callback(err);
//     }
//     // console.log("Users table created successfully:", result);
//     return callback(null);
//   });
// }

// // Add user to the database
// function addUser(name, email, phone, age, callback) {
//   pool.query(
//     "INSERT INTO users (name, email, phone, age) VALUES (?, ?, ?, ?)",
//     [name, email, phone, age],
//     (err, results) => {
//       if (err) {
//         return callback(err);
//       }
//       return callback(null, results);
//     }
//   );
// }

// // Add book to the database
// function addBook(title, author, category, count, callback) {
//   pool.query(
//     "INSERT INTO books (title, author, category, count) VALUES (?, ?, ?, ?)",
//     [title, author, category, count],
//     (err, results) => {
//       if (err) {
//         return callback(err);
//       }
//       return callback(null, results);
//     }
//   );
// }

// function issueBook(bookId, userId, issueDate, callback) {
//   // Check if the book exists and its count is greater than zero
//   const checkBookQuery = "SELECT * FROM books WHERE id = ? AND count > 0";
//   pool.query(checkBookQuery, [bookId], (err, bookResult) => {
//     if (err) {
//       return callback(err);
//     }
//     if (bookResult.length === 0) {
//       return callback("Book does not exist or is not available");
//     }

//     // Check if the user exists
//     const checkUserQuery = "SELECT * FROM users WHERE id = ?";
//     pool.query(checkUserQuery, [userId], (err, userResult) => {
//       if (err) {
//         return callback(err);
//       }
//       if (userResult.length === 0) {
//         return callback("User does not exist");
//       }

//       // Check if the book is already issued to the user
//       const checkIssueQuery =
//         "SELECT * FROM issue_books WHERE bookId = ? AND userId = ?";
//       pool.query(checkIssueQuery, [bookId, userId], (err, issueResult) => {
//         if (err) {
//           return callback(err);
//         }
//         if (issueResult.length > 0) {
//           return callback("Book is already issued to this user");
//         }

//         // If both book and user exist and the book is not already issued to the user, insert into issue_books table
//         const insertQuery =
//           "INSERT INTO issue_books (bookId, userId, issueDate) VALUES (?, ?, ?)";
//         pool.query(
//           insertQuery,
//           [bookId, userId, issueDate],
//           (err, insertResult) => {
//             if (err) {
//               return callback(err);
//             }

//             // Decrement the count of the book
//             const decrementQuery =
//               "UPDATE books SET count = count - 1 WHERE id = ?";
//             pool.query(decrementQuery, [bookId], (err, decrementResult) => {
//               if (err) {
//                 return callback(err);
//               }
//               return callback(null, "Book issued successfully");
//             });
//           }
//         );
//       });
//     });
//   });
// }

// // Function to return a book
// function returnBook(bookId, userId, callback) {
//   // First, check if the book is issued to the user
//   const checkQuery =
//     "SELECT * FROM issue_books WHERE bookId = ? AND userId = ?";
//   pool.query(checkQuery, [bookId, userId], (err, results) => {
//     if (err) {
//       return callback(err);
//     }
//     // If the book is not issued to the user, return an error
//     if (results.length === 0) {
//       return callback("Book is not issued to this user");
//     }
//     // If the book is issued, delete the entry from issue_books table
//     const deleteQuery =
//       "DELETE FROM issue_books WHERE bookId = ? AND userId = ?";
//     pool.query(deleteQuery, [bookId, userId], (err, results) => {
//       if (err) {
//         return callback(err);
//       }
//       // Increment the count of the book in the books table
//       const incrementQuery = "UPDATE books SET count = count + 1 WHERE id = ?";
//       pool.query(incrementQuery, [bookId], (err, results) => {
//         if (err) {
//           return callback(err);
//         }
//         return callback(null, "Book returned successfully");
//       });
//     });
//   });
// }

// module.exports = {
//   pool,
//   connectToDatabase,
//   createBooksTable,
//   createIssueBooksTable,
//   createUsersTable,
//   addUser,
//   addBook,
//   issueBook,
//   returnBook,
// };
const mysql = require("mysql2");
require("dotenv").config();

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port:process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Function to establish database connection
function connectToDatabase(callback) {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error connecting to database:", err);
      return callback(err);
    }
    console.log("Connected to database");
    // Release the connection when done
    connection.release();
    return callback(null);
  });
}

// Create books table if it doesn't exist
function createBooksTable(callback) {
  const sql = `
    CREATE TABLE IF NOT EXISTS books (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      author VARCHAR(255) NOT NULL,
      category VARCHAR(255) NOT NULL,
      count INT NOT NULL
    )
  `;  
  pool.query(sql, (err, result) => {
    if (err) {
      console.error("Error creating books table:", err);
      return callback(err);
    }
    // console.log("Books table created successfully:", result);
    return callback(null);
  });
}

// Create issue_books table if it doesn't exist
function createIssueBooksTable(callback) {
  const sql = `
    CREATE TABLE IF NOT EXISTS issue_books (
      id INT AUTO_INCREMENT PRIMARY KEY,
      bookId INT NOT NULL,
      userId INT NOT NULL,
      issueDate DATE NOT NULL,
      FOREIGN KEY (bookId) REFERENCES books(id),
      FOREIGN KEY (userId) REFERENCES users(id)
    )
  `;
  pool.query(sql, (err, result) => {
    if (err) {
      console.error("Error creating issue_books table:", err);
      return callback(err);
    }
    // console.log("Issue_books table created successfully:", result);
    return callback(null);
  });
}

// Create users table if it doesn't exist
function createUsersTable(callback) {
  const sql = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(20) NOT NULL,
      age INT NOT NULL
    )
  `;
  pool.query(sql, (err, result) => {
    if (err) {
      console.error("Error creating users table:", err);
      return callback(err);
    }
    // console.log("Users table created successfully:", result);
    return callback(null);
  });
}

// Add user to the database
function addUser(name, email, phone, age, callback) {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error getting connection:", err);
      return callback(err);
    }
    connection.query(
      "INSERT INTO users (name, email, phone, age) VALUES (?, ?, ?, ?)",
      [name, email, phone, age],
      (err, results) => {
        connection.release(); // Release the connection here
        if (err) {
          return callback(err);
        }
        return callback(null, results);
      }
    );
  });
}

// Add book to the database
function addBook(title, author, category, count, callback) {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error getting connection:", err);
      return callback(err);
    }
    connection.query(
      "INSERT INTO books (title, author, category, count) VALUES (?, ?, ?, ?)",
      [title, author, category, count],
      (err, results) => {
        connection.release(); // Release the connection here
        if (err) {
          return callback(err);
        }
        return callback(null, results);
      }
    );
  });
}

// Issue book to a user
function issueBook(bookId, userId, issueDate, callback) {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error getting connection:", err);
      return callback(err);
    }
    const checkBookQuery = "SELECT * FROM books WHERE id = ? AND count > 0";
    connection.query(checkBookQuery, [bookId], (err, bookResult) => {
      if (err) {
        connection.release();
        return callback(err);
      }
      if (bookResult.length === 0) {
        connection.release();
        return callback("Book does not exist or is not available");
      }

      const checkUserQuery = "SELECT * FROM users WHERE id = ?";
      connection.query(checkUserQuery, [userId], (err, userResult) => {
        if (err) {
          connection.release();
          return callback(err);
        }
        if (userResult.length === 0) {
          connection.release();
          return callback("User does not exist");
        }

        const checkIssueQuery =
          "SELECT * FROM issue_books WHERE bookId = ? AND userId = ?";
        connection.query(
          checkIssueQuery,
          [bookId, userId],
          (err, issueResult) => {
            if (err) {
              connection.release();
              return callback(err);
            }
            if (issueResult.length > 0) {
              connection.release();
              return callback("Book is already issued to this user");
            }

            const insertQuery =
              "INSERT INTO issue_books (bookId, userId, issueDate) VALUES (?, ?, ?)";
            connection.query(
              insertQuery,
              [bookId, userId, issueDate],
              (err, insertResult) => {
                if (err) {
                  connection.release();
                  return callback(err);
                }

                const decrementQuery =
                  "UPDATE books SET count = count - 1 WHERE id = ?";
                connection.query(
                  decrementQuery,
                  [bookId],
                  (err, decrementResult) => {
                    connection.release();
                    if (err) {
                      return callback(err);
                    }
                    return callback(null, "Book issued successfully");
                  }
                );
              }
            );
          }
        );
      });
    });
  });
}

// Return a book
function returnBook(bookId, userId, callback) {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error getting connection:", err);
      return callback(err);
    }
    const checkQuery =
      "SELECT * FROM issue_books WHERE bookId = ? AND userId = ?";
    connection.query(checkQuery, [bookId, userId], (err, results) => {
      if (err) {
        connection.release();
        return callback(err);
      }
      if (results.length === 0) {
        connection.release();
        return callback("Book is not issued to this user");
      }

      const deleteQuery =
        "DELETE FROM issue_books WHERE bookId = ? AND userId = ?";
      connection.query(deleteQuery, [bookId, userId], (err, results) => {
        if (err) {
          connection.release();
          return callback(err);
        }

        const incrementQuery =
          "UPDATE books SET count = count + 1 WHERE id = ?";
        connection.query(incrementQuery, [bookId], (err, results) => {
          connection.release();
          if (err) {
            return callback(err);
          }
          return callback(null, "Book returned successfully");
        });
      });
    });
  });
}

module.exports = {
  pool,
  connectToDatabase,
  createBooksTable,
  createIssueBooksTable,
  createUsersTable,
  addUser,
  addBook,
  issueBook,
  returnBook,
};
