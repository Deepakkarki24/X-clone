import Avatar from "@mui/material/Avatar";
import styles from "../../components/post/Post.module.css";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";
import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";
import { useContext } from "react";
import { TweetContext } from "../../context/TweetContext";
import { UserContext } from "../../context/UserContext";

function Post({
  avatar,
  postId,
  displayName,
  userName,
  verified,
  captionText,
  media,
  postLikes,
}) {
  const { handleLike } = useContext(TweetContext);
  const { user } = useContext(UserContext);

  return (
    <div className="p-5 border-b-[1px] border-[var(--border-line-color)] hover:bg-zinc-900">
      <div>
        <div className={styles.post_header}>
          <div className={styles.user_det}>
            <div className="avatar">
              <Avatar src={avatar} />
            </div>
            <div className={styles.display_name}>
              <h3>{displayName}</h3>
            </div>
            <div className="verified_icon flex items-center">
              {verified && (
                <VerifiedOutlinedIcon className={styles.verified_ico} />
              )}
            </div>
            <div className={styles.user_name}>
              <h4>@{userName}</h4>
            </div>
          </div>
          <MoreHoriz className="text-zinc-300" />
        </div>
        <div className={styles.post_content}>
          <div className={styles.caption}>
            <p className="mb-2">{captionText}</p>
          </div>
          {media && (
            <div className={styles.post}>
              <img src={media} alt="post" />
            </div>
          )}
          <div className={styles.engagement_action_box}>
            <div className={styles.action_icon_box}>
              <ChatBubbleOutlineOutlinedIcon
                className={styles.engagement_action_icon}
              />
              <small className={styles.tooltip}>Comment</small>
              <small className="text-gray-500 text-center p-2">Comment</small>
            </div>
            <div className={styles.action_icon_box}>
              <AutorenewOutlinedIcon
                className={styles.engagement_action_icon}
              />
              <small className={styles.tooltip}>Repost</small>
              <small className="text-gray-500 text-center p-2">Repost</small>
            </div>
            <div
              onClick={() => handleLike(postId)}
              className={styles.action_icon_box}
            >
              {postLikes && postLikes.includes(user._id) ? (
                <FavoriteIcon className={styles.engagement_action_icon} />
              ) : (
                <FavoriteBorderIcon className={styles.engagement_action_icon} />
              )}
              <small className={styles.tooltip}>Like</small>
              <small className="text-gray-500 text-center p-2">
                {postLikes && postLikes.length > 0 && postLikes.length}
              </small>
            </div>
            <div className={styles.action_icon_box}>
              <IosShareOutlinedIcon className={styles.engagement_action_icon} />
              <small className={styles.tooltip}>Share</small>
              <small className="text-gray-500 text-center p-2">Share</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
