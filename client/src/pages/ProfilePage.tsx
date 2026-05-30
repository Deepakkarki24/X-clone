import { useState } from "react";
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import ContentBuffer from "../components/ContentBuffer";
import Post from "../components/post/Post";
import Modal from "../components/Modal";
import MobileNav from "../components/MobileNav";
import { useUserContext } from "../context/hooks/useUserContext";
import { useTweetContext } from "../context/hooks/useTweetContext";
import { getPublicImageUrl } from "../utils/mediaUrl";

interface ProfileTab {
  tabname: string;
  isActive: boolean;
}

const initialTabs: ProfileTab[] = [
  { tabname: "posts", isActive: true },
  { tabname: "replies", isActive: false },
  { tabname: "highlights", isActive: false },
  { tabname: "articles", isActive: false },
  { tabname: "media", isActive: false },
];

const ProfilePage = () => {
  const [modalState, setModalState] = useState(false);
  const [tabs, setTabs] = useState(initialTabs);
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { userTweets } = useTweetContext();

  const handleTabs = (index: number) => {
    setTabs((prevTabs) =>
      prevTabs.map((tab, i) => ({
        ...tab,
        isActive: i === index,
      })),
    );
  };

  return (
    <div className="relative min-h-screen bg-black text-white">
      <section className="profile_container bg-black relative w-full max-w-2xl mx-auto border border-[var(--border-line-color)] rounded-md overflow-hidden p-1 xs:px-2 sm:px-4 md:px-6 md:pt-2">
        {user ? (
          <>
            <div className="upr_sec relative w-full">
              <div className="head flex items-center gap-2 py-2 px-1">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="icon_bx py-2 px-4 cursor-pointer text-white"
                >
                  <KeyboardBackspaceIcon fontSize="small" />
                </button>
                <div className="profile_name sm:text-lg md:text-xl text-white font-semibold truncate">
                  <span>{user.name}</span>
                </div>
              </div>
              <div className="img_container relative mt-1">
                <div className="cvr_img h-28 md:h-48 w-full overflow-hidden rounded-md">
                  <img
                    className="h-full w-full object-cover"
                    src={getPublicImageUrl(user.coverImg)}
                    alt="cover"
                  />
                </div>
                <div className="profile_img relative flex justify-end">
                  <img
                    className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-cover absolute left-4 -bottom-8 rounded-full border-2 border-black bg-black"
                    src={getPublicImageUrl(user.profileImg)}
                    alt="profile"
                  />
                  <span className="edit_bx p-3 ml-24 sm:ml-28 whitespace-nowrap text-white font-semibold text-xs md:text-base">
                    <button
                      type="button"
                      onClick={() => setModalState(true)}
                      className="cursor-pointer px-4 py-1 md:px-5 md:py-2 border-[1px] rounded-3xl border-amber-50 bg-black bg-opacity-60"
                    >
                      Edit profile
                    </button>
                  </span>
                </div>
              </div>
              <div className="userInfo mt-12 sm:mt-14 px-2 sm:px-4 py-2">
                <div className="info_bx leading-tight">
                  <div className="name text-base md:text-lg font-bold">
                    {user.name}
                  </div>
                  <span className="username text-sm md:text-base text-[var(--fade-text-color)] block">
                    @{user.username}
                  </span>
                </div>
                {user.bio && (
                  <div className="bio mt-2 text-sm md:text-base">
                    <span>{user.bio}</span>
                  </div>
                )}
                <div className="user_prsnl_dets mt-2 flex flex-wrap gap-x-3 gap-y-2 items-center text-[var(--fade-text-color)] text-sm">
                  {user.location && (
                    <span className="flex items-center gap-1">
                      <PlaceOutlinedIcon fontSize="inherit" />
                      {user.location}
                    </span>
                  )}
                </div>
                <div className="userFollows text-sm md:text-base flex gap-4 mt-2">
                  <span className="font-bold">
                    0
                    <span className="font-semibold text-[var(--fade-text-color)]">
                      {" "}
                      Following
                    </span>
                  </span>
                  <span className="font-bold">
                    0
                    <span className="font-semibold text-[var(--fade-text-color)]">
                      {" "}
                      Followers
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div className="nav_tabs border-b border-[var(--border-line-color)] px-2">
              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {tabs.map((tab, index) => (
                  <div
                    key={tab.tabname}
                    onClick={() => handleTabs(index)}
                    className={`px-2 py-2 text-xs sm:text-sm md:text-base whitespace-nowrap rounded-b-none rounded-t-lg font-semibold cursor-pointer transition-all
            ${
              tab.isActive
                ? "border-b-2 border-blue-500 bg-zinc-900 text-blue-400"
                : "text-zinc-400 hover:text-blue-400 hover:bg-zinc-900"
            }`}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && handleTabs(index)}
                  >
                    {tab.tabname[0].toUpperCase() + tab.tabname.slice(1)}
                  </div>
                ))}
              </div>
            </div>

            <div className="posts pb-4">
              {userTweets.length > 0 ? (
                userTweets.map((tweet) => (
                  <Post
                    key={tweet._id}
                    avatar={getPublicImageUrl(tweet.userId.profileImg)}
                    displayName={tweet.userId.name}
                    verified="verified"
                    userName={tweet.userId.username}
                    captionText={tweet.tweetText}
                    media={tweet.tweetMedia?.url || undefined}
                    postId={tweet._id}
                    postLikes={tweet.likes}
                  />
                ))
              ) : (
                <ContentBuffer />
              )}
            </div>
          </>
        ) : (
          <ContentBuffer />
        )}
        {modalState && (
          <Modal setModalState={setModalState} isOpen={modalState} />
        )}
      </section>
      <MobileNav />
    </div>
  );
};

export default ProfilePage;
