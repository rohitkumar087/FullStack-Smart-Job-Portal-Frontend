import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/register.jsx";
import JobListings from "./pages/JobListings.jsx";
import JobDetails from "./pages/JobDetails.jsx";
import CandidateDashboard from "./pages/CandidateDashboard.jsx";
import RecruiterDashboard from "./pages/RecruiterDashboard.jsx";
import PostJob from "./pages/PostJob.jsx";
import ApplyJob from "./pages/ApplyJob.jsx";
import ApplicationsManagement from "./pages/ApplicationManagement.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import CandidateProfile from "./pages/CandidateProfile.jsx";
import CompanyProfile from "./pages/CompanyProfile.jsx";
import NotFound from "./pages/NotFound.jsx";
import MyPostedJobs from "./pages/MyPostedJobs";
import EditJob from "./pages/EditJob";
import MyApplications from "./pages/MyApplications";

import AdminUsers from "./pages/admin/AdminUsers";
import AdminRecruiters from "./pages/admin/AdminRecruiters";
import AdminPendingRecruiters from "./pages/admin/AdminPendingRecruiters";
import AdminJobs from "./pages/admin/AdminJobs";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/jobs" element={<JobListings />} />
        <Route path="/jobDetails/:jobId" element={<JobDetails />} />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        <Route
          path="/candidateDashboard"
          element={
            <ProtectedRoute allowedRoles={["CANDIDATE"]}>
              <CandidateDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/candidateProfile"
          element={
            <ProtectedRoute allowedRoles={["CANDIDATE"]}>
              <CandidateProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/applyJob/:jobId"
          element={
            <ProtectedRoute allowedRoles={["CANDIDATE"]}>
              <ApplyJob />
            </ProtectedRoute>
          }
        />

        <Route
          path="/myApplications"
          element={
            <ProtectedRoute allowedRoles={["CANDIDATE"]}>
              <MyApplications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recruiterDashboard"
          element={
            <ProtectedRoute allowedRoles={["RECRUITER"]}>
              <RecruiterDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/postJob"
          element={
            <ProtectedRoute allowedRoles={["RECRUITER"]}>
              <PostJob />
            </ProtectedRoute>
          }
        />

        <Route
          path="/myPostedJobs"
          element={
            <ProtectedRoute allowedRoles={["RECRUITER"]}>
              <MyPostedJobs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/editJob/:jobId"
          element={
            <ProtectedRoute allowedRoles={["RECRUITER"]}>
              <EditJob />
            </ProtectedRoute>
          }
        />

        <Route
          path="/applicationManagement"
          element={
            <ProtectedRoute allowedRoles={["RECRUITER"]}>
              <ApplicationsManagement />
            </ProtectedRoute>
          }
        />

        <Route
          path="/companyProfile"
          element={
            <ProtectedRoute allowedRoles={["RECRUITER"]}>
              <CompanyProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/adminDashboard"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminUsers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/recruiters"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminRecruiters />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/recruiters/pending"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminPendingRecruiters />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/jobs"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminJobs />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
