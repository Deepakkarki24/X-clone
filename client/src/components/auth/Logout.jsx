import React from "react";
import Button from "../ButtonB&W";
import { FaXmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import api from "../../services/api";

const Logout = ({ setLogoutModal }) => {
  const { handleLogout } = useContext(UserContext);
  return (
    <div className="logout_modal relative">
      <div className="flex justify-center items-center text-white h-[300px] rounded-2xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-2/6 bg-black">
        <div className="logout_inner">
          <FaXmark
            onClick={() => setLogoutModal(false)}
            className="cursor-pointer absolute top-6 left-6"
          />
          <Button onClick={handleLogout} btnElement={"Logout"} />
        </div>
      </div>
    </div>
  );
};

export default Logout;
