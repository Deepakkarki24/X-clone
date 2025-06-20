import React from "react";
import styles from "./layout/SidebarRight.module.css";
import MoreHoriz from "@mui/icons-material/MoreHoriz";

function TrendingEvent({
  trendingTop,
  trendingBottom,
  trendingMiddle,
  trendingBottomBlue,
}) {
  return (
    <div className={styles.trending_event}>
      <div className={styles.trending_context}>
        <h4 className={styles.fadeTitle}>{trendingTop}</h4>
        <h5 className={styles.boldTitle}>{trendingMiddle}</h5>
        <h4 className={styles.fadeTitle}>
          {trendingBottom}
          <span className="text-norm fw-normal">{trendingBottomBlue}</span>
        </h4>
      </div>
      <MoreHoriz className={styles.icon} />
    </div>
  );
}

export default TrendingEvent;
