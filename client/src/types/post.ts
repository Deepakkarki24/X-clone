import type { User } from "./user";

export interface TweetMedia {
  url: string;
  public_id?: string;
}

export interface Post {
  _id: string;
  userId: User;
  tweetText: string;
  tweetMedia: TweetMedia;
  likes: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface TweetFormState {
  tweetText: string;
  tweetMedia: File | null;
}

export const initialTweetFormState: TweetFormState = {
  tweetText: "",
  tweetMedia: null,
};
