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
    tweetMedia: img,
  };

  const [addedPost, setAddedPost] = useState(false);
  const [tweet, setTweet] = useState(() => initialState);

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

    let newTweet = {
      tweetText: tweet.tweetText,
      tweetMedia: tweet.tweetMedia
        ? URL.createObjectURL(tweet.tweetMedia)
        : null,
    };

    if (!newTweet.tweetMedia && !newTweet.tweetText) return;

    axios
      .post("http://localhost:3001/add-tweet", newTweet)
      .then((res) => {
        if (res) {
          setAddedPost(true);
        }
      })
      .catch((err) => console.log(err));

    setTweet(initialState);
  };

  useEffect(() => {
    axios.get("http://localhost:3001/get-posts").then((res, req) => {
      // res.data.data.map((item) => {
      //   let post = {
      //     tweetText: item.tweetText,
      //     tweetMedia: item.tweetMedia,
      //   };

      //   setTweets([...tweets, post]);
      // });

      setTweets([...res.data.data, initialTweet]);

      setAddedPost(false);
    });
  }, [addedPost]);
  return (
    <TweetContext.Provider
      value={{ handleChange, tweetText, tweetMedia, sendTweet, tweets }}
    >
      {children}
    </TweetContext.Provider>
  );
};

export default TweetContextProvider;
