import React from "react";
import Button from "../ButtonB&W";
import { FaXmark } from "react-icons/fa6";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const Logout = ({ setLogoutModal, setLogout }) => {
  const { handleLogout } = useContext(UserContext);
  return (
    <div className="logout_modal fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div
        className="
        logout_inner relative w-full max-w-sm mx-4
        bg-black text-white rounded-2xl p-8 flex flex-col items-center
        shadow-lg
        "
      >
        <FaXmark
          onClick={() => {
            setLogout(false);
            setLogoutModal(false);
          }}
          className="cursor-pointer absolute top-4 left-4"
        />
        <Button onClick={handleLogout} btnElement={"Logout"} />
      </div>
    </div>
  );
};

export default Logout;
