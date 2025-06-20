import React, { useRef, useState, useEffect, useContext } from "react";
import { FaXmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { UserContext } from "../../context/UserContext";

import LoadingPage from "../LoadingPage";

const Login = () => {
  const { setToken, token } = useContext(UserContext);

  const navigate = useNavigate();

  const userDetails = {
    username: useRef(),
    password: useRef(),
  };

  // Loading state for after signin
  const [isloading, setIsLoading] = useState(false);

  // error from frontend to frontend
  const [errors, setErrors] = useState({
    userEmail: "",
    userPass: "",
  });

  // error from Db to frontend
  const [dbMessage, setDbMessage] = useState({
    success: {
      message: "",
    },
    error: {
      message: "",
    },
  });

  const { username, password } = userDetails;

  const handleSigninForm = (e) => {
    e.preventDefault();
    let userEmail = username.current.value.trim();
    let userPassword = password.current.value.trim();

    const newErrors = {
      userEmail: "",
      userPass: "",
    };

    if (!userEmail) {
      newErrors.userEmail = "User email is required";
    }

    if (!userPassword) {
      newErrors.userPass = "User password is required";
    }

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error !== "");

    if (hasErrors) return;

    let userData = {
      email: userEmail,
      password: userPassword,
    };

    let loggedIn = axios
      .post("http://localhost:3001/login", userData)
      .then((res) => {
        if (res.data.success) {
          setToken(res.data.data.token);
          setDbMessage((prev) => ({
            success: { message: res.data.message },
          }));
          setIsLoading(true);
          setTimeout(() => {
            navigate("/layout");
            setIsLoading(false);
          }, 1500);
        } else {
          setDbMessage((prev) => ({
            error: { message: res.data.message },
          }));

          return;
        }
      })
      .catch((err) => console.log(err));

    username.current.value = "";
    password.current.value = "";
  };

  return (
    <>
      {isloading && <LoadingPage />}

      <div className="overlay bg-[#242D34] w-full h-[100vh] fixed  top-0 z-0">
        <div className="signin-modal z-40 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 bg-black global_white p-4 rounded-2xl">
          <div className="modal_heading">
            <FaXmark
              onClick={() => {
                navigate("/");
              }}
              className="cursor-pointer"
            />
            <div className="inner_bx m-9">
              <span className="text-2xl font-bold">Sign in to X</span>
              <div className="form_bx my-6">
                <form onSubmit={(e) => handleSigninForm(e)}>
                  <div className="field mb-6">
                    <input
                      className="border-[1px] rounded-[6px] border-[#6c6b6b] w-full p-2.5"
                      type="text"
                      name="email"
                      placeholder="Email"
                      ref={username}
                    />
                    {errors.userEmail && (
                      <p className="text-[14px] mt-[2px] text-red-500">
                        {errors.userEmail}
                      </p>
                    )}
                  </div>
                  <div className="field mb-6">
                    <input
                      className="border-[1px] rounded-[6px] border-[#6c6b6b] w-full p-2.5"
                      type="password"
                      name="password"
                      placeholder="Password"
                      ref={password}
                    />

                    {errors.userPass && (
                      <p className="text-[14px] mt-[2px] text-red-500">
                        {errors.userPass}
                      </p>
                    )}
                    {dbMessage.error && (
                      <p className="text-[14px] mt-[2px] text-red-500">
                        {dbMessage.error.message}
                      </p>
                    )}
                  </div>
                  <button
                    className="opacity-100 cursor-pointer font-bold rounded-3xl bg-[#fff] text-black text-center w-full p-3"
                    type="submit"
                  >
                    Sign in
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
