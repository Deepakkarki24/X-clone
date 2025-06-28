import React from "react";
import styles from "./SidebarOptions.module.css";
import { NavLink } from "react-router-dom";

const SidebarOptions = ({ optionName, Icon, routePath }) => {
  return (
    <div className={styles.side_nav_item_box}>
      <div className={styles.side_nav_links}>
        <NavLink to={routePath} className={`${styles.side_nav_link}`}>
          <div className={`${styles.inner_li} ${styles.list_name}`}>
            <Icon className={styles.list_icon} />
            <span>{optionName}</span>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default SidebarOptions;
