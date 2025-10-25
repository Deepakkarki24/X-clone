import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import ContentBuffer from "../components/ContentBuffer";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import styles from "../components/post/Feed.module.css";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import { TweetContext } from "../context/TweetContext";
import Post from "../components/post/Post";
import Modal from "../components/Modal.jsx";
import MobileNav from "../components/MobileNav.jsx";

const ProfilePage = () => {
  const [modalState, setModalState] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { userTweets } = useContext(TweetContext);

  let initialTabs = [
    { tabname: "posts", isActive: true, posts: true },
    { tabname: "replies", isActive: false, replies: false },
    { tabname: "highlights", isActive: false, highlights: false },
    { tabname: "articles", isActive: false, articles: false },
    { tabname: "media", isActive: false, media: false },
  ];

  const [tabs, setTabs] = useState(() => initialTabs);
  const API_URL = import.meta.env.VITE_API_URL;

  const handleTabs = (i) => {
    setTabs((prevTabs) =>
      prevTabs.map((tab, index) => ({
        ...tab,
        isActive: index === i ? true : false,
        [tab.tabname]: index === i ? true : false,
      }))
    );
  };

  return (
    <div className="relative min-h-screen bg-black text-white">
      <section className="profile_container bg-black relative w-full max-w-2xl mx-auto border border-[var(--border-line-color)] rounded-md overflow-hidden p-1 xs:px-2 sm:px-4 md:px-6 md:pt-2">
        {user ? (
          <>
            <div className="upr_sec relative w-full">
              {/* Header */}
              <div className="head flex items-center gap-2 py-2 px-1">
                <div
                  onClick={() => navigate(-1)}
                  className="icon_bx py-2 px-4 cursor-pointer text-white"
                >
                  <KeyboardBackspaceIcon fontSize="small" />
                </div>
                <div className="profile_name sm:text-lg md:text-xl text-white font-semibold truncate">
                  <span>{user.name}</span>
                </div>
              </div>
              {/* Cover/Profile Images */}
              <div className="img_container relative mt-1">
                <div className="cvr_img h-28 md:h-48 w-full overflow-hidden rounded-md">
                  <img
                    className="h-full w-full object-cover"
                    src={`${API_URL.replace(/\/$/, "")}/public/images/${
                      user.coverImg
                    }`}
                    alt="image"
                  />
                </div>
                <div className="profile_img relative flex justify-end">
                  <img
                    className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-cover absolute left-4 -bottom-8 rounded-full border-2 border-black bg-black"
                    src={`${API_URL.replace(/\/$/, "")}/public/images/${
                      user.profileImg
                    }`}
                    alt="image"
                  />
                  <span className="edit_bx p-3 ml-24 sm:ml-28 whitespace-nowrap text-white font-semibold text-xs md:text-base">
                    <button
                      onClick={() => setModalState(true)}
                      className="cursor-pointer px-4 py-1 md:px-5 md:py-2 border-[1px] rounded-3xl border-amber-50 bg-black bg-opacity-60"
                    >
                      Edit profile
                    </button>
                  </span>
                </div>
              </div>
              {/* Info */}
              <div className="userInfo mt-12 sm:mt-14 px-2 sm:px-4 py-2">
                <div className="info_bx leading-tight">
                  <div className="name text-base md:text-lg font-bold">
                    {user && user.name}
                  </div>
                  <span className="username text-sm md:text-base text-[var(--fade-text-color)] block">
                    @{user && user.username}
                  </span>
                </div>
                {user.bio && (
                  <div className="bio mt-2 text-sm md:text-base">
                    <span>{user && user.bio}</span>
                  </div>
                )}
                <div className="user_prsnl_dets mt-2 flex flex-wrap gap-x-3 gap-y-2 items-center text-[var(--fade-text-color)] text-sm">
                  {user.location && (
                    <span className="flex items-center gap-1">
                      <PlaceOutlinedIcon fontSize="inherit" />
                      {user.location}
                    </span>
                  )}
                </div>
                <div className="userFollows text-sm md:text-base flex gap-4 mt-2">
                  <span className="font-bold">
                    0
                    <span className="font-semibold text-[var(--fade-text-color)]">
                      {" "}
                      Following
                    </span>
                  </span>
                  <span className="font-bold">
                    0
                    <span className="font-semibold text-[var(--fade-text-color)]">
                      {" "}
                      Followers
                    </span>
                  </span>
                </div>
              </div>
            </div>
            {/* Tabs */}
            <div className="nav_tabs border-b border-[var(--border-line-color)] px-2">
              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {tabs &&
                  tabs.map((tab, index) => (
                    <div
                      key={index}
                      onClick={() => handleTabs(index)}
                      className={`px-2 py-2 text-xs sm:text-sm md:text-base whitespace-nowrap rounded-b-none rounded-t-lg font-semibold cursor-pointer transition-all
            ${
              tab.isActive
                ? "border-b-2 border-blue-500 bg-zinc-900 text-blue-400"
                : "text-zinc-400 hover:text-blue-400 hover:bg-zinc-900"
            }`}
                    >
                      {tab.tabname[0].toUpperCase() + tab.tabname.slice(1)}
                    </div>
                  ))}
              </div>
            </div>

            {/* Posts */}
            <div className="posts pb-4">
              {userTweets ? (
                userTweets.map((tweet, index) => (
                  <Post
                    key={index}
                    avatar={`${API_URL.replace(/\/$/, "")}/public/images/${
                      tweet.userId.profileImg
                    }`}
                    displayName={tweet.userId && tweet.userId.name}
                    verified="verified"
                    userName={tweet.userId && tweet.userId.username}
                    captionText={tweet.tweetText}
                    media={tweet.tweetMedia.url}
                    postId={tweet._id}
                    postLikes={tweet.likes}
                  />
                ))
              ) : (
                <ContentBuffer />
              )}
            </div>
          </>
        ) : (
          <ContentBuffer />
        )}
        {modalState && <Modal setModalState={setModalState} />}
      </section>
      <MobileNav />
    </div>
  );
};

export default ProfilePage;
