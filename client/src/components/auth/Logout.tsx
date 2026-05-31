import { FaXmark } from "react-icons/fa6";
import Button from "../ui/Button";
import { useUserContext } from "../../context/hooks/useUserContext";
import React, { useEffect } from "react";

interface LogoutProps {
  setLogoutModal: (open: boolean) => void;
  isOpen: boolean;
}

const Logout: React.FC<LogoutProps> = ({ setLogoutModal, isOpen }) => {
  const { handleLogout } = useUserContext();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // cleanup when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="logout_modal fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-40">
      <div className="logout_inner relative m-auto sm:max-w-sm max-w-[320px] max-h-[200px] h-full w-full bg-white/5 text-white rounded-2xl p-8 flex flex-col justify-between items-center backdrop-blur-sm">
        <FaXmark
          onClick={() => setLogoutModal(false)}
          className="cursor-pointer absolute hover:bg-black hover:text-white text-black w-fit h-fit top-4 right-4 bg-white rounded-full p-2"
        />
        <p className="sm:text-xl text-base font-semibold pt-10">
          Do you want to logout?
        </p>
        <Button onClick={handleLogout} btnElement="Logout" />
      </div>
    </div>
  );
};

export default Logout;
