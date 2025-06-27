import { createContext, useEffect, useState } from "react";
import img from "../assets/post.jpg";
import axios from "axios";
export let TweetContext = createContext();

const TweetContextProvider = ({ children }) => {
  let initialState = {
    tweetText: "",
    tweetMedia: null,
  };

  let initialTweet = {
    tweetText: " Testingg...🤺",
    tweetMedia: {
      url: img,
    },
  };

  const [addedPost, setAddedPost] = useState(false);
  const [tweet, setTweet] = useState(() => initialState);
  const [postLoading, setPostLoading] = useState(false);

  // all tweets list
  const [tweets, setTweets] = useState([]);

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

    const API_URL = process.env.REACT_APP_API_URL;

    axios
      .post(`${API_URL}/add-tweet`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
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
    axios.get(`${API_URL}/get-posts`).then((res, req) => {
      setTweets([...res.data.data, initialTweet]);

      setAddedPost(false);
    });
  }, [addedPost]);
  return (
    <TweetContext.Provider
      value={{
        handleChange,
        tweetText,
        tweetMedia,
        sendTweet,
        tweets,
        setPostLoading,
        postLoading,
      }}
    >
      {children}
    </TweetContext.Provider>
  );
};

export default TweetContextProvider;
