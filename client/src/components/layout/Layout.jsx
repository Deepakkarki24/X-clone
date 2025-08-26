import React, { useEffect, useContext, useState } from "react";
import SideBar from "./SideBar";
import SidebarRight from "./SidebarRight";
import { UserContext } from "../../context/UserContext";
import { TweetContext } from "../../context/TweetContext";
import { Outlet, useNavigate } from "react-router-dom";
import LoadingPage from "../LoadingPage";
import Logout from "../auth/Logout";

const Layout = () => {
  let navigate = useNavigate();

  let { user } = useContext(UserContext);

  let [logoutModal, setLogoutModal] = useState(false);

  return (
    <div className="layout_bx flex px-12 bg-black">
      <nav className="flex-1/12">
        <SideBar user={user} setLogoutModal={setLogoutModal} />
      </nav>
      <main className="flex-1/3">
        <Outlet />
      </main>
      <section className="flex-1/6">
        <SidebarRight />
      </section>
      {logoutModal && <Logout setLogoutModal={setLogoutModal} />}
    </div>
  );
};

export default Layout;
