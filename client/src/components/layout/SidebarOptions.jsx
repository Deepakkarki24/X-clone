import React from "react";
import styles from "./SidebarOptions.module.css";
import { Link } from "react-router-dom";

function SidebarOptions({ optionName, Icon, isActiveClass }) {
  return (
    <div className={styles.side_nav_item_box}>
      <div className={styles.side_nav_links}>
        <Link className={styles.side_nav_link}>
          <div className={`${styles.inner_li} ${styles.isActiveClass}`}>
            <Icon className={styles.list_icon} />
            <span className={styles.list_name}>{optionName}</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default SidebarOptions;
