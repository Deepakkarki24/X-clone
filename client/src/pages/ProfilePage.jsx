import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import ContentBuffer from "../components/ContentBuffer";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import styles from "../components/post/Feed.module.css";

import coverImg from "../assets/anime1.jpg";
import profileImg from "../assets/profile.jpg";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import { TweetContext } from "../context/TweetContext";
import Post from "../components/post/Post";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const { token, user } = useContext(UserContext);
  const { tweets } = useContext(TweetContext);

  let initialTabs = [
    { tabname: "posts", isActive: true, posts: true },
    { tabname: "replies", isActive: false, replies: false },
    { tabname: "highlights", isActive: false, highlights: false },
    { tabname: "articles", isActive: false, articles: false },
    { tabname: "media", isActive: false, media: false },
  ];

  const [tabs, setTabs] = useState(() => initialTabs);

  const handleTabs = (i) => {
    setTabs((prevTabs) =>
      prevTabs.map((tab, index) => ({
        ...tab,
        isActive: index === i ? true : false,
        [tab.tabname]: index === i ? true : false,
      }))
    );
  };

  useEffect(() => {
    if (token) {
      api
        .get(`/get-user-details`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          setTimeout(() => {
            setProfileData(res.data.data);
          }, 100);
        })
        .catch((err) => err);
    }
  }, [token]);

  return (
    <section className="profile_container bg-black relative w-full border-[1px] border-[var(--border-line-color)]">
      {profileData ? (
        <>
          <div className="upr_sec relative w-full">
            <div className="head flex gap-1 py-1 px-1">
              <div
                onClick={() => navigate(-1)}
                className="icon_bx py-2 px-4 cursor-pointer text-white"
              >
                <KeyboardBackspaceIcon fontSize="small" />
              </div>
              <div className="profile_name text-[18px] text-white font-semibold">
                <span>{profileData.name}</span>
              </div>
            </div>
            <div className="img_container relative">
              <div className="cvr_img">
                <img
                  className="h-48 w-full object-center object-cover"
                  src={coverImg}
                  alt="image"
                />
              </div>
              <div className="profile_img relative flex justify-end">
                <img
                  className="w-[22%] left-4 absolute -top-1/1 rounded-full border-2 border-black"
                  src={profileImg}
                  alt="image"
                />
                <span className="edit_bx p-3 text-white font-semibold text-[15px]">
                  <button className="cursor-pointer px-5 py-2 border-[1px] rounded-3xl border-amber-50">
                    Edit profile
                  </button>
                </span>
              </div>
            </div>
            <div className="userInfo relative text-[var(--primary-color-two)] w-full px-4 py-1">
              <div className="info_bx text-[var(--primary-color-two)] leading-[normal]">
                <div className="name text-[20px] font-bold">
                  {profileData && profileData.name}
                </div>
                <span className="username text-[14px] text-[var(--fade-text-color)]">
                  @{profileData && profileData.username}
                </span>
              </div>
              <div className="bio mt-2 text-[14px]">
                <span>This is my Bio...</span>
              </div>
              <div className="user_prsnl_dets mt-2 text-[var(--fade-text-color)] text-[14px] flex gap-2">
                <span className="location">
                  <span>
                    <PlaceOutlinedIcon />
                  </span>{" "}
                  New delhi, India
                </span>
                <span className="dob">
                  <span>
                    <CakeOutlinedIcon />
                  </span>
                  Date of birth
                </span>
              </div>
              <div className="userFollows text-[14px] flex gap-4 mt2">
                <span className="font-bold ">
                  0{" "}
                  <span className="font-semibold text-[var(--fade-text-color)]">
                    Following
                  </span>
                </span>
                <span className="font-bold ">
                  0{" "}
                  <span className="font-semibold text-[var(--fade-text-color)]">
                    Followers
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div className="nav_tabs">
            <div className={styles.top_navigation}>
              {tabs &&
                tabs.map((tab, index) => (
                  <div
                    key={index}
                    onClick={() => handleTabs(index)}
                    className={`${styles.navigation} ${
                      tab.isActive ? styles.navigation_isActive : ""
                    }
                  }
                  
                  `}
                  >
                    <span className={styles.name_span}>
                      {tab.tabname[0].toUpperCase() + tab.tabname.slice(1)}
                    </span>
                  </div>
                ))}
            </div>
          </div>
          {
            <div className="posts">
              {tweets ? (
                tweets.map((tweet, index) => (
                  <Post
                    key={index}
                    avatar={profileImg}
                    displayName={user && user.name}
                    verified="verified"
                    userName={user && user.username}
                    captionText={tweet.tweetText}
                    media={tweet.tweetMedia.url}
                  />
                ))
              ) : (
                <ContentBuffer />
              )}
            </div>
          }
        </>
      ) : (
        <ContentBuffer />
      )}
    </section>
  );
};

export default ProfilePage;
