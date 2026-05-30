import ComposeTweet from "./post/ComposeTweet";
import MobileNav from "./MobileNav";
import { useUserContext } from "../context/hooks/useUserContext";

const MobilePostPage = () => {
  const { user } = useUserContext();

  if (!user) return null;

  return (
    <div className="inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 md:hidden">
      <div className="w-full rounded-t-3xl bg-black p-2 pt-4 pb-6 max-h-[90vh] overflow-y-auto sm:max-w-md mx-auto shadow-xl relative">
        <ComposeTweet user={user} variant="mobile" />
      </div>
      <MobileNav />
    </div>
  );
};

export default MobilePostPage;
