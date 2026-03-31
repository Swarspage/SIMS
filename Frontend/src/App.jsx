//Trigger vercel redeployment2
import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

// Layouts & ProtectedRoute (kept as eager — tiny files, always needed)
import AdminLayout from "./layouts/AdminLayout";
import StudentLayout from "./layouts/StudentLayout";
import ProtectedRoute from "./components/ProtectedRoute";

// ── Skeleton fallbacks ────────────────────────────────────────────
import DashboardSkeleton from "./components/skeletons/DashboardSkeleton";
import TablePageSkeleton from "./components/skeletons/TablePageSkeleton";
import CardGridSkeleton from "./components/skeletons/CardGridSkeleton";
import AuthPageSkeleton from "./components/skeletons/AuthPageSkeleton";
import GeneralPageSkeleton from "./components/skeletons/GeneralPageSkeleton";

// ── Lazy Public Pages ─────────────────────────────────────────────
const Home                = lazy(() => import("./Pages/Home"));
const LoginPage           = lazy(() => import("./Pages/LoginPage"));
const AdminLoginPage      = lazy(() => import("./Pages/AdminLoginPage"));
const DivisionInchargeLogin = lazy(() => import("./Pages/DivisionInchargeLogin"));
const SignupPage           = lazy(() => import("./Pages/SignupPage"));
const ForgotPasswordPage   = lazy(() => import("./Pages/ForgotPasswordPage"));
const ResetPasswordPage    = lazy(() => import("./Pages/ResetPasswordPage"));
const VerifyEmail          = lazy(() => import("./Pages/VerifyEmail"));
const MeetDevelopers       = lazy(() => import("./Pages/MeetDevelopers"));

// ── Lazy Admin Pages ──────────────────────────────────────────────
const AdminDashboard       = lazy(() => import("./Pages/AdminDashboard"));
const AdminStudentSection  = lazy(() => import("./Pages/AdminStudentSection"));
const AdminActivity        = lazy(() => import("./Pages/AdminActivity"));
const AdminAchievements    = lazy(() => import("./Pages/AdminAchievement"));
const AdminInternship      = lazy(() => import("./Pages/AdminInternship"));
const AdminPlacement       = lazy(() => import("./Pages/AdminPlacement"));
const AdminAdmission       = lazy(() => import("./Pages/AdminAdmission"));
const AdminSemesterInfo    = lazy(() => import("./Pages/AdminSemesterInfo"));
const AdminDivisionIncharge = lazy(() => import("./Pages/AdminDivisionIncharge"));

// ── Lazy Student Pages ────────────────────────────────────────────
const StudentDashboard     = lazy(() => import("./Pages/StudentDashboard"));
const StudentActivity      = lazy(() => import("./Pages/StudentActivity"));
const StudentAdmission     = lazy(() => import("./Pages/StudentAdmission"));
const StudentInformation   = lazy(() => import("./Pages/StudentInfromation"));
const StudentAchievements  = lazy(() => import("./Pages/StudentAchievements"));
const StudentInternship    = lazy(() => import("./Pages/StudentInternship"));
const StudentPlacement     = lazy(() => import("./Pages/StudentPlacement"));
const StudentSemesterInfo  = lazy(() => import("./Pages/StudentSemesterInfo"));

// ── Helper: wrap a lazy page with its matching skeleton ──────────
function SuspensePage({ skeleton: Skeleton, children }) {
  return <Suspense fallback={<Skeleton />}>{children}</Suspense>;
}

