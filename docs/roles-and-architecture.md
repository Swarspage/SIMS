# 👥 User Roles & Page Architecture Guide

This document provides a comprehensive breakdown of the different user roles in the Student Information Management System (SIMS) and explains the purpose of every page in the application.

---

## 1. 🛡️ User Roles Explained

The system implements Role-Based Access Control (RBAC) with three distinct types of users:

### 🎓 Student
- **Scope**: Personal Data Only.
- **Description**: The primary end-user of the system. Students create an account and maintain their academic and extracurricular profiles.
- **Capabilities**:
  - Can view, add, update, and delete **only their own** records (Achievements, Activities, Internships, Placements, Semester Info, etc.).
  - Cannot see other students' data.
- **Login Portal**: `/login`

### 👑 Admin (Superuser)
- **Scope**: Global Access.
- **Description**: Typically the Head of Department (HOD) or top-level system administrators.
- **Capabilities**:
  - Full access to view, edit, and delete records for **all students** across all years and divisions.
  - Can export global data to Excel files for reporting.
  - **Exclusive Access**: Only Admins can create, edit, or delete **Division Incharge** accounts.
- **Login Portal**: `/admin/login`

### 👨‍🏫 Division Incharge
- **Scope**: Division-Level Access.
- **Description**: Faculty members assigned to oversee specific years and divisions (e.g., Second Year, Division A).
- **Capabilities**:
  - Acts as a localized admin. They share the same interface as the Global Admin but their data view is strictly limited by the backend to only show students within their assigned division.
  - Can track, manage, and export data for their specific students.
  - Cannot manage other Division Incharges.
- **Login Portal**: `/division/login`

---

## 2. 🗺️ Page Directory & Explanations

Here is a detailed breakdown of every page component found in `src/Pages/`.

### 🌐 Public Pages
These pages are accessible without logging in.

1. **`Home.jsx` (`/`)**: 
   - The landing page of the application. It contains scrolling animations, information about the college/department, the HOD's message, and navigation buttons to the respective login portals.
2. **`MeetDevelopers.jsx` (`/developers`)**: 
   - A showcase page displaying the student development team behind the project, complete with their roles, GitHub, and LinkedIn profiles.
3. **`LoginPage.jsx` (`/login`)**: 
   - The primary authentication portal for **Students**.
4. **`SignupPage.jsx` (`/signup`)**: 
   - Where new students register for an account using their Student ID and Email.
5. **`VerifyEmail.jsx` (`/verify-email/:token`)**: 
   - Handles the email verification step after a student signs up.
6. **`ForgotPasswordPage.jsx` & `ResetPasswordPage.jsx`**: 
   - Standard password recovery flows for students who forgot their credentials.
7. **Admin/Division Logins**:
   - **`AdminLoginPage.jsx` (`/admin/login`)**: Dedicated secure login for Global Admins.
   - **`DivisionInchargeLogin.jsx` (`/division/login`)**: Dedicated secure login for Division Incharges.

---

### 🎒 Student Portal Pages
These pages are restricted to the `student` role and are wrapped in the `StudentLayout`.

1. **`StudentDashboard.jsx` (`/student/dashboard`)**:
   - The welcome screen for the student. Displays a high-level statistical summary of their progress (e.g., total achievements, internship status, placement status) using visual charts and counters.
2. **`StudentInfromation.jsx` (`/student/information`)**:
   - A read-only profile page displaying the student's core demographic and academic details (Name, ID, Phone, Address, Year, Division).
3. **`StudentActivity.jsx` (`/student/activity`)**:
   - Allows the student to log and manage extra-curricular activities (e.g., seminars, workshops attended).
4. **`StudentAchievements.jsx` (`/student/achievements`)**:
   - A dedicated space to add, edit, and view technical and non-technical achievements (hackathons, sports, cultural events).
5. **`StudentInternship.jsx` (`/student/internship`)**:
   - Where students upload their internship details, duration, company name, and certificates.
6. **`StudentPlacement.jsx` (`/student/placement`)**:
   - Students update their placement status here (e.g., On-campus vs. Off-campus, Company Name, Package/LPA).
7. **`StudentSemesterInfo.jsx` (`/student/semester-info`)**:
   - A record-keeping page for semester-wise academic performance (SGPA, CGPA, active backlogs).
8. **`StudentAdmission.jsx` (`/student/admission`)**:
   - Manages admission-related fee receipts or confirmation details.

---

### 🛡️ Admin & Division Incharge Portal Pages
These pages are restricted to `admin` and `division` roles and are wrapped in the `AdminLayout`. Division Incharges use these same pages, but the backend serves them filtered data.

1. **`AdminDashboard.jsx` (`/admin/dashboard`)**:
   - The command center. Displays global/division-wide statistics: total students registered, total placements across the college, total higher studies, and a feed of recent activities.
2. **`AdminStudentSection.jsx` (`/admin/students`)**:
   - The master list. A powerful table view displaying all registered students. Admins can search, filter by year/division, view individual student profiles, delete users, and bulk-export the list to Excel.
3. **`AdminDivisionIncharge.jsx` (`/admin/division-incharge`)**:
   - **(Admin Only)** A management page where the Global Admin can add new Division Incharges, assign them to specific years/divisions, and manage their access.
4. **`AdminAchievement.jsx` (`/admin/achievements`)**:
   - A global table viewing all achievements submitted by students. Features filtering and export capabilities.
5. **`AdminActivity.jsx` (`/admin/activities`)**:
   - A global view of all extracurricular activities submitted across the platform.
6. **`AdminInternship.jsx` (`/admin/internships`)**:
   - Admins can track which students have completed internships, filter by company or status, and export the data.
7. **`AdminPlacement.jsx` (`/admin/placements`)**:
   - A global tracker for college placements, allowing admins to see who is placed, where, and at what package.
8. **`AdminSemesterInfo.jsx` (`/admin/semester-info`)**:
   - Allows admins to track academic performance (CGPA/SGPA) across the student body.
9. **`AdminAdmission.jsx` (`/admin/admissions`)**:
   - Global view for admission tracking and verification.
