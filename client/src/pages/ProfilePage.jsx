import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import ContentBuffer from "../components/ContentBuffer";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

import coverImg from "../assets/anime1.jpg";
import profileImg from "../assets/profile.jpg";
import Button from "../components/ButtonB&W";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const [profileData, setProfileData] = useState(null);
  const { token } = useContext(UserContext);

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
    <section className="profile_container relative w-full border-[1px] border-[var(--border-line-color)] h-[100vh]">
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
            </div>
            <div className="userInfo relative w-full">
              <img
                className="w-[22%] absolute -bottom-1/3 left-4 rounded-full border-2 border-black"
                src={profileImg}
                alt="image"
              />

              <div className="info_bx text-white mt-10">
                <div className="name">{profileData && profileData.name}</div>
                <span className="usernam">
                  {profileData && profileData.username}
                </span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <ContentBuffer />
      )}
    </section>
  );
};

export default ProfilePage;
