import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/auth/SignUp";
import Login from "./components/auth/Login";
import Home from "./components/Home";
import Layout from "./components/layout/Layout";
import ErrorPage from "./pages/ErrorPage";
import Unauthorized from "./pages/Unauthorized";
import { UserContext } from "./context/UserContext";

const App = () => {
  let { token } = useContext(UserContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        <Route path="/layout" element={<Layout />} />
        {/* <Route path="/layout" element={token ? <Layout /> : <Unauthorized />} /> */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
