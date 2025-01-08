require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = process.env.PORT || 3000; // Use the PORT from .env file

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (CSS)
app.use(express.static('public'));

// MySQL database connection using environment variables
const db = mysql.createConnection({
  host: process.env.DB_HOST,  // Get DB_HOST from environment variables
  user: process.env.DB_USER,  // Get DB_USER from environment variables
  password: process.env.DB_PASSWORD,  // Get DB_PASSWORD from environment variables
  database: process.env.DB_NAME,  // Get DB_NAME from environment variables
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database.');
  }
});

// Serve the home page with buttons to Login or Sign Up
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <link rel="stylesheet" type="text/css" href="/style.css"> <!-- Link to the updated CSS -->
      </head>
      <body>
        <div class="container home-container">
          <h1>Welcome to the Web App</h1>
          <p>Please choose an action below:</p>
          <div class="buttons-container">
            <a href="/accounts/login"><button class="action-button">Login</button></a>
            <a href="/accounts/signup"><button class="action-button">Sign Up</button></a>
          </div>
        </div>
      </body>
    </html>
  `);
});

// Serve the login page at /accounts/login
app.get('/accounts/login', (req, res) => {
  res.send(`
    <html>
      <head>
        <link rel="stylesheet" type="text/css" href="/style.css"> <!-- Link to the updated CSS -->
      </head>
      <body>
        <div class="container form-box">
          <h1>Login</h1>
          <form action="/accounts/login" method="POST">
            <input type="email" id="email" name="email" placeholder="Enter your email" required><br><br>
            <input type="password" id="password" name="password" placeholder="Enter your password" required><br><br>
            <input type="submit" value="Login">
          </form>
          <br>
          <p>Don't have an account? <a href="/accounts/signup">Sign up here</a></p>
        </div>
      </body>
    </html>
  `);
});

// Handle login form submission
app.post('/accounts/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, result) => {
    if (err) {
      console.error('Error checking user credentials:', err);
      return res.status(500).send('Server error');
    }

    if (result.length === 0) {
      return res.status(401).send('Invalid email or password.');
    }

    // Redirect to the welcome page with a message upon successful login
    res.redirect('/welcome/login-success');
  });
});

// Serve the welcome page after successful login
app.get('/welcome/login-success', (req, res) => {
  res.send(`
    <html>
      <head>
        <link rel="stylesheet" type="text/css" href="/style.css"> <!-- Link to CSS -->
      </head>
      <body>
        <div class="container">
          <div class="welcome-box">
            <h1>Welcome!</h1>
            <p>Successful Login!</p>
            <a href="/">Go to Home Page</a>
          </div>
        </div>
      </body>
    </html>
  `);
});

// Serve the signup page at /accounts/signup
app.get('/accounts/signup', (req, res) => {
  res.send(`
    <html>
      <head>
        <link rel="stylesheet" type="text/css" href="/style.css"> <!-- Link to the updated CSS -->
      </head>
      <body>
        <div class="container form-box">
          <h1>Sign Up</h1>
          <form action="/accounts/signup" method="POST">
            <input type="text" id="firstName" name="firstName" placeholder="First Name" required><br><br>
            <input type="text" id="lastName" name="lastName" placeholder="Last Name" required><br><br>
            <input type="email" id="email" name="email" placeholder="Email" required><br><br> <!-- Keep type="email" -->
            <input type="text" id="phone" name="phone" placeholder="Phone Number" required><br><br>
            <input type="password" id="password" name="password" placeholder="Password" required><br><br>
            <input type="submit" value="Sign Up">
          </form>
          <br>
          <p>Already have an account? <a href="/accounts/login">Login here</a></p>
        </div>
      </body>
    </html>
  `);
});

// Handle the signup form submission
app.post('/accounts/signup', (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;

  // Basic validation for all fields
  if (!firstName || !lastName || !email || !phone || !password) {
    return res.status(400).send('Please fill all the fields.');
  }

  const query = 'INSERT INTO users (first_name, last_name, email, phone, password) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [firstName, lastName, email, phone, password], (err, result) => {
    if (err) {
      console.error('Error inserting user into database:', err);
      return res.status(500).send('Error signing up user.');
    }
    // Redirect to the welcome page with a message upon successful registration
    res.redirect('/welcome/registration-success');
  });
});

// Serve the welcome page after successful registration
app.get('/welcome/registration-success', (req, res) => {
  res.send(`
    <html>
      <head>
        <link rel="stylesheet" type="text/css" href="/style.css"> <!-- Link to CSS -->
      </head>
      <body>
        <div class="container">
          <div class="welcome-box">
            <h1>Welcome!</h1>
            <p>Successful Registration!</p>
            <a href="/">Go to Home Page</a>
          </div>
        </div>
      </body>
    </html>
  `);
});

// Catch-all route to handle undefined routes
app.use((req, res) => {
  res.status(404).send('Page not found');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
