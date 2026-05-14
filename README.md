# 🎓 Student Information Management System (SIMS)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#-contribution-guide)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)

A centralized, full-stack platform for streamlined academic record handling, student management, and administrative tracking. Built with the MERN stack.

🔗 **[Live Deployment Link](https://sims.csidmce.com)** 

---

## 🎯 What Problem It Solves

Educational institutions often struggle with fragmented data. Student records, achievements, placement tracking, and academic progress are frequently scattered across spreadsheets, physical files, or disconnected legacy systems. 

**SIMS** provides a "single source of truth" that bridges the gap between students, division incharges, and administrators. It eliminates data silos, reduces manual paperwork, ensures data accuracy, and empowers students to actively track and manage their academic journey in a unified dashboard.

---

## ✨ Features

### For Students
- **Dashboard & Profile**: View current semester status, basic info, and notifications.
- **Academic Tracking**: Upload and monitor semester-wise marks, certificates, and performance.
- **Achievements & Extracurriculars**: Submit records of hackathons, competitions, sports, and cultural events.
- **Placements & Internships**: Manage internship certificates and track placement application statuses.

### For Division Incharges (Faculty)
- **Student Verification**: Review and approve student-submitted academic records, achievements, and internships.
- **Class Oversight**: View overall performance and participation metrics for their assigned division.
- **Direct Communication**: Send notices and manage student records efficiently.

### For Administrators
- **Global Data Access**: Complete overview of all students, faculty, and records across the institution.
- **User Management**: Add, update, or remove users (Students, Incharges, Admins) securely.
- **Data Export & Reporting**: Generate detailed Excel reports for placements, achievements, and academic performance.
- **System Configuration**: Manage master data such as academic years, departments, and subjects.

---

## 📸 Screenshots

*(Replace these placeholder images with actual screenshots of your application)*

| Dashboard | Student Profile |
| :---: | :---: |
| <img src="https://via.placeholder.com/800x450.png?text=Dashboard+Screenshot" alt="Dashboard" width="100%"> | <img src="https://via.placeholder.com/800x450.png?text=Profile+Screenshot" alt="Profile" width="100%"> |

| Achievements Tracking | Admin Panel |
| :---: | :---: |
| <img src="https://via.placeholder.com/800x450.png?text=Achievements+Screenshot" alt="Achievements" width="100%"> | <img src="https://via.placeholder.com/800x450.png?text=Admin+Panel+Screenshot" alt="Admin Panel" width="100%"> |

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/) with [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons**: Heroicons, Lucide-React, React Icons
- **State/Routing**: React Router 7
- **Utilities**: Axios, React Hot Toast, ExcelJS (for exports)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (Mongoose ORM)
- **Security & Auth**: JWT, Bcryptjs, Helmet, Rate Limiting, Express-mongo-sanitize
- **Services**: Cloudinary (Media), Nodemailer/SendGrid (Emails)

---

## ⚙️ Setup Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local installation or MongoDB Atlas cluster)
- [Cloudinary](https://cloudinary.com/) Account (for image/file uploads)

### 1. Clone the Repository
```bash
git clone https://github.com/TechMe103/Student_Website.git
cd Student-Website
```

### 2. Backend Configuration
```bash
cd Backend
npm install
```
Create a `.env` file in the `Backend` directory (use `.env.example` as a reference):
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
# Email service configuration (Nodemailer/SendGrid)
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```
Start the backend server:
```bash
npm run dev
```

### 3. Frontend Configuration
Open a new terminal and navigate to the frontend:
```bash
cd Frontend
npm install
```
Create a `.env` file in the `Frontend` directory:
```env
VITE_API_URL=http://localhost:5000/api
```
Start the frontend development server:
```bash
npm run dev
```
Access the application at `http://localhost:5173`.

---

## 🗺️ Roadmap

- [x] **Phase 1: Core System & Verification**
  - [x] Student profiles and document uploads
  - [x] Division Incharge verification workflows
  - [x] Admin dashboard and user management
- [ ] **Phase 2: Enhanced Features**
  - [ ] Automated email/SMS notifications for pending verifications
  - [ ] Mobile responsive layout optimizations
  - [ ] Advanced dynamic report generation with charts
- [ ] **Phase 3: Integrations & Scalability**
  - [ ] Integration with college identity providers (SSO)
  - [ ] Alumni network tracking module
  - [ ] AI-based insights for student performance trends

---

## 🤝 Contribution Guide

We welcome contributions! Whether you're fixing bugs, improving documentation, or proposing new features, your help is appreciated.

1. **Fork** the repository and create your feature branch: `git checkout -b feature/AmazingFeature`
2. **Ensure** you follow the coding standards and add comments where necessary.
3. **Commit** your changes: `git commit -m 'Add some AmazingFeature'`
4. **Push** to the branch: `git push origin feature/AmazingFeature`
5. **Open a Pull Request** against the `main` branch.

Please check the issues tab for beginner-friendly tasks or to discuss major changes before implementing them.

---

## 📜 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for more information.