const App = () => {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          {/* ── Public Routes ──────────────────────────────────────── */}
          <Route
            path="/"
            element={
              <SuspensePage skeleton={GeneralPageSkeleton}>
                <Home />
              </SuspensePage>
            }
          />
          <Route
            path="/login"
            element={
              <SuspensePage skeleton={AuthPageSkeleton}>
                <LoginPage />
              </SuspensePage>
            }
          />
          <Route
            path="/admin/login"
            element={
              <SuspensePage skeleton={AuthPageSkeleton}>
                <AdminLoginPage />
              </SuspensePage>
            }
          />
          <Route
            path="/admin/forgot-password"
            element={
              <SuspensePage skeleton={AuthPageSkeleton}>
                <ForgotPasswordPage role="admin" />
              </SuspensePage>
            }
          />
          <Route
            path="/admin/reset-password/:token"
            element={
              <SuspensePage skeleton={AuthPageSkeleton}>
                <ResetPasswordPage role="admin" />
              </SuspensePage>
            }
          />
          <Route
            path="/division/login"
            element={
              <SuspensePage skeleton={AuthPageSkeleton}>
                <DivisionInchargeLogin />
              </SuspensePage>
            }
          />
          <Route
            path="/division-incharge/forgot-password"
            element={
              <SuspensePage skeleton={AuthPageSkeleton}>
                <ForgotPasswordPage role="division" />
              </SuspensePage>
            }
          />
          <Route
            path="/division-incharge/reset-password/:token"
            element={
              <SuspensePage skeleton={AuthPageSkeleton}>
                <ResetPasswordPage role="division" />
              </SuspensePage>
            }
          />
          <Route
            path="/signup"
            element={
              <SuspensePage skeleton={AuthPageSkeleton}>
                <SignupPage />
              </SuspensePage>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <SuspensePage skeleton={AuthPageSkeleton}>
                <ForgotPasswordPage role="student" />
              </SuspensePage>
            }
          />
          <Route
            path="/reset-password/:token"
            element={
              <SuspensePage skeleton={AuthPageSkeleton}>
                <ResetPasswordPage role="student" />
              </SuspensePage>
            }
          />
          <Route
            path="/developers"
            element={
              <SuspensePage skeleton={GeneralPageSkeleton}>
                <MeetDevelopers />
              </SuspensePage>
            }
          />
          <Route
            path="/verify-email/:token"
            element={
              <SuspensePage skeleton={GeneralPageSkeleton}>
                <VerifyEmail />
              </SuspensePage>
            }
          />

          {/* ── Admin Routes — PROTECTED ───────────────────────────── */}
          {/* Note: allows admin / division / divisionIncharge roles */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole={["admin", "division", "divisionIncharge"]}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />

            <Route
              path="dashboard"
              element={
                <SuspensePage skeleton={DashboardSkeleton}>
                  <AdminDashboard />
                </SuspensePage>
              }
            />
            <Route
              path="admission"
              element={
                <SuspensePage skeleton={TablePageSkeleton}>
                  <AdminAdmission />
                </SuspensePage>
              }
            />
            <Route
              path="students"
              element={
                <SuspensePage skeleton={TablePageSkeleton}>
                  <AdminStudentSection />
                </SuspensePage>
              }
            />
            <Route
              path="activities"
              element={
                <SuspensePage skeleton={CardGridSkeleton}>
                  <AdminActivity />
                </SuspensePage>
              }
            />
            <Route
              path="achievements"
              element={
                <SuspensePage skeleton={CardGridSkeleton}>
                  <AdminAchievements />
                </SuspensePage>
              }
            />
            <Route
              path="internships"
              element={
                <SuspensePage skeleton={CardGridSkeleton}>
                  <AdminInternship />
                </SuspensePage>
              }
            />
            <Route
              path="placements"
              element={
                <SuspensePage skeleton={CardGridSkeleton}>
                  <AdminPlacement />
                </SuspensePage>
              }
            />
            <Route
              path="semester-info"
              element={
                <SuspensePage skeleton={CardGridSkeleton}>
                  <AdminSemesterInfo />
                </SuspensePage>
              }
            />
            <Route
              path="division-incharges"
              element={
                <SuspensePage skeleton={TablePageSkeleton}>
                  <AdminDivisionIncharge />
                </SuspensePage>
              }
            />
          </Route>

          {/* ── Student Routes — PROTECTED ─────────────────────────── */}
          <Route
            path="/student"
            element={
              <ProtectedRoute requiredRole="student">
                <StudentLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/student/dashboard" replace />} />

            <Route
              path="dashboard"
              element={
                <SuspensePage skeleton={DashboardSkeleton}>
                  <StudentDashboard />
                </SuspensePage>
              }
            />
            <Route
              path="admission"
              element={
                <SuspensePage skeleton={TablePageSkeleton}>
                  <StudentAdmission />
                </SuspensePage>
              }
            />
            <Route
              path="information"
              element={
                <SuspensePage skeleton={TablePageSkeleton}>
                  <StudentInformation />
                </SuspensePage>
              }
            />
            <Route
              path="activity"
              element={
                <SuspensePage skeleton={CardGridSkeleton}>
                  <StudentActivity />
                </SuspensePage>
              }
            />
            <Route
              path="achievements"
              element={
                <SuspensePage skeleton={CardGridSkeleton}>
                  <StudentAchievements />
                </SuspensePage>
              }
            />
            <Route
              path="internship"
              element={
                <SuspensePage skeleton={CardGridSkeleton}>
                  <StudentInternship />
                </SuspensePage>
              }
            />
            <Route
              path="placement"
              element={
                <SuspensePage skeleton={CardGridSkeleton}>
                  <StudentPlacement />
                </SuspensePage>
              }
            />
            <Route
              path="semester-info"
              element={
                <SuspensePage skeleton={CardGridSkeleton}>
                  <StudentSemesterInfo />
                </SuspensePage>
              }
            />
          </Route>

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;