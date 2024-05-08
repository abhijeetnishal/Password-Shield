# Password Manager Application

This project is a password manager application that allows users to securely store their website names and passwords. The application provides a user interface for managing passwords, including adding, editing, and deleting website credentials. It also incorporates an authentication system to ensure that only authorized users can access their passwords.
<br>

## Table of Contents

- [**Features**](#features)
- [**Technologies**](#technologies)
- [**Application Setup**](#application-setup)
- [**How to Contribute**](#how-to-contribute)
- [**Code Style**](#code-style)
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

<br>

## Technologies

The project utilizes the following technologies:

- Backend:

  - Node.js: A JavaScript runtime for server-side development.
  - Express.js: A web application framework for Node.js.
  - PostgreSQL: A powerful open-source relational database management system.
  - TypeScript: A typed superset of JavaScript that compiles to plain JavaScript.
    <br>

- Frontend:
  - React.js: A JavaScript library for building ui components.

<br>

## Application Setup

To setup the application locally, follow these steps:

1. Star and Fork this repo to create your own copy to work from.
2. Clone the repository you forked to your local machine using:

   ```bash
      git clone <your_forked_repo_url>
   ```

3. Navigate to the Server directory using command "cd server" and create a .env file and copy contents of .env.example file to .env file and add all secret keys to setup postgres database and backend.
4. Install dependencies in server directory of project:

   ```bash
      npm install
   ```

5. Start the server using command:

   ```bash
      npm start
   ```

6. create a Table (schema) by making a **_POST_** request to API endpoint **_http://localhost:8080/schema_** API endpoint using Postman or other API testing tools.

7. Now navigate to client directory of project using commands:

   ```bash
      cd ../client
   ```

8. Install dependencies in client directory of project:

   ```bash
      npm install
   ```

9. Start the application using command:

   ```bash
      npm start
   ```

10. Open http://localhost:3000 in your browser to see the application.

<br>

## How to Contribute

Contributions are welcome! If you would like to contribute to the project, please follow these steps:

1. Clone and setup this application locally by following above application setup steps.

2. Create a new branch for the issue you assigned to work on, using below command:

   ```bash
      git checkout -b your_branch_name
   ```

3. Make your changes to the code.
4. Once you are satisfied with your changes, commit them with a descriptive commit message using below command:

   ```bash
      git add .
      git commit -m "feat: Add feature X"
   ```

5. Push your changes to your forked repository:

   ```bash
      git push origin your_branch_name
   ```

6. Create a pull request by clicking the "Pull request" button on the original repository page.
7. Wait for the project maintainer to review your pull request and provide feedback.
8. If your pull request is accepted, it will be merged into the main branch of the project. Congratulations, you've contributed to the project!

<br>

## Code Style

- Please make sure to follow the existing code style and formatting conventions when making contributions to the project.

<br>

## Usage

To use the application, follow these steps:

1. Register a new account with your username, email and password.
2. Log in to the application using email and password.
3. Add a new website name and password by filling out the form and clicking the "Add New" button.
4. View your website name and password entries in the main page.
5. Click the "eye" button to view the decrypted password.
6. Edit or delete a website name and password entry by clicking the corresponding button in the main page.

<br>

## Contact

- If you have any questions or suggestions with the app, please feel free to contact on LinkedIn: https://www.linkedin.com/in/abhijeetkumar7565/
