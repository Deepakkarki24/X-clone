import React, { useRef, useState, useEffect, useContext } from "react";
import { FaXmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import LoadingPage from "../LoadingPage";
import { UserContext } from "../../context/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const {
    isloading,
    userLoginDetails,
    loginErrors,
    loginDbMessage,
    handleSigninForm,
  } = useContext(UserContext);

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
                      ref={userLoginDetails.username}
                    />
                    {loginErrors.userEmail && (
                      <p className="text-[14px] mt-[2px] text-red-500">
                        {loginErrors.userEmail}
                      </p>
                    )}
                  </div>
                  <div className="field mb-6">
                    <input
                      className="border-[1px] rounded-[6px] border-[#6c6b6b] w-full p-2.5"
                      type="password"
                      name="password"
                      placeholder="Password"
                      ref={userLoginDetails.password}
                    />

                    {loginErrors.userPass && (
                      <p className="text-[14px] mt-[2px] text-red-500">
                        {loginErrors.userPass}
                      </p>
                    )}
                    {loginDbMessage.error && (
                      <p className="text-[14px] mt-[2px] text-red-500">
                        {loginDbMessage.error.message}
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
