import React, { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import styles from "./SideBar.module.css";

import SidebarOptions from "../layout/SidebarOptions";

import HomeIcon from "@mui/icons-material/Home";
import SearcIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ChecklistIcon from "@mui/icons-material/Checklist";
import PersonIcon from "@mui/icons-material/Person";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Button from "../ButtonB&W";

const SideBar = ({ setLogoutModal, user }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  return (
    <>
      <div className={`${styles.sidebar}  bg-black`}>
        <div className={styles.sidebar_top}>
          <div className={styles.logo}>
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-lrsllp r-1nao33i r-16y2uox r-8kz0gk"
            >
              <g>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
              </g>
            </svg>
          </div>
          {/* Sidebar Options component */}
          <SidebarOptions
            optionName={"Home"}
            Icon={HomeIcon}
            routePath={"/dashboard/feed"}
          />
          <SidebarOptions optionName={"Explore"} Icon={SearcIcon} />
          <SidebarOptions
            optionName={"Notifications"}
            Icon={NotificationsNoneIcon}
          />
          <SidebarOptions optionName={"Messages"} Icon={MailOutlineIcon} />
          <SidebarOptions optionName={"Lists"} Icon={ChecklistIcon} />
          {user?.username && (
            <SidebarOptions
              optionName={"Profile"}
              Icon={PersonIcon}
              routePath={`/dashboard/profile/${user && user.username}`}
            />
          )}
          <SidebarOptions optionName={"More"} Icon={MoreHorizIcon} />
          {/* Sidebar Options component */}
          <div className="w-[90%]">
            <Button btnElement={"Post"} />
          </div>
        </div>

        <div onClick={() => setLogoutModal(true)} className={styles.user}>
          <div className={styles.user_profilebox}>
            <div className="user_img w-[45px] ">
              <Avatar src={`${API_URL}public/images/${user.profileImg}`} />
            </div>
            <div className={styles.user_name}>
              <h3 className="name">{user && user.name}</h3>
              <h4 className={styles.user_name}>@{user && user.username}</h4>
            </div>
          </div>
          <MoreHorizIcon className={styles.more_icon} />
        </div>
      </div>
    </>
  );
};

export default SideBar;
