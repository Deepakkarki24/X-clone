import Avatar from "@mui/material/Avatar";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ChecklistIcon from "@mui/icons-material/Checklist";
import PersonIcon from "@mui/icons-material/Person";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import styles from "./SideBar.module.css";
import SidebarOptions from "./SidebarOptions";
import type { User } from "../../types/user";
import { getPublicImageUrl } from "../../utils/mediaUrl";

interface SideBarProps {
  user: User;
  setLogoutModal: (open: boolean) => void;
}

const SideBar = ({ setLogoutModal, user }: SideBarProps) => {
  return (
    <div
      className={`${styles.sidebar} bg-black min-h-screen w-full max-w-xs md:max-w-sm px-2 md:px-6 py-4 flex flex-col justify-between`}
    >
      <div className={styles.sidebar_top}>
        <div className={styles.logo}>
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="w-8 md:w-12 lg:w-16"
          >
            <g>
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </g>
          </svg>
        </div>
        <SidebarOptions
          optionName="Home"
          Icon={HomeIcon}
          routePath="/dashboard/feed"
        />
        <SidebarOptions optionName="Explore" Icon={SearchIcon} />
        <SidebarOptions
          optionName="Notifications"
          Icon={NotificationsNoneIcon}
        />
        <SidebarOptions optionName="Messages" Icon={MailOutlineIcon} />
        <SidebarOptions optionName="Lists" Icon={ChecklistIcon} />
        {user.username && (
          <SidebarOptions
            optionName="Profile"
            Icon={PersonIcon}
            routePath={`/dashboard/profile/${user.username}`}
          />
        )}
        <SidebarOptions optionName="More" Icon={MoreHorizIcon} />
      </div>
      <div
        onClick={() => setLogoutModal(true)}
        className={`${styles.user} flex items-center justify-between mt-4 cursor-pointer`}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setLogoutModal(true)}
      >
        <div className={`${styles.user_profilebox} flex items-center`}>
          <div className="user_img w-11 h-11">
            <Avatar src={getPublicImageUrl(user.profileImg)} />
          </div>
          <div className={styles.user_name}>
            <h3 className="name text-base md:text-lg">{user.name}</h3>
            <h4 className="text-sm md:text-base text-gray-400">
              @{user.username}
            </h4>
          </div>
        </div>
        <MoreHorizIcon className={`${styles.more_icon} ml-2`} />
      </div>
    </div>
  );
};

export default SideBar;
