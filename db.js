const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Replace with your MySQL username
  password: "Srinu@6969", // Replace with your MySQL root password
  database: "webapp_db", // Replace with your database name
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database.");
});

module.exports = db;
