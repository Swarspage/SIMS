# 🎨 Student Website - Frontend Application

This is the React-based frontend for the Student Information Management System (SIMS) for Datta Meghe College of Engineering (DMCE). It provides a comprehensive, role-based, and highly interactive interface for Students, Administrators, and Division Incharges.

---

## 🏗️ Technical Stack & Configurations

- **Core**: React 19, Vite 7
- **Styling**: Tailwind CSS 4 (via `@tailwindcss/vite`), custom animations in `index.css`
- **Routing**: React Router 7 (`react-router-dom`)
- **State Management**: React Hooks (`useState`, `useEffect`), Context API
- **API Client**: Axios (`axios` package) with custom interceptors
- **Icons & UI Elements**: `@heroicons/react`, `lucide-react`, `react-icons`
- **Notifications**: `react-hot-toast`, `react-toastify`
- **SEO**: `react-helmet-async`
- **Data Export**: `exceljs` for generating Excel reports
- **Deployment & Config**:
  - `vercel.json`: Handles API proxy rewrites to Render backend and SPA fallbacks to `index.html`.
  - `vite.config.js`: Setup for React and Tailwind plugins.
  - `eslint.config.js`: Enforces modern JS/React code quality rules.

---

## 📂 Exhaustive Folder & File Architecture

### 1. Root & Configuration Files
- `package.json` / `package-lock.json`: Dependency manifests.
- `vite.config.js`: Vite server and build configuration.
- `eslint.config.js`: ESLint rules configuration.
- `vercel.json`: Vercel deployment settings, routing all `/api/*` to Render and `/*` to `index.html`.
- `index.html`: The HTML entry point containing essential meta tags and Open Graph SEO tags.
- `.env.example`: Template for environment variables (e.g., `VITE_API_URL`).

### 2. `public/`
- `robots.txt`: Search engine crawling rules (disallows admin/student portals).
- `sitemap.xml`: XML sitemap containing public-facing routes.

### 3. `src/` - Application Source Code

#### `main.jsx`
The React application entry point. Renders the `<App />` component wrapped in `<StrictMode>`.

#### `App.jsx`
The core router configuration using `BrowserRouter`. 
- Implements lazy loading (`React.lazy` and `Suspense`) for all pages to optimize bundle size.
- Uses custom Skeleton loaders (`DashboardSkeleton`, `TablePageSkeleton`, etc.) during Suspense fallbacks.
- Defines clear Public, Admin (includes Division Incharge), and Student route boundaries using the `ProtectedRoute` component.

#### `index.css`
The main stylesheet implementing Tailwind CSS 4 setup. 
- Contains global CSS variables (`--primary-blue`, `--glass-bg`).
- Defines custom keyframes for animations (`blob`, `float`, `shine`, `status-dot-blink`).
- Implements premium skeleton shimmer systems (`.skeleton`, `.skeleton-light`, `.skeleton-circle`).
- Defines global glassmorphism utilities (`.glass-card`, `.glass-nav`).

#### `api/`
- `axios.js`: Configures the base Axios instance (`API`).
  - Sets `BASE_URL` based on environment variables or window hostname.
  - Request Interceptor: Automatically attaches the JWT `Bearer` token from `localStorage` to all requests.
  - Response Interceptor: Catches `401 Unauthorized` errors, clears `localStorage` credentials, and safely redirects the user to their appropriate login screen based on their previous role.

#### `assets/`
Contains static imagery used throughout the application, including:
- DMCE and CSI logos (`dmce_logo_new.png`, `Csi Logo.png`, `logo.png`).
- Campus background images and collage pictures (`dmce_building.png`, `faculty_group.jpg`, `imgi_*.webp`).
- Developer avatars (`Aastha.png`, `Sanika.png`, `Yash.JPG`, `swar.png`, etc.).
- Default category placeholders (`Achievement.png`, `Internship.png`, etc.).

#### `layouts/`
- `AdminLayout.jsx`: Combines `AdminSidebar`, `Header` (with search), and `ToastContainer` to frame admin routes via `Outlet`.
- `StudentLayout.jsx`: Combines `StudentSidebar` and `Header` (without search) to frame student routes via `Outlet`.

#### `components/`
- `Header.jsx`: Top navigation bar. Fetches user data via services, displays greeting, notification bell, and user avatar with a hover-popup menu containing quick links and logout functionality.
- `AdminSidebar.jsx` & `StudentSidebar.jsx`: Role-specific sidebar navigation containing dynamic SVG icons, active-route styling, and mobile-responsive drawer toggle capabilities.
- `StudentProfileSidebar.jsx`: An interactive, slide-out off-canvas sidebar that displays a detailed view of a student's personal, academic, and contact information.
- `ProtectedRoute.jsx`: An HOC that verifies JWT/role presence in `localStorage`. Redirects unauthorized users to the correct login portals.
- `SEO.jsx`: Uses `react-helmet-async` to dynamically inject page titles, descriptions, and OpenGraph/Twitter meta tags.
- **`Common/`**:
  - `Pagination.jsx`: A reusable pagination component using `lucide-react` icons, supporting page jumping, limits, and total record display.
