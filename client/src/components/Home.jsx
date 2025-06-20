import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="home_container bg-black global_white h-[100vh] flex flex-nowrap items-center justify-center">
        <div className="sec_lt w-1/2">
          <div className="img_bx flex justify-center items-center">
            <svg viewBox="0 0 24 24" className="w-62 fill-white">
              <g>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </g>
            </svg>
          </div>
        </div>
        <div className="sec_rt w-1/2">
          <div className="top_hd my-10">
            <span className="font-bold text-6xl">Happening now</span>
          </div>
          <div className="signup_bx w-[45%] p-2">
            <div className="mid_head mb-4">
              <span className="text-3xl font-bold">Join today.</span>
            </div>
            <NavLink
              to={"/signup"}
              className="bg-[#1A8CD8] cursor-pointer w-full inline-block font-bold rounded-3xl py-2 text-[14px] text-white text-center"
            >
              Create account
            </NavLink>
            <div className="signin_bx my-8">
              <div className="last_head my-3">
                <span className="font-bold">Already have an account?</span>
              </div>
              <NavLink
                to={"/login"}
                className="text-[14px] font-bold bg-transparent border-[1px] border-[#1A8CD8] rounded-3xl w-full text-[#1A8CD8] cursor-pointer py-1 inline-block text-center"
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
