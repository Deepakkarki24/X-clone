import React, { useEffect, useContext, useState } from "react";
import SideBar from "./SideBar";
import Feed from "../post/Feed";
import SidebarRight from "./SidebarRight";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../LoadingPage";
import Logout from "../auth/Logout";

// import { TweetContext } from "../../context/TweetContext";

const Layout = () => {
  let { token, tokenLoading } = useContext(UserContext);
  let navigate = useNavigate();

  let [logoutModal, setLogoutModal] = useState(false);

  useEffect(() => {
    if (!tokenLoading && !token) {
      navigate("/login");
    }
  }, [tokenLoading, token]);

  if (tokenLoading) return <LoadingPage />;
  return (
    <div className="layout_bx flex px-12 bg-black">
      <SideBar setLogoutModal={setLogoutModal} />
      <Feed />
      <SidebarRight />
      {logoutModal && <Logout setLogoutModal={setLogoutModal} />}
    </div>
  );
};

export default Layout;
