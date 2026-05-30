import type { ElementType } from "react";
import { NavLink } from "react-router-dom";
import styles from "./SidebarOptions.module.css";

interface SidebarOptionsProps {
  optionName: string;
  Icon: ElementType;
  routePath?: string;
}

const SidebarOptions = ({
  optionName,
  Icon,
  routePath,
}: SidebarOptionsProps) => {
  const inner = (
    <div className={`${styles.inner_li} ${styles.list_name}`}>
      <Icon className={styles.list_icon} />
      <span>{optionName}</span>
    </div>
  );

  return (
    <div className={styles.side_nav_item_box}>
      <div className={styles.side_nav_links}>
        {routePath ? (
          <NavLink to={routePath} className={styles.side_nav_link}>
            {inner}
          </NavLink>
        ) : (
          <div className={`${styles.side_nav_link} opacity-60 cursor-default`}>
            {inner}
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarOptions;
