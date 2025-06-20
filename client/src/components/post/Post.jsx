import Avatar from "@mui/material/Avatar";
import React from "react";
import styles from "../../components/post/Post.module.css";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";
import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";

function Post({ avatar, displayName, userName, verified, captionText, media }) {
  return (
    <div className={styles.post_wrapper}>
      <div className={styles.post_box}>
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
          <MoreHoriz className={styles.more_icon} />
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
              <small className="text-gray-500 text-center p-2">24.2k</small>
            </div>
            <div className={styles.action_icon_box}>
              <AutorenewOutlinedIcon
                className={styles.engagement_action_icon}
              />
              <small className={styles.tooltip}>Repost</small>
              <small className="text-gray-500 text-center p-2">12.2k</small>
            </div>
            <div className={styles.action_icon_box}>
              <FavoriteBorderIcon className={styles.engagement_action_icon} />
              <small className={styles.tooltip}>Like</small>
              <small className="text-gray-500 text-center p-2">245.2k</small>
            </div>
            <div className={styles.action_icon_box}>
              <IosShareOutlinedIcon className={styles.engagement_action_icon} />
              <small className={styles.tooltip}>Share</small>
              <small className="text-gray-500 text-center p-2">2.2k</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
