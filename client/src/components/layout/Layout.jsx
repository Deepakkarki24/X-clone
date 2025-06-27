import React, { useEffect, useContext, useState } from "react";
import SideBar from "./SideBar";
import Feed from "../post/Feed";
import SidebarRight from "./SidebarRight";
import { UserContext } from "../../context/UserContext";
import { Outlet, useNavigate } from "react-router-dom";
import LoadingPage from "../LoadingPage";
import Logout from "../auth/Logout";
import ProfilePage from "../../pages/ProfilePage";

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
      <nav className="flex-1/12">
        <SideBar setLogoutModal={setLogoutModal} />
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
