# Password Manager Application

This project is a password manager application that allows users to securely store their website names and passwords. The application provides a user interface for managing passwords, including adding, editing, and deleting website credentials. It also incorporates an authentication system to ensure that only authorized users can access their passwords.
<br>

## Table of Contents

- [**Features**](#features)
- [**Technologies**](#technologies)
- [**Installation**](#installation)
- [**Usage**](#usage)
- [**Contact**](#contact)
  <br>

## Features

- User registration and authentication
- AES-256 encryption for password security
- View decrypted passwords for individual websites
- Add, edit and delete website password entries
- Responsive design for mobile and desktop devices
- Error handling and validation for forms
- Caching with Redis

<br>

## Technologies

The project utilizes the following technologies:

- Backend:

  - Node.js: A JavaScript runtime for server-side development.
  - Express.js: A web application framework for Node.js.
  - PostgreSQL: A powerful open-source relational database management system.
  - TypeScript: A typed superset of JavaScript that compiles to plain JavaScript.
  - Redis: An in-memory data structure store used as a cache and message broker.
    <br>

- Frontend:
  - Next.js: A React framework for building server-side rendered and statically generated web applications.
  - TypeScript: A typed superset of JavaScript that compiles to plain JavaScript.

<br>

## Installation

- To install the application locally, follow these steps:
  1. Star this repo to support my work and Fork the repo to create your own copy to work from.
  2. Clone the repository to your local machine using:
  ```bash
     git clone https://github.com/abhijeetnishal/PasswordManager.git
  ```
  3. Navigate to the Server directory using command "cd server" and create a .env file and copy contents of .env.example file to .env file and add all secret keys to setup postgres database, Redis and backend.
  4. Install dependencies in server directory of project:
  ```bash
     npm install
  ```
  5. Start the server using comand:
  ```bash
     npm start
  ```
  6. Now navigate to client directory of project using commands:
  ```bash
     cd ..
     cd client
  ```
  7. Install dependencies in client directory of project:
  ```bash
     npm install
  ```
  8. Start the application using command:
  ```bash
     npm run dev
  ```
  9. Open http://localhost:3000 in your browser to see the application.

<br>

## Usage

- To use the application, follow these steps:
  1. Register a new account with your username, email and password.
  2. Log in to the application using email and passsword.
  3. Add a new website name and password by filling out the form and clicking the "Add New" button.
  4. View your website name and password entries in the main page.
  5. Click the "eye" button to view the decrypted password.
  6. Edit or delete a website name and password entry by clicking the corresponding button in the main page.

<br>

<!-- ## Contribution
Contributions are welcome! If you would like to contribute to the project, please follow these steps:
1. Star and Fork this repository by clicking the "Star" and "Fork" button at the top right of the repository page.
2. Clone your forked repository to your local machine:
```bash
    git clone https://github.com/abhijeetnishal/PasswordManager.git
```
3. Create a new branch for your contribution:
```bash
    git checkout -b my-contribution
```
4. Make your changes to the code.
5. Test your changes by running the app locally by following above installation step 3 - 9.
6. Once you are satisfied with your changes, commit them with a descriptive commit message:
```bash
    git add .
    git commit -m "Add feature X"
```
7. Push your changes to your forked repository:
```bash
    git push origin my-contribution
```
8. Create a pull request by clicking the "New pull request" button on the original repository page.
9. Wait for the project maintainer to review your pull request and provide feedback.
10. If your pull request is accepted, it will be merged into the main branch of the project. Congratulations, you've contributed to the project!

<br> -->

<!-- ## Code Style
- Please make sure to follow the existing code style and formatting conventions when making contributions to the project.

<br> -->

## Contact

- If you have any questions or suggestions with the app, please feel free to contact on LinkedIn: https://www.linkedin.com/in/abhijeetkumar7565/
- I appreciate your feedback and would love to hear from you!
