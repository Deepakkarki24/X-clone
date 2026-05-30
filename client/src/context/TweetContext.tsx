import {
  createContext,
  useContext,
  useEffect,
  useState,
  type FormEvent,
  type ChangeEvent,
  type ReactNode,
} from "react";
import { toast } from "react-toastify";
import api from "../services/api";
import { UserContext } from "./UserContext";
import type { ApiResponse } from "../types/api";
import type { Post, TweetFormState } from "../types/post";
import { initialTweetFormState } from "../types/post";

export interface TweetContextValue {
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  tweetText: string;
  tweetMedia: File | null;
  sendTweet: (e: FormEvent<HTMLFormElement>) => void;
  globalTweets: Post[];
  setPostLoading: React.Dispatch<React.SetStateAction<boolean>>;
  postLoading: boolean;
  userTweets: Post[];
  handleLike: (id: string) => void;
}

export const TweetContext = createContext<TweetContextValue | null>(null);

const TweetContextProvider = ({ children }: { children: ReactNode }) => {
  const [addedPost, setAddedPost] = useState(false);
  const [tweet, setTweet] = useState<TweetFormState>(initialTweetFormState);
  const [postLoading, setPostLoading] = useState(false);
  const [globalTweets, setGlobalTweets] = useState<Post[]>([]);
  const [userTweets, setUserTweets] = useState<Post[]>([]);

  const userContext = useContext(UserContext);
  const user = userContext?.user ?? null;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    if (name === "tweetMedia" && e.target instanceof HTMLInputElement) {
      const file = e.target.files?.[0];
      setTweet((prev) => ({ ...prev, tweetMedia: file ?? null }));
    } else {
      setTweet((prev) => ({ ...prev, [name]: value }));
    }
  };

  const { tweetText, tweetMedia } = tweet;

  const sendTweet = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!tweetMedia && !tweetText.trim()) return;

    const formData = new FormData();
    formData.append("tweetText", tweetText);
    if (tweetMedia) formData.append("tweetMedia", tweetMedia);

    api
      .post<ApiResponse<Post>>("/add-tweet", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        if (res.data.success) {
          setAddedPost(true);
          setPostLoading(true);
          toast.success(res.data.message);
        } else {
          toast.error("error while posting!");
        }
      })
      .catch((err: Error) => toast.error(err.message));

    setTweet(initialTweetFormState);
  };

  const handleLike = (id: string) => {
    api
      .get<ApiResponse<Post>>(`/like-post/${id}`, { withCredentials: true })
      .then((res) => {
        if (res.data.success && res.data.data) {
          const likes = res.data.data.likes;
          setGlobalTweets((prev) =>
            prev.map((t) => (t._id === id ? { ...t, likes } : t)),
          );
          setUserTweets((prev) =>
            prev.map((t) => (t._id === id ? { ...t, likes } : t)),
          );
        }
      })
      .catch((err: Error) => toast.error(err.message));
  };

  useEffect(() => {
    if (!user) return;

    api
      .get<ApiResponse<Post[]>>("/get-all-posts", { withCredentials: true })
      .then((res) => {
        if (res.data.data) {
          setGlobalTweets([...res.data.data]);
        }
        setAddedPost(false);
        setPostLoading(false);
      })
      .catch((err: Error) => toast.error(err.message));
  }, [addedPost, user]);

  useEffect(() => {
    if (!user) return;

    api
      .get<ApiResponse<Post[]>>("/get-user-posts", { withCredentials: true })
      .then((res) => {
        if (res.data.data) setUserTweets([...res.data.data]);
      })
      .catch((err: Error) => toast.error(err.message));
  }, [addedPost, user]);

  return (
    <TweetContext.Provider
      value={{
        handleChange,
        tweetText,
        tweetMedia,
        sendTweet,
        globalTweets,
        setPostLoading,
        postLoading,
        userTweets,
        handleLike,
      }}
    >
      {children}
    </TweetContext.Provider>
  );
};

export default TweetContextProvider;
