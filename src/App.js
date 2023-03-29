import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import OtpLogin from "./pages/OtpLogin/Otplogin";
import VerifyOtp from "./pages/VerifyOtp/VerifyOtp";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import Dashboard from "./pages/Dashboard/Dashboard";
import ErrorBoundary from "./layout/ErrorBoundary";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <OtpLogin />
              </PublicRoute>
            }
          />
          <Route
            path="/verify"
            element={
              <PublicRoute>
                <VerifyOtp />
              </PublicRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
