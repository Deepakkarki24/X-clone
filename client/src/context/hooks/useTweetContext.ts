import { useContext } from "react";
import { TweetContext } from "../TweetContext";

export const useTweetContext = () => {
  const context = useContext(TweetContext);
  if (!context) {
    throw new Error("useTweetContext must be used within TweetContextProvider");
  }
  return context;
};
