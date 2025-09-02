import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";

export let TweetContext = createContext();

const TweetContextProvider = ({ children }) => {
  let initialState = {
    tweetText: "",
    tweetMedia: null,
  };

  const [addedPost, setAddedPost] = useState(false);
  const [tweet, setTweet] = useState(() => initialState);
  const [postLoading, setPostLoading] = useState(false);

  // all tweets list
  const [globalTweets, setGlobalTweets] = useState([]);
  const [userTweets, setUserTweets] = useState([]);

  const { user } = useContext(UserContext);

  const handleChange = (e) => {
    let { name, value, files } = e.target;

    if (name === "tweetMedia") {
      setTweet((prev) => ({
        ...prev,
        tweetMedia: files[0],
      }));
    } else {
      setTweet((prev) => ({ ...prev, [name]: value }));
    }
  };

  const { tweetText, tweetMedia } = tweet;

  const sendTweet = (e) => {
    e.preventDefault();

    if (!tweetMedia && !tweetText) return;

    const formData = new FormData();

    formData.append("tweetText", tweetText);
    if (tweetMedia) {
      formData.append("tweetMedia", tweetMedia);
    }

    try {
      api
        .post(
          "/add-tweet",
          formData,
          { withCredentials: true },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          if (res.data.success) {
            setAddedPost(true);
            setPostLoading(true);
            toast.success(res.data.message);
          } else {
            toast.error("error while posting!");
          }
        })
        .catch((err) => toast.error(err.message));

      setTweet(initialState);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleLike = async (id) => {
    api
      .get(`/like-post/${id}`, { withCredentials: true })
      .then((res) => {
        if (res.data.success) {
          setGlobalTweets((prev) =>
            prev.map((tweet) =>
              tweet._id === id
                ? { ...tweet, likes: res.data.data.likes }
                : tweet
            )
          );
          setUserTweets((prev) =>
            prev.map((tweet) =>
              tweet._id === id
                ? { ...tweet, likes: res.data.data.likes }
                : tweet
            )
          );
        }
      })
      .catch((err) => toast.error(err.messsage));
  };

  useEffect(() => {
    try {
      user &&
        api
          .get("/get-all-posts", { withCredentials: true })
          .then((res, req) => {
            setGlobalTweets([...res.data.data]);
            setAddedPost(false);
            setPostLoading(false);
          });
    } catch (err) {
      toast.error(err.message);
    }
  }, [addedPost, user]);

  useEffect(() => {
    try {
      user &&
        api
          .get("/get-user-posts", { withCredentials: true })
          .then((res, req) => {
            setUserTweets([...res.data.data]);
          });
    } catch (err) {
      toast.error(err.message);
    }
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
