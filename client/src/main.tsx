import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import TweetContextProvider from "./context/TweetContext";
import UserContextProvider from "./context/UserContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <TweetContextProvider>
          <App />
        </TweetContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  </StrictMode>,
);
