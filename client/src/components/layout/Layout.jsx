import React, { useContext, useState } from "react";
import SideBar from "./SideBar";
import SidebarRight from "./SidebarRight";
import { UserContext } from "../../context/UserContext";
import { Outlet } from "react-router-dom";
import LoadingPage from "../LoadingPage";
import Logout from "../auth/Logout";

const Layout = () => {
  let { user, isloading } = useContext(UserContext);
  let [logoutModal, setLogoutModal] = useState(false);

  return (
    <>
      {isloading && <LoadingPage />}

      <div className="layout_bx bg-black min-h-screen flex flex-col md:flex-row px-2 md:px-6 lg:px-10">
        {/* Sidebar (Left) */}
        <nav className="w-full md:w-1/4 lg:w-1/5 border-b md:border-b-0 md:border-r border-[var(--border-line-color)]">
          <SideBar user={user} setLogoutModal={setLogoutModal} />
        </nav>
        {/* Main Content Area */}
        <main className="w-full md:w-1/2 border-b md:border-b-0 border-x border-[var(--border-line-color)] min-h-[60vh]">
          <Outlet />
        </main>
        {/* SidebarRight (Right) */}
        <section className="w-full md:w-1/4 lg:w-1/5">
          <SidebarRight />
        </section>
        {logoutModal && <Logout setLogoutModal={setLogoutModal} />}
      </div>
    </>
  );
};

export default Layout;
