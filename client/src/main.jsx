import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import TweetContextProvider from "./context/TweetContext.jsx";
import UserContextProvider from "./context/UserContext.jsx";

createRoot(document.getElementById("root")).render(
  <UserContextProvider>
    <TweetContextProvider>
      <App />
    </TweetContextProvider>
  </UserContextProvider>
);
