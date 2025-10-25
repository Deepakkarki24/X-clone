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

  const API_URL = import.meta.env.VITE_API_URL;

  return (
    <div className="p-4 md:p-5 border-b border-[var(--border-line-color)] hover:bg-zinc-900 transition-all w-full max-w-xl mx-auto">
      <div>
        <div
          className={`${styles.post_header} flex flex-wrap gap-x-2 gap-y-1 items-center justify-between`}
        >
          <div
            className={`${styles.user_det} flex items-center gap-x-2 min-w-0`}
          >
            <div className="avatar w-10 h-10 md:w-12 md:h-12">
              <Avatar src={`${API_URL}public/images/${user.profileImg}`} />
            </div>
            <div
              className={`${styles.display_name} truncate text-base md:text-lg`}
            >
              <h3>{displayName}</h3>
            </div>
            <div className="verified_icon flex items-center ml-1">
              {verified && (
                <VerifiedOutlinedIcon
                  className={`${styles.verified_ico} text-base md:text-lg`}
                />
              )}
            </div>
            <div
              className={`${styles.user_name} text-gray-500 text-sm md:text-base ml-1 truncate`}
            >
              <h4>@{userName}</h4>
            </div>
          </div>
          <MoreHoriz className="text-zinc-300 cursor-pointer" />
        </div>

        <div className={`${styles.post_content} mt-2`}>
          <div className={`${styles.caption} mb-2`}>
            <p className="text-sm md:text-base">{captionText}</p>
          </div>
          {media && (
            <div className={`${styles.post} mb-2`}>
              <img
                src={media}
                alt="post"
                className="max-w-full h-auto rounded-xl"
                style={{ objectFit: "cover" }}
              />
            </div>
          )}
          <div className={`${styles.engagement_action_box} flex gap-4 mt-2`}>
            <div
              className={`${styles.action_icon_box} flex flex-col items-center`}
            >
              <ChatBubbleOutlineOutlinedIcon
                className={`${styles.engagement_action_icon} text-base md:text-lg`}
              />
              <small className="text-gray-500 text-center p-1 md:p-2">
                Comment
              </small>
            </div>
            <div
              className={`${styles.action_icon_box} flex flex-col items-center`}
            >
              <AutorenewOutlinedIcon
                className={`${styles.engagement_action_icon} text-base md:text-lg`}
              />
              <small className="text-gray-500 text-center p-1 md:p-2">
                Repost
              </small>
            </div>
            <div
              onClick={() => handleLike(postId)}
              className={`${styles.action_icon_box} flex flex-col items-center cursor-pointer`}
            >
              {postLikes && postLikes.includes(user._id) ? (
                <FavoriteIcon
                  className={`${styles.engagement_action_icon} text-base md:text-lg`}
                />
              ) : (
                <FavoriteBorderIcon
                  className={`${styles.engagement_action_icon} text-base md:text-lg`}
                />
              )}
              <small className="text-gray-500 text-center p-1 md:p-2">
                {postLikes && postLikes.length > 0 && postLikes.length}
              </small>
            </div>
            <div
              className={`${styles.action_icon_box} flex flex-col items-center`}
            >
              <IosShareOutlinedIcon
                className={`${styles.engagement_action_icon} text-base md:text-lg`}
              />
              <small className="text-gray-500 text-center p-1 md:p-2">
                Share
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
