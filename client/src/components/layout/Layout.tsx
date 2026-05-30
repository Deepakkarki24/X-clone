import { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import SidebarRight from "./SidebarRight";
import LoadingPage from "../LoadingPage";
import Logout from "../auth/Logout";
import { useUserContext } from "../../context/hooks/useUserContext";

const Layout = () => {
  const { user, isLoading } = useUserContext();
  const [logoutModal, setLogoutModal] = useState(false);

  if (!user) return null;

  return (
    <>
      {isLoading && <LoadingPage />}

      <div className="layout_bx bg-black min-h-screen flex flex-col md:flex-row px-2 md:px-6 lg:px-10">
        <nav className="w-full md:w-1/4 lg:w-1/5 border-b md:border-b-0 md:border-r border-[var(--border-line-color)]">
          <SideBar user={user} setLogoutModal={setLogoutModal} />
        </nav>
        <main className="w-full mb-20 md:mb-0 lg:mb-0 md:w-1/2 border-b md:border-b-0 border-x border-[var(--border-line-color)] min-h-[60vh]">
          <Outlet />
        </main>
        <section className="w-full md:w-1/4 lg:w-1/5">
          <SidebarRight />
        </section>
        {logoutModal && <Logout setLogoutModal={setLogoutModal} />}
      </div>
    </>
  );
};

export default Layout;
