import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (token && role === "ADMIN") {
    return <Navigate to="/adminDashboard" replace />;
  }

  if (token && role === "CANDIDATE") {
    return <Navigate to="/candidateDashboard" replace />;
  }

  if (token && role === "RECRUITER") {
    return <Navigate to="/recruiterDashboard" replace />;
  }

  return children;
};

export default PublicRoute;
