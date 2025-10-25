import React, { useContext } from "react";
import { FaS, FaXmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../LoadingPage";
import Button from "../ButtonB&W";
import { UserContext } from "../../context/UserContext";

const SignUp = () => {
  const navigate = useNavigate();

  let {
    handleSignupFormSubmit,
    userDetails,
    isloading,
    signupDbMessage,
    signupErrors,
  } = useContext(UserContext);

  let { name, username, email, password, confirmPassword } = userDetails;

  return (
    <>
      {isloading && <LoadingPage />}
      <div className="overlay bg-[#242D34] w-full min-h-screen fixed top-0 left-0 z-0 flex items-center justify-center">
        <div
          className="
          signup_modal z-40 relative
          w-full max-w-lg bg-black global_white p-4 rounded-2xl
          mx-2 sm:w-2/3 md:w-1/2 lg:w-1/3
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
            <div className="inner_bx p-4 md:p-6">
              <span className="block text-lg md:text-2xl font-bold mb-4">
                Create your account
              </span>
              <div className="form_bx my-4">
                <form onSubmit={(e) => handleSignupFormSubmit(e)}>
                  <div className="field mb-4">
                    <input
                      className="border rounded-md border-[#6c6b6b] w-full p-2 text-base md:text-lg"
                      type="text"
                      name="name"
                      placeholder="Name"
                      ref={name}
                      autoComplete="off"
                    />
                    {signupErrors.name && (
                      <p className="text-sm mt-1 text-red-500">
                        {signupErrors.name}
                      </p>
                    )}
                  </div>
                  <div className="field mb-4">
                    <input
                      className="border rounded-md border-[#6c6b6b] w-full p-2 text-base md:text-lg"
                      type="text"
                      name="username"
                      placeholder="Username"
                      ref={username}
                      autoComplete="off"
                    />
                    {signupErrors.username && (
                      <p className="text-sm mt-1 text-red-500">
                        {signupErrors.username}
                      </p>
                    )}
                  </div>
                  <div className="field mb-4">
                    <input
                      className="border rounded-md border-[#6c6b6b] w-full p-2 text-base md:text-lg"
                      type="email"
                      name="email"
                      placeholder="Email"
                      ref={email}
                    />
                    {signupErrors.email && (
                      <p className="text-sm mt-1 text-red-500">
                        {signupErrors.email}
                      </p>
                    )}
                  </div>
                  <div className="field mb-4">
                    <input
                      className="border rounded-md border-[#6c6b6b] w-full p-2 text-base md:text-lg"
                      type="password"
                      name="password"
                      placeholder="Password"
                      ref={password}
                    />
                    {signupErrors.password && (
                      <p className="text-sm mt-1 text-red-500">
                        {signupErrors.password}
                      </p>
                    )}
                  </div>
                  <div className="field mb-4">
                    <input
                      className="border rounded-md border-[#6c6b6b] w-full p-2 text-base md:text-lg"
                      type="password"
                      name="confirm-password"
                      placeholder="Confirm Password"
                      ref={confirmPassword}
                    />
                    {signupErrors.confirmPassword && (
                      <p className="text-sm mt-1 text-red-500">
                        {signupErrors.confirmPassword}
                      </p>
                    )}
                    {signupDbMessage.err && (
                      <p className="text-sm mt-1 text-red-500">
                        {signupDbMessage.err.message}
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
