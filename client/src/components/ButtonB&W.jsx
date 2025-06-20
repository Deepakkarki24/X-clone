import React from "react";

const Button = ({ btnElement, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`opacity-100 transition-all cursor-pointer font-bold rounded-3xl bg-[#fff] text-black text-center w-full p-3`}
      type="submit"
    >
      {btnElement}
    </button>
  );
};

export default Button;
