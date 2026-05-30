import SearchIcon from "@mui/icons-material/Search";
import TrendingEvent from "../TrendingEvent";
import styles from "./SidebarRight.module.css";

const SidebarRight = () => {
  return (
    <div className={`${styles.sidebarRight} bg-black text-white`}>
      <div className={styles.search_box}>
        <SearchIcon className={styles.search_icon} />
        <input type="search" placeholder="Search" className={styles.search} />
      </div>

      <div className={`${styles.box_style} ${styles.happening}`}>
        <h3 className={styles.title}>#Hastags for You !</h3>
        <div className={styles.trending_events_box}>
          <TrendingEvent
            trendingTop="Give Your Feedback as post"
            trendingMiddle="Feedback with Amazing posts🤍"
            trendingBottom="Post your Feedback"
            trendingBottomBlue="#showlove"
          />
        </div>
      </div>
    </div>
  );
};

export default SidebarRight;
