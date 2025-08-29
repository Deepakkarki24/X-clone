import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "./components/auth/SignUp";
import Login from "./components/auth/Login";
import Home from "./components/Home";
import Layout from "./components/layout/Layout";
import ErrorPage from "./pages/ErrorPage";
import ProfilePage from "./pages/ProfilePage";
import Feed from "./components/post/Feed";
import EducationalDisclaimer from "./pages/EducationalDisclaimer";
import PrivateRoute from "./components/PrivateRoute";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <EducationalDisclaimer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route path="feed" element={<Feed />} />
          <Route path="profile/:username" element={<ProfilePage />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        pauseOnHover
        // theme="colored"
      />
    </>
  );
};

export default App;