- **`skeletons/`**: 
  - Shimmering placeholder components displayed during lazy-loading or data fetching.
  - `AuthPageSkeleton.jsx`: For login/signup pages.
  - `CardGridSkeleton.jsx`: For grid layouts like achievements or activities.
  - `DashboardSkeleton.jsx`: For the main analytics dashboard.
  - `TablePageSkeleton.jsx`: For tabular data pages.
  - `GeneralPageSkeleton.jsx`: For miscellaneous pages like Home or Developers.

#### `services/`
A centralized layer for API calls, keeping React components clean:
- `authService.js`: Login (student/admin/division), signup, password reset, email verification, logout.
- `studentService.js`: CRUD operations for students, data export, and bulk Excel import.
- `dashboardService.js`: Fetches aggregated statistics and recent activity logs for dashboards.
- `achievementService.js`, `activityService.js`, `internshipService.js`, `placementService.js`, `higherStudiesService.js`: Handles fetching, creating, updating, deleting, and exporting records for their respective domains.
- `admissionService.js`: Manages admission records.
- `semInfoService.js`: Manages academic semester progression data.
- `divisionInchargeService.js`: Manages CRUD and email updates for Division Incharge accounts.

#### `Pages/`
**Public Pages:**
- `Home.jsx`: Premium landing page with scroll-reveal animations, campus collages, HOD message, and navigation to portals.
- `MeetDevelopers.jsx`: Team page showcasing developers with gradient cards, social links, and portfolio connections.
- `LoginPage.jsx` / `AdminLoginPage.jsx` / `DivisionInchargeLogin.jsx`: Dedicated role-based authentication screens.
- `SignupPage.jsx`: Student registration page.
- `ForgotPasswordPage.jsx` / `ResetPasswordPage.jsx` / `VerifyEmail.jsx`: Standardized authentication recovery and verification flows.

**Student Portal:**
- `StudentDashboard.jsx`: Overview with quick stats (activities, achievements) and charts displaying internship/placement status and categorical distributions.
- `StudentInfromation.jsx`: Detailed, read-only view of the logged-in student's personal/academic data.
- `StudentAdmission.jsx`, `StudentActivity.jsx`, `StudentAchievements.jsx`, `StudentInternship.jsx`, `StudentPlacement.jsx`, `StudentSemesterInfo.jsx`: Pages allowing students to view, add, edit, and delete their respective records. Often utilizes grid layouts or tables.

**Admin / Division Incharge Portal:**
- `AdminDashboard.jsx`: Global system overview displaying total counts, platform-wide distribution charts, and a feed of recent activities across all students.
- `AdminStudentSection.jsx`: A comprehensive table for managing all students, complete with advanced filtering, searching, editing, and Excel export functionality.
- `AdminDivisionIncharge.jsx`: Exclusive to main Admins; allows creation and management of Division Incharge staff accounts.
- `AdminAdmission.jsx`, `AdminActivity.jsx`, `AdminAchievement.jsx`, `AdminInternship.jsx`, `AdminPlacement.jsx`, `AdminSemesterInfo.jsx`: Global management pages for admins to oversee, filter, modify, and export student submissions in bulk.

---

## 🔐 Role-Based Access Control (RBAC)

The application strictly enforces access through:
1. **JWT Tokens**: Stored securely in `localStorage` and sent via Axios request interceptors.
2. **Local Role Flags**: `role` (`student`, `admin`, `division`) is evaluated by `ProtectedRoute`.
3. **Axios Response Interceptors**: Any `401 Unauthorized` immediately flushes the session and redirects to the specific portal's login page.
4. **Conditional UI**: Components like `Header` and `App.jsx` conditionally render links and routes based on the active role.

---

## 💅 Styling & UX Patterns

- **Glassmorphism**: Extensive use of `backdrop-blur`, semi-transparent backgrounds (`bg-white/70`), and soft borders to create a premium, deep UI experience.
- **Micro-interactions**: Hover effects, smooth transitions (`transition-all duration-500`), group-hover scaling, and active-click scaling (`active:scale-95`).
- **Responsive Design**: Mobile-first implementations with hidden sidebars converting to sliding drawers on smaller viewports.
- **Graceful Loading**: Suspense wrappers with detailed skeleton fallbacks ensure the UI layout never "jumps" while data is fetched.
- **User Feedback**: Global toast notifications via `react-hot-toast` and `react-toastify` for success and error states.
