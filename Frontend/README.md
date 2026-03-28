# 🎨 Student Website - Frontend Application

This is the React-based frontend for the Student Information Management System, built with Vite and Tailwind CSS 4. It provides separate, role-based dashboards for Students and Administrators.

---

## 🏗️ Technical Stack

-   **Runtime**: React 19
-   **Build System**: Vite 7
-   **Styling**: Tailwind CSS 4 (using `@tailwindcss/vite` plugin)
-   **Routing**: React Router 7 (managed in `App.jsx`)
-   **API Client**: Axios (with custom instances for Auth)
-   **State Management**: React Hooks (UseState, UseEffect, Context)
-   **Data Export**: ExcelJS (allowing CSV/Excel downloads of academic records)

---

## 📂 Frontend Architecture

-   `/src/Pages`: Contains all main route components (AdminDashboard, StudentProfile, etc.).
-   `/src/components`: Reusable UI elements like `ProtectedRoute`, `Sidebar`, and `Modal`.
-   `/src/layouts`: Component shells that provide shared navigation for Admin or Student roles.
-   `/src/api`: Centralized Axios configuration for backend communication.
-   `/src/services`: Helper functions for data transformation and storage.
-   `/src/assets`: Images, logos, and global stylesheets.

---

## 🔐 Role-Based Access Control (RBAC)

The application uses a `ProtectedRoute` component to enforce role requirements:
-   **Public**: Home, Login, Signup.
-   **Student Only**: Dashboard, Personal Info, Achievements, Internships.
-   **Admin Only**: Student Management, Division Incharge management, Global Analytics.
-   **Division Incharge**: Access to specific division-level administrative tools.

---

## 💅 Styling Guide

We utilize **Tailwind CSS 4** for a utility-first approach. Custom themes and configurations can be found in `src/index.css` and `vite.config.js`.

### Key UI Features:
-   Responsive grid layouts for high-density academic data.
-   Consistent toast notifications for user feedback.
-   Interactive cards for achievement and internship tracking.

---

## 🛠️ Deployment

### Environment Setup
Create a `.env` in the root of the `Frontend` folder:
```env
VITE_API_URL=https://your-backend-api.com/api
```

### Build Commands
-   `npm run dev`: Launch the local development server.
-   `npm run build`: Generate optimized production assets in the `dist/` directory.
-   `npm run lint`: Run ESLint to ensure code quality.

---

## 🔍 Development Notes

-   **Axios Interceptors**: Used for automatic token attachment to requests.
-   **Form Handling**: Clean implementations for complex multi-field student data.
-   **Error Handling**: Global toast notifications for API failures.
