import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const { token } = useContext(UserContext);
  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:3001/get-user-details", {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          setProfileData(res.data.data);
        })
        .catch((err) => err);
    }
  }, [token]);

  return (
    <div className="h-[100vh] w-full flex items-center justify-center border-2 border-amber-300 text-white bg-black">
      <div>
        {profileData ? (
          <div>
            <h2>{profileData.name}</h2>
            <p>@{profileData.username}</p>
            <p>{profileData.email}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ProfilePage;
