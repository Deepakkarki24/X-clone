import styles from "./Feed.module.css";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";

import { useContext, useState } from "react";
import Post from "./Post";
import Avatar from "@mui/material/Avatar";
import TweetBox from "./TweetBox";
import FollowingFeed from "./FollowingFeed";
import { TweetContext } from "../../context/TweetContext";
import ContentBuffer from "../ContentBuffer";
import { useEffect } from "react";
import { UserContext } from "../../context/UserContext";

function Feed() {
  const [isActiveTab, setIsActiveTab] = useState(() => ({
    tabname: "foryou",
    isActiveForyou: true,
    isActiveFollowing: false,
  }));

  const { tabname, isActiveFollowing } = isActiveTab;

  const { globalTweets, setPostLoading, postLoading } =
    useContext(TweetContext);

  const { user } = useContext(UserContext);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    setPostLoading(false);
  }, [globalTweets]);

  return (
    <>
      <div className={`${styles.feed} bg-black `}>
        <div className={styles.mob_top_nav}>
          <div className={styles.flex_top}>
            <Avatar src={`${API_URL}public/images/${user.profileImg}`} />
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
          </div>
        </div>

        <div className={styles.top_navigation}>
          <div
            onClick={() =>
              setIsActiveTab(() => ({
                tabname: "foryou",
                isActiveForyou: true,
                isActiveFollowing: false,
              }))
            }
            className={`${styles.navigation} ${
              tabname === "foryou" ? styles.navigation_isActive : ""
            }`}
          >
            <span className={styles.name_span}>For you</span>
          </div>
          <div
            onClick={() =>
              setIsActiveTab(() => ({
                tabname: "following",
                isActiveForyou: false,
                isActiveFollowing: true,
              }))
            }
            className={`${styles.navigation} ${
              tabname === "following" ? styles.navigation_isActive : ""
            }`}
          >
            <span className={styles.name_span}>Following</span>
          </div>
        </div>

        <TweetBox API_URL={API_URL} user={user} />
        {postLoading && <ContentBuffer />}
        {isActiveFollowing ? (
          <FollowingFeed />
        ) : (
          globalTweets.map((tweet, index) => (
            <Post
              key={index}
              avatar={`${API_URL.replace(/\/$/, "")}/public/images/${
                user.profileImg
              }`}
              displayName={tweet.userId && tweet.userId.name}
              verified="verified"
              userName={tweet.userId && tweet.userId.username}
              captionText={tweet.tweetText}
              media={tweet.tweetMedia.url}
            />
          ))
        )}

        <div className={styles.sticky_icon_mob}>
          <HistoryEduIcon fontSize="large" />
        </div>
      </div>
    </>
  );
}

export default Feed;
