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
    <div className="p-3 sm:p-5 border-b border-[var(--border-line-color)] hover:bg-zinc-900 w-full max-w-xl mx-auto">
      <div>
        {/* Post Header */}
        <div
          className={`${styles.post_header} flex justify-between gap-x-2 items-center`}
        >
          <div
            className={`${styles.user_det} flex items-center gap-x-2 flex-wrap min-w-0`}
          >
            <div className="avatar w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex-shrink-0">
              <Avatar src={avatar} sx={{ width: "100%", height: "100%" }} />
            </div>
            <div
              className={`${styles.display_name} text-sm sm:text-base md:text-lg font-semibold truncate`}
            >
              <h3>{displayName}</h3>
            </div>
            {verified && (
              <div className="verified_icon flex items-center ml-1">
                <VerifiedOutlinedIcon
                  className={`${styles.verified_ico} text-xs sm:text-base`}
                />
              </div>
            )}
            <div
              className={`${styles.user_name} text-xs sm:text-sm text-gray-500 ml-1 truncate`}
            >
              <h4>@{userName}</h4>
            </div>
          </div>
          <MoreHoriz className="text-zinc-300 cursor-pointer" />
        </div>
        {/* Post Content */}
        <div className={`${styles.post_content} mt-2`}>
          <div className={`${styles.caption}`}>
            <p className="mb-2 text-sm sm:text-base break-words">
              {captionText}
            </p>
          </div>
          {media && (
            <div className={`${styles.post} mb-2 w-full`}>
              <img
                src={media}
                alt="post"
                className="max-w-full w-full h-auto rounded-xl object-cover"
                style={{ aspectRatio: "16/9" }}
              />
            </div>
          )}
          {/* Engagement Actions */}
          <div
            className={`${styles.engagement_action_box} flex gap-2 sm:gap-4 mt-2 flex-wrap`}
          >
            <div
              className={`${styles.action_icon_box} flex flex-col items-center w-1/5 min-w-[60px]`}
            >
              <ChatBubbleOutlineOutlinedIcon
                className={`${styles.engagement_action_icon} text-base sm:text-lg`}
              />
              <small className="text-gray-500 text-center text-xs sm:text-sm pt-1">
                Comment
              </small>
            </div>
            <div
              className={`${styles.action_icon_box} flex flex-col items-center w-1/5 min-w-[60px]`}
            >
              <AutorenewOutlinedIcon
                className={`${styles.engagement_action_icon} text-base sm:text-lg`}
              />
              <small className="text-gray-500 text-center text-xs sm:text-sm pt-1">
                Repost
              </small>
            </div>
            <div
              onClick={() => handleLike(postId)}
              className={`${styles.action_icon_box} flex flex-col items-center w-1/5 min-w-[60px] cursor-pointer`}
            >
              {postLikes && postLikes.includes(user._id) ? (
                <FavoriteIcon
                  className={`${styles.engagement_action_icon} text-base sm:text-lg text-pink-500`}
                />
              ) : (
                <FavoriteBorderIcon
                  className={`${styles.engagement_action_icon} text-base sm:text-lg`}
                />
              )}
              <small className="text-gray-500 text-center text-xs sm:text-sm pt-1">
                {postLikes && postLikes.length > 0 && postLikes.length}
              </small>
            </div>
            <div
              className={`${styles.action_icon_box} flex flex-col items-center w-1/5 min-w-[60px]`}
            >
              <IosShareOutlinedIcon
                className={`${styles.engagement_action_icon} text-base sm:text-lg`}
              />
              <small className="text-gray-500 text-center text-xs sm:text-sm pt-1">
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
