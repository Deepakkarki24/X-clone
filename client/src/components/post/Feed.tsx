import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import styles from "./Feed.module.css";
import Post from "./Post";
import ComposeTweet from "./ComposeTweet";
import FollowingFeed from "./FollowingFeed";
import ContentBuffer from "../ContentBuffer";
import MobileNav from "../MobileNav";
import Logout from "../auth/Logout";
import { useTweetContext } from "../../context/hooks/useTweetContext";
import { useUserContext } from "../../context/hooks/useUserContext";
import { getPublicImageUrl } from "../../utils/mediaUrl";

type FeedTab = "foryou" | "following";

function Feed() {
  const [activeTab, setActiveTab] = useState<FeedTab>("foryou");
  const [logoutModal, setLogoutModal] = useState(false);

  const { globalTweets, setPostLoading, postLoading } = useTweetContext();
  const { user } = useUserContext();

  useEffect(() => {
    setPostLoading(false);
  }, [globalTweets, setPostLoading]);

  if (!user) return null;

  return (
    <>
      {logoutModal && (
        <Logout isOpen={logoutModal} setLogoutModal={setLogoutModal} />
      )}
      <div className={`${styles.feed} bg-black`}>
        <div className={styles.mob_top_nav}>
          <div className={styles.flex_top}>
            <Avatar
              onClick={() => setLogoutModal(true)}
              src={getPublicImageUrl(user.profileImg)}
            />
            <div className={styles.logo}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <g>
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </g>
              </svg>
            </div>
          </div>
        </div>

        <div className={styles.top_navigation}>
          <div
            onClick={() => setActiveTab("foryou")}
            className={`${styles.navigation} ${
              activeTab === "foryou" ? styles.navigation_isActive : ""
            }`}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && setActiveTab("foryou")}
          >
            <span className={styles.name_span}>For you</span>
          </div>
          <div
            onClick={() => setActiveTab("following")}
            className={`${styles.navigation} ${
              activeTab === "following" ? styles.navigation_isActive : ""
            }`}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && setActiveTab("following")}
          >
            <span className={styles.name_span}>Following</span>
          </div>
        </div>

        <ComposeTweet user={user} variant="feed" />
        {postLoading && <ContentBuffer />}
        {activeTab === "following" ? (
          <FollowingFeed />
        ) : (
          globalTweets.map((tweet) => (
            <Post
              key={tweet._id}
              avatar={getPublicImageUrl(tweet.userId.profileImg)}
              displayName={tweet.userId.name}
              verified="verified"
              userName={tweet.userId.username}
              captionText={tweet.tweetText}
              media={tweet.tweetMedia?.url || undefined}
              postId={tweet._id}
              postLikes={tweet.likes}
            />
          ))
        )}
        <MobileNav />
      </div>
    </>
  );
}

export default Feed;
