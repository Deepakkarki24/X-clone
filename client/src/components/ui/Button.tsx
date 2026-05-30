import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  btnElement: ReactNode;
}

const Button = ({ btnElement, onClick, type = "submit" }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="opacity-100 transition-all cursor-pointer font-bold rounded-3xl bg-[#fff] text-black text-center w-full p-3"
      type={type}
    >
      {btnElement}
    </button>
  );
};

export default Button;
