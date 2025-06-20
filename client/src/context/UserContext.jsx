import { createContext, useEffect, useState } from "react";

export let UserContext = createContext();

const UserContextProvider = ({ children }) => {
  let [token, setToken] = useState("");
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else if (!token) {
      const localToken = localStorage.getItem("token");
      if (localToken) {
        setToken(localToken);
      }
    }

    setLoading(false);
  }, [token]);

  return (
    <UserContext.Provider value={{ token, setToken, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
