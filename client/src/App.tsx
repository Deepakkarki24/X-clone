import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignUp from "./components/auth/SignUp";
import Login from "./components/auth/Login";
import Home from "./pages/HomePage";
import Layout from "./components/layout/Layout";
import ErrorPage from "./pages/ErrorPage";
import ProfilePage from "./pages/ProfilePage";
import Feed from "./components/post/Feed";
import EducationalDisclaimer from "./pages/EducationalDisclaimer";
import PrivateRoute from "./components/PrivateRoute";
import MobilePostPage from "./components/MobilePostPage";
import { useState } from "react";

const App = () => {
  const [logoutModal, setLogoutModal] = useState(false);

  return (
    <>
      <EducationalDisclaimer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout
                logoutModal={logoutModal}
                setLogoutModal={setLogoutModal}
              />
            </PrivateRoute>
          }
        >
          <Route path="post" element={<MobilePostPage />} />
          <Route
            path="feed"
            element={<Feed setLogoutModal={setLogoutModal} />}
          />
          <Route path="profile/:username" element={<ProfilePage />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} pauseOnHover />
    </>
  );
};

export default App;
