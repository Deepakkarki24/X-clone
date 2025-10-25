import React, { useContext } from "react";
import styles from "./post/Feed.module.css";
import Avatar from "@mui/material/Avatar";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import GifBoxOutlinedIcon from "@mui/icons-material/GifBoxOutlined";
import { TweetContext } from "../context/TweetContext";
import { UserContext } from "../context/UserContext";
import MobileNav from "./MobileNav";

const MobilePostPage = () => {
  const { handleChange, tweetText, sendTweet } = useContext(TweetContext);
  const { user } = useContext(UserContext);
  const API_URL = import.meta.env.VITE_API_URL;
  return (
    <div className="inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 md:hidden">
      <div className="w-full rounded-t-3xl bg-black p-2 pt-4 pb-6 max-h-[90vh] overflow-y-auto sm:max-w-md mx-auto shadow-xl relative">
        {/* Close button for modal */}

        <form onSubmit={sendTweet}>
          {/* Input Area */}
          <div className={`${styles.user_input} flex items-start gap-4`}>
            <div className="user_img w-10 h-10 flex-shrink-0">
              <Avatar src={`${API_URL}public/images/${user.profileImg}`} />
            </div>
            <textarea
              className={`${styles.form_control} p-2 resize-none w-full text-base bg-zinc-800 rounded-xl min-h-[80px]`}
              name="tweetText"
              value={tweetText}
              onChange={handleChange}
              placeholder="What is happening?!"
              autoComplete="off"
              rows={2}
            ></textarea>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center mt-6">
            <div className="flex gap-3">
              <label className="relative flex flex-col items-center cursor-pointer">
                <AttachFileIcon fontSize="small" className={styles.fileIcon} />
                <input
                  name="tweetMedia"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleChange}
                />
                <small className={styles.tooltip}>Media</small>
              </label>
              <span className="flex flex-col items-center">
                <SentimentSatisfiedAltIcon
                  fontSize="small"
                  className={styles.fileIcon}
                />
                <small className={styles.tooltip}>Emoji</small>
              </span>
              <span className="flex flex-col items-center">
                <GifBoxOutlinedIcon
                  fontSize="small"
                  className={styles.fileIcon}
                />
                <small className={styles.tooltip}>Gif</small>
              </span>
            </div>
            <button
              onClick={sendTweet}
              type="submit"
              className="font-bold rounded-3xl bg-white text-black px-6 py-2 text-base"
            >
              Post
            </button>
          </div>
        </form>
      </div>
      <MobileNav />
    </div>
  );
};

export default MobilePostPage;
