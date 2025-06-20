import { createContext, useState } from "react";
import img from "../assets/post.jpg";

export let TweetContext = createContext();

const TweetContextProvider = ({ children }) => {
  let initialState = {
    tweetText: "",
    tweetMedia: null,
  };

  const [tweet, setTweet] = useState(() => initialState);

  // all tweets list
  const [tweets, setTweets] = useState([
    {
      tweetText: " Testingg...🤺",
      tweetMedia: img,
    },
  ]);

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

    let newTweet = {
      tweetText: tweet.tweetText,
      tweetMedia: tweet.tweetMedia
        ? URL.createObjectURL(tweet.tweetMedia)
        : null,
    };

    if (!newTweet.tweetMedia && !newTweet.tweetText) return;

    setTweets((prev) => [newTweet, ...prev]);

    setTweet(initialState);
  };
  return (
    <TweetContext.Provider
      value={{ handleChange, tweetText, tweetMedia, sendTweet, tweets }}
    >
      {children}
    </TweetContext.Provider>
  );
};

export default TweetContextProvider;
