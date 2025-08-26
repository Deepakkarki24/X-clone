import { createContext, useEffect, useState } from "react";
import img from "../assets/post.jpg";
import api from "../services/api";

export let TweetContext = createContext();

const TweetContextProvider = ({ children }) => {
  let initialState = {
    tweetText: "",
    tweetMedia: null,
  };

  const [addedPost, setAddedPost] = useState(false);
  const [tweet, setTweet] = useState(() => initialState);
  const [postLoading, setPostLoading] = useState(false);

  // const API_URL = import.meta.env.VITE_API_URL;

  // all tweets list
  const [globalTweets, setGlobalTweets] = useState([]);
  const [userTweets, setUserTweets] = useState([]);

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
        }
      })
      .catch((err) => console.log(err));

    setTweet(initialState);
  };

  useEffect(() => {
    api.get("/get-all-posts", { withCredentials: true }).then((res, req) => {
      setGlobalTweets([...res.data.data]);
      setAddedPost(false);
    });
  }, [addedPost]);

  useEffect(() => {
    api.get("/get-user-posts", { withCredentials: true }).then((res, req) => {
      setUserTweets([...res.data.data]);
    });
  }, [addedPost]);

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
      }}
    >
      {children}
    </TweetContext.Provider>
  );
};

export default TweetContextProvider;
