# 🖥️ Student Website - Backend API

This is the Node.js/Express backend for the Student Information Management System. It handles authentication, data persistence, and integration with third-party services like Cloudinary and SendGrid.

---

## 🏗️ Architecture

-   **Framework**: Express.js
-   **Database**: MongoDB (Mongoose ODM)
-   **Security**: JWT for session management, Bcrypt for password hashing.
-   **File Storage**: Cloudinary (via Multer)
-   **Email**: multi-provider support (SendGrid, Brevo, Nodemailer/Gmail)

---

## 📂 Directory Structure

-   `/config`: Database connection and environment setup.
-   `/controllers`: Business logic for each resource (Auth, Internship, etc.).
-   `/models`: Mongoose schemas defining our data structure.
-   `/routes`: Definition of API endpoints and mapping to controllers.
-   `/middlewares`: Auth guards, error handling, and request sanitization.
-   `/services`: External integrations (Cloudinary, Email).
-   `/validators`: Joi schemas for request body validation.

---

## 🔗 Key API Routes

### Authentication (`/api/auth`)
-   `POST /register`: Register a new user.
-   `POST /login`: Authenticate and receive a JWT.
-   `POST /forgot-password`: Initiate password recovery.
-   `POST /reset-password`: Update password using a token.

### Internships (`/api/internship`)
-   `GET /`: List all internships (Admin/Student specific).
-   `POST /`: Add a new internship record.
-   `PUT /:id`: Update an existing record.
-   `DELETE /:id`: Remove a record.

### Student Management (`/api/student`)
-   `GET /profile`: Get current student profile.
-   `PUT /profile`: Update personal and academic details.
-   `GET /all`: (Admin only) List all registered students.

*(Refer to `server.js` for the full list of route modules)*

---

## 🛡️ Security Features

1.  **JWT Authentication**: Protected routes require a valid `Authorization` header.
2.  **Rate Limiting**: Prevents brute-force attacks on sensitive endpoints.
3.  **Data Sanitization**: Against NoSQL Injection (Express-Mongo-Sanitize) and XSS.
4.  **CORS**: Configured to only allow requests from the trusted Frontend URL.

---

## 🛠️ Development

### Scripts
-   `npm start`: Runs the server using `node server.js`.
-   `node seed.js`: (If available) Populate initial data.

### Database Migrations
Mongoose handles schema changes automatically. Ensure `MONGO_URI` is correctly set in `.env`.
