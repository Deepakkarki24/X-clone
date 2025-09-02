import React, { useEffect, useContext, useState } from "react";
import SideBar from "./SideBar";
import SidebarRight from "./SidebarRight";
import { UserContext } from "../../context/UserContext";
import { Outlet, useNavigate } from "react-router-dom";
import LoadingPage from "../LoadingPage";
import Logout from "../auth/Logout";

const Layout = () => {
  let navigate = useNavigate();

  let { user, isloading } = useContext(UserContext);

  let [logoutModal, setLogoutModal] = useState(false);

  return (
    <>
      {isloading && <LoadingPage />}

      <div className="layout_bx flex bg-black px-10">
        <nav className="flex-3/12 border-r-[1px] border-[var(--border-line-color)] min-h-screen">
          <SideBar user={user} setLogoutModal={setLogoutModal} />
        </nav>
        <main className="flex-2/4 border-x-[1px] border-[var(--border-line-color)] min-h-screen">
          <Outlet />
        </main>
        <section className="flex-3/12">
          <SidebarRight />
        </section>
        {logoutModal && <Logout setLogoutModal={setLogoutModal} />}
      </div>
    </>
  );
};

export default Layout;
