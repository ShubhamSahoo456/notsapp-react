import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const auth_token = localStorage.getItem("userInfo");

  if (auth_token) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};

export default PublicRoute;
