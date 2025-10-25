import React from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="home_container bg-black global_white min-h-screen flex flex-col lg:flex-row items-center justify-center">
        {/* Left Section (Logo) */}
        <div className="sec_lt w-full lg:w-1/2 flex justify-center items-center py-8 lg:py-0">
          <div className="img_bx flex justify-center items-center">
            <svg
              viewBox="0 0 24 24"
              className="w-32 md:w-48 lg:w-62 fill-white"
            >
              <g>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </g>
            </svg>
          </div>
        </div>
        {/* Right Section (Content) */}
        <div className="sec_rt w-full lg:w-1/2 flex flex-col items-center">
          <div className="top_hd my-6 md:my-10 text-center">
            <span className="font-bold text-3xl md:text-5xl lg:text-6xl">
              Happening now
            </span>
          </div>
          <div className="signup_bx w-full max-w-md px-2">
            <div className="mid_head mb-4 text-center">
              <span className="text-2xl md:text-3xl font-bold">
                Join today.
              </span>
            </div>
            <NavLink
              to={"/signup"}
              className="bg-[#1A8CD8] cursor-pointer w-full font-bold rounded-3xl py-2 text-[15px] md:text-[16px] text-white text-center block mb-4"
            >
              Create account
            </NavLink>
            <div className="signin_bx my-6">
              <div className="last_head my-3 text-center">
                <span className="font-bold">Already have an account?</span>
              </div>
              <NavLink
                to={"/login"}
                className="text-[15px] md:text-[16px] font-bold bg-transparent border border-[#1A8CD8] rounded-3xl w-full text-[#1A8CD8] cursor-pointer py-1 block text-center"
              >
                Sign in
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
