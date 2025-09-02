import React from "react";
import TrendingEvent from "../TrandingEvent";
import styles from "./SidebarRight.module.css";
import SearcIcon from "@mui/icons-material/Search";
import Button from "../ButtonB&W";

function SidebarRight() {
  return (
    <div className={`${styles.sidebarRight} bg-black text-white`}>
      {/* search box area */}
      <div className={styles.search_box}>
        <SearcIcon className={styles.search_icon} />
        <input type="search" placeholder="Search" className={styles.search} />
      </div>
      {/* search box area */}

      {/* subscribe area */}
      {/* <div className={`${styles.subscribe} ${styles.box_style}`}>
        <h3 className={styles.title}>Subscribe to Premium</h3>
        <p className={`${styles.desc} my-4`}>
          Subscribe to unlock new features and if eligible, receive a share of
          ads revenue
        </p>
        <Button btnElement={"Subscribe"} />
      </div> */}
      {/* subscribe area */}

      {/* happening area */}
      <div className={`${styles.box_style} ${styles.happening}`}>
        <h3 className={styles.title}>#Hastags for You !</h3>

        <div className={styles.trending_events_box}>
          {/* Trending Event component */}

          <TrendingEvent
            trendingTop={"Give Your Feedback as post"}
            trendingMiddle={"Feedback with Amazing posts🤍"}
            trendingBottom={"Post your Feedback"}
            trendingBottomBlue={"#showlove"}
          />

          {/* Trending Event component */}
        </div>
      </div>
      {/* happening area */}
    </div>
  );
}

export default SidebarRight;
