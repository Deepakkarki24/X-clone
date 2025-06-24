import React from "react";
import Button from "../ButtonB&W";
import styles from "../auth/Logout.module.css";
import { FaXmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import axios from "axios";

const Logout = ({ setLogoutModal }) => {
  let { setToken, token } = useContext(UserContext);
  let nav = useNavigate();

  const handleLogout = () => {
    let localToken = localStorage.getItem("token");
    if (localToken) {
      axios
        .delete("http://localhost:3001/logout", {
          headers: {
            Authorization: localToken,
          },
        })

        .then((res) => {
          localStorage.removeItem("token");
        });

      setToken("");
    }

    nav("/");
  };

  return (
    <div className="logout_modal relative">
      <div className={styles.overlay}>
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
