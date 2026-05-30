import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Avatar from "@mui/material/Avatar";
import { useUserContext } from "../context/hooks/useUserContext";
import { getPublicImageUrl } from "../utils/mediaUrl";

const MobileNav = () => {
  const { user } = useUserContext();

  if (!user) return null;

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-black border-t border-zinc-800 flex justify-between items-center px-4 py-2 z-50 md:hidden">
      <NavLink
        to="/dashboard/feed"
        className="flex flex-col items-center text-zinc-300 hover:text-white"
      >
        <HomeIcon fontSize="large" />
        <span className="text-xs">Home</span>
      </NavLink>

      <NavLink
        to="/dashboard/post"
        className="flex flex-col items-center justify-center"
      >
        <div className="rounded-full bg-blue-600 p-2 shadow-md -mt-7 border-4 border-black">
          <AddCircleIcon style={{ fontSize: "2.5rem", color: "#fff" }} />
        </div>
      </NavLink>

      <NavLink
        to={`/dashboard/profile/${user.username}`}
        className="flex flex-col items-center text-zinc-300 hover:text-white"
      >
        <Avatar src={getPublicImageUrl(user.profileImg)} />
        <span className="text-xs">Profile</span>
      </NavLink>
    </nav>
  );
};

export default MobileNav;
