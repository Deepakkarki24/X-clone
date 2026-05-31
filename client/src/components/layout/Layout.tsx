import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import SidebarRight from "./SidebarRight";
import LoadingPage from "../LoadingPage";
import Logout from "../auth/Logout";
import { useUserContext } from "../../context/hooks/useUserContext";
import React from "react";

interface LayoutProps {
  logoutModal: boolean;
  setLogoutModal: (val: boolean) => void;
}

const Layout: React.FC<LayoutProps> = ({ setLogoutModal, logoutModal }) => {
  const { user, isLoading } = useUserContext();

  if (!user) return null;

  return (
    <>
      {isLoading && <LoadingPage />}

      {logoutModal && (
        <Logout isOpen={logoutModal} setLogoutModal={setLogoutModal} />
      )}

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
      </div>
    </>
  );
};

export default Layout;
