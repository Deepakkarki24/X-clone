import React, { useContext } from "react";
import { FaXmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

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

      <div className="overlay bg-[#242D34] w-full min-h-screen fixed top-0 left-0 z-0 flex items-center justify-center">
        <div
          className="
          signin-modal z-40 relative
          w-full max-w-lg bg-black global_white p-4 rounded-2xl
          mx-2
          sm:w-2/3
          md:w-1/2
          lg:w-1/3
          shadow-lg
        "
        >
          <div className="modal_heading">
            <FaXmark
              onClick={() => {
                navigate("/");
              }}
              className="cursor-pointer"
            />
            <div className="inner_bx m-6 md:m-9">
              <span className="text-lg md:text-2xl font-bold block">
                Sign in to X
              </span>
              <div className="form_bx my-4 md:my-6">
                <form onSubmit={(e) => handleSigninForm(e)}>
                  <div className="field mb-4 md:mb-6">
                    <input
                      className="border-[1px] rounded-[6px] border-[#6c6b6b] p-2.5 text-base md:text-lg"
                      type="text"
                      name="email"
                      placeholder="Email"
                      ref={userLoginDetails.username}
                    />
                    {loginErrors.userEmail && (
                      <p className="text-sm mt-[2px] text-red-500">
                        {loginErrors.userEmail}
                      </p>
                    )}
                  </div>
                  <div className="field mb-4 md:mb-6">
                    <input
                      className="border-[1px] rounded-[6px] border-[#6c6b6b] w-full p-2.5 text-base md:text-lg"
                      type="password"
                      name="password"
                      placeholder="Password"
                      ref={userLoginDetails.password}
                    />
                    {loginErrors.userPass && (
                      <p className="text-sm mt-[2px] text-red-500">
                        {loginErrors.userPass}
                      </p>
                    )}
                    {loginDbMessage.error && (
                      <p className="text-sm mt-[2px] text-red-500">
                        {loginDbMessage.error.message}
                      </p>
                    )}
                  </div>
                  <button
                    className="opacity-100 cursor-pointer font-bold rounded-3xl bg-[#fff] text-black text-center w-full p-3 text-base md:text-lg"
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
