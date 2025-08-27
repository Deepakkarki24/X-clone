import React, { useContext, useRef, useState } from "react";
import styles from "./Feed.module.css";
import Avatar from "@mui/material/Avatar";
import Button from "../ButtonB&W";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import GifBoxOutlinedIcon from "@mui/icons-material/GifBoxOutlined";
import { TweetContext } from "../../context/TweetContext";

const TweetBox = ({ user, API_URL }) => {
  const { handleChange, tweetText, sendTweet } = useContext(TweetContext);
  return (
    <>
      <div className={styles.post_section}>
        <form onSubmit={sendTweet}>
          <div className={styles.user_input}>
            <div className="user_img w-[45px] ">
              <Avatar
                src={`${API_URL.replace(/\/$/, "")}/public/images/${
                  user.profileImg
                }`}
              />
            </div>

            <textarea
              className={`${styles.form_control} text-indent-none p-2 resize-none`}
              name="tweetText"
              value={tweetText}
              onChange={handleChange}
              placeholder="What is happening?!"
              autoComplete="off"
            ></textarea>
          </div>

          <div className={styles.user_actions}>
            <div className={styles.upload_actions}>
              <div className={styles.icon_box}>
                <div className={styles.inner_rapper}>
                  <AttachFileIcon
                    fontSize="small"
                    className={styles.fileIcon}
                  />
                  <small className={styles.tooltip}>Media</small>
                  <input
                    name="tweetMedia"
                    type="file"
                    accept="image/*"
                    className={styles.support_inputbtn}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.inner_rapper}>
                  <SentimentSatisfiedAltIcon
                    fontSize="small"
                    className={styles.fileIcon}
                  />
                  <small className={styles.tooltip}>Emoji</small>
                </div>
                <div className={styles.inner_rapper}>
                  <GifBoxOutlinedIcon
                    fontSize="small"
                    className={styles.fileIcon}
                  />
                  <small className={styles.tooltip}>Gif</small>
                </div>
              </div>
            </div>
            <button
              onClick={sendTweet}
              type="submit"
              className="opacity-100  transition-all cursor-pointer font-bold rounded-3xl bg-[#fff] text-black text-center w-[15%] p-1"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default TweetBox;
