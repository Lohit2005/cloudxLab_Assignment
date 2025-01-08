# cloudxLab_Assignment

# Web App Project

## Introduction
This project is a web app that allows users to sign up, log in, and manage their account details. It uses Node.js, Express, MySQL, and basic front-end HTML/CSS.

## Requirements
<br>
- Ubuntu 16.04 LTS or any UNIX-based OS
<br>
- Node.js (v14.x or higher)
<br>
- MySQL

## Setup Instructions
<br>
### 1. Clone the repository
Clone this repository to your local machine:


 - `git clone https://github.com/your-username/repository-name.git`
- `cd repository-name`

<br>
### 2. Install dependencies
Install Node.js dependencies using npm. Make sure you have Node.js installed before running the command.

- `npm install`

<br>
### 3. Create .env file
Create a .env file at the root of the project and add the following environment variables:

   - `DB_HOST`
   - `DB_USER`
   - `DB_PASSWORD`
   - `DB_NAME`

<br>
Note: Make sure to replace yourpassword with your actual MySQL root password.

<br>
### 4. Set up the MySQL Database
Create the MySQL database and tables based on the schema.

Run the following commands to set up the database (if not already done):

- `CREATE DATABASE webapp_db;`
- `USE webapp_db;`

- `CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  phone VARCHAR(15),
  password VARCHAR(255)
);`

You can also include any other migration scripts in a folder called /migrations.

### 5. Run the application
To run the application locally, execute:

- `npm start`

The app will be running on - `http://localhost:3000.`

### 6. Test the App
Visit the following URLs to interact with the app:

- `Home: http://localhost:3000/`
- `Login: http://localhost:3000/accounts/login`
- `Sign Up: http://localhost:3000/accounts/signup`

### 7. .gitignore
Make sure to add the following to your .gitignore file:

- `node_modules/`
- `.env`

This ensures that sensitive information and dependencies are not pushed to GitHub.

## Contributing

1. Fork the repository.
2. Create a new branch (git checkout -b feature-branch).
3. Commit your changes (git commit -am 'Add feature').
4. Push to the branch (git push origin feature-branch).
5. Create a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.


### Key Points Covered:
- **Setup instructions**: How to clone, install dependencies, create `.env`, set up the database, and run the application.
- **MySQL instructions**: Database creation script included for setting up the `webapp_db` and the `users` table.
- **.gitignore**: Makes sure to ignore `node_modules/` and `.env`.
- **Contributing**: Basic instructions for contributing to the project.
- **License**: Placeholder for the project’s license.

This `README.md` gives a clear, concise guide on how to set up and run your project on an Ubuntu 16.04 LTS server or any UNIX-based OS.







