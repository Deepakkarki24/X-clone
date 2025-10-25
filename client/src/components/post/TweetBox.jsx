import React, { useContext } from "react";
import styles from "./Feed.module.css";
import Avatar from "@mui/material/Avatar";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import GifBoxOutlinedIcon from "@mui/icons-material/GifBoxOutlined";
import { TweetContext } from "../../context/TweetContext";

const TweetBox = ({ user, API_URL }) => {
  const { handleChange, tweetText, sendTweet } = useContext(TweetContext);
  return (
    <>
      <div
        className={`${styles.post_section} bg-black w-full max-w-2xl px-2 md:px-6 py-3 rounded-xl mx-auto`}
      >
        <form onSubmit={sendTweet}>
          {/* Input Area */}
          <div className={`${styles.user_input} flex items-start gap-4`}>
            <div className="user_img w-10 h-10 md:w-12 md:h-12 flex-shrink-0">
              <Avatar
                src={`${API_URL?.replace(/\/$/, "")}/public/images/${
                  user?.profileImg
                }`}
              />
            </div>
            <textarea
              className={`${styles.form_control} p-2 resize-none w-full text-sm md:text-base`}
              name="tweetText"
              value={tweetText}
              onChange={handleChange}
              placeholder="What is happening?!"
              autoComplete="off"
              rows={2}
            ></textarea>
          </div>

          {/* Actions */}
          <div
            className={`${styles.user_actions} flex flex-col w-full md:flex-row items-end justify-between gap-2 mt-2`}
          >
            <div className={`${styles.upload_actions} flex gap-2`}>
              <div className={styles.icon_box}>
                <div className={`${styles.inner_rapper} relative`}>
                  <AttachFileIcon
                    fontSize="small"
                    className={styles.fileIcon}
                  />
                  <small className={styles.tooltip}>Media</small>
                  <label className="absolute bottom-0 w-full h-full right-0 px-2 py-1 rounded cursor-pointer">
                    <input
                      name="tweetMedia"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleChange}
                    />
                  </label>
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
              className="opacity-100 transition-all cursor-pointer font-bold rounded-3xl bg-white text-black text-center w-full md:w-32 p-2 md:p-1 text-sm md:text-base mt-2 md:mt-0"
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
