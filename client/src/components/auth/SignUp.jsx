import React, { useEffect, useRef, useState } from "react";
import { FaS, FaXmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import LoadingPage from "../LoadingPage";
import Button from "../ButtonB&W";

const SignUp = () => {
  const navigate = useNavigate();

  const [isloading, setIsLoading] = useState(false);
  const [dbMessage, setDbMessage] = useState({
    err: {
      message: "",
    },
    success: {
      message: "",
    },
  });

  const userDetails = {
    username: useRef(),
    email: useRef(),
    password: useRef(),
    confirmPassword: useRef(),
  };

  const { username, email, password, confirmPassword } = userDetails;

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSignupFormSubmit = (e) => {
    e.preventDefault();

    const usernameVal = username.current.value.trim();
    const emailVal = email.current.value.trim();
    const passwordVal = password.current.value.trim();
    const confirmPasswordVal = confirmPassword.current.value.trim();

    const newErrors = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!usernameVal) {
      newErrors.username = "Username is required!";
    }
    //  else if (!/^(?=.[a-z])(?=.[A-Z])(?=._).*$/.test(usernameVal)) {
    //   newErrors.username = "Only letters, numbers, and underscores allowed!";
    // }
    else if (usernameVal.length < 3) {
      newErrors.username = "Username must be at least 3 characters!";
    }

    if (!emailVal) {
      newErrors.email = "Email is required!";
    }

    if (!passwordVal) {
      newErrors.password = "Password is required!";
    } else if (passwordVal.length < 6) {
      newErrors.password = "Password must be at least 6 characters!";
    }

    if (!confirmPasswordVal) {
      newErrors.confirmPassword = "Confirm password is required!";
    } else if (passwordVal !== confirmPasswordVal) {
      newErrors.confirmPassword = "Passwords do not match!";
    }

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error !== "");
    if (hasErrors) return;

    username.current.value = "";
    email.current.value = "";
    password.current.value = "";
    confirmPassword.current.value = "";

    let userData = {
      name: usernameVal,
      email: emailVal,
      password: passwordVal,
    };

    let submmited = axios
      .post("http://localhost:3001/signup", userData)
      .then((res) => {
        if (res.data.success) {
          setDbMessage((prev) => ({
            err: { message: "" },
            success: { message: res.data.message },
          }));
          setIsLoading(true);
          setTimeout(() => {
            navigate("/");
            setIsLoading(false);
          }, 3000);
        } else {
          setDbMessage((prev) => ({
            ...prev,
            err: { message: res.data.message },
            success: { message: "" },
          }));
          return;
        }
      })
      .catch((err) => {
        return err;
      });
  };

  return (
    <>
      {isloading && <LoadingPage />}
      <div className="overlay bg-[#242D34] w-full h-[100vh] fixed  top-0 z-0">
        <div className="signup_modal z-40 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 bg-black global_white p-4 rounded-2xl">
          <div className="modal_heading">
            <FaXmark
              onClick={() => {
                navigate("/");
              }}
              className="cursor-pointer"
            />
            <div className="inner_bx m-9">
              <span className="text-2xl font-bold">Create your account</span>
              <div className="form_bx my-6">
                <form onSubmit={(e) => handleSignupFormSubmit(e)}>
                  <div className="field mb-6">
                    <input
                      className="border-[1px] rounded-[6px] border-[#6c6b6b] w-full p-2.5"
                      type="text"
                      name="username"
                      placeholder="Username"
                      ref={username}
                      autoComplete="off"
                    />
                    {errors.username && (
                      <p className="text-[14px] mt-[2px] text-red-500">
                        {errors.username}
                      </p>
                    )}
                  </div>
                  <div className="feild mb-6">
                    <input
                      className="border-[1px] rounded-[6px] border-[#6c6b6b] w-full p-2.5"
                      type="email"
                      name="email"
                      placeholder="Email"
                      ref={email}
                    />
                    {errors.email && (
                      <p className="text-[14px] mt-[2px] text-red-500">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="feild mb-6">
                    <input
                      className="border-[1px] rounded-[6px] border-[#6c6b6b] w-full p-2.5"
                      type="password"
                      name="password"
                      placeholder="Password"
                      ref={password}
                    />
                    {errors.password && (
                      <p className="text-[14px] mt-[2px] text-red-500">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <div className="feild mb-6">
                    <input
                      className="border-[1px] rounded-[6px] border-[#6c6b6b] w-full p-2.5"
                      type="password"
                      name="confirm-password"
                      placeholder="Confirm Password"
                      ref={confirmPassword}
                    />
                    {errors.confirmPassword && (
                      <p className="text-[14px] mt-[2px] text-red-500">
                        {errors.confirmPassword}
                      </p>
                    )}
                    {dbMessage.err && (
                      <p className="text-[14px] mt-[2px] text-red-500">
                        {dbMessage.err.message}
                      </p>
                    )}
                  </div>
                  <Button btnElement={"Sign up"} />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
