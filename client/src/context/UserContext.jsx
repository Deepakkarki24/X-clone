import { createContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export let UserContext = createContext();

const UserContextProvider = ({ children }) => {
  // user logic variables
  let [user, setUser] = useState(null);
  const navigate = useNavigate();

  // const API_URL = import.meta.env.VITE_API_URL;

  const [authLoading, setAuthLoading] = useState(true);

  // Singup logic starts
  const [isloading, setIsLoading] = useState(false); //temp loading
  const [signupDbMessage, setSignupDbMessage] = useState({
    err: {
      message: "",
    },
    success: {
      message: "",
    },
  });

  const userDetails = {
    name: useRef(),
    username: useRef(),
    email: useRef(),
    password: useRef(),
    confirmPassword: useRef(),
  };

  const [signupErrors, setSignupErrors] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSignupFormSubmit = (e) => {
    e.preventDefault();

    const nameVal = userDetails.name.current.value.trim();
    const usernameVal = userDetails.username.current.value.trim();
    const emailVal = userDetails.email.current.value.trim();
    const passwordVal = userDetails.password.current.value.trim();
    const confirmPasswordVal = userDetails.confirmPassword.current.value.trim();

    const newSignupErrors = {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!nameVal) {
      newSignupErrors.name = "Name is required!";
    }

    if (!usernameVal) {
      newSignupErrors.username = "Username is required!";
    } else if (usernameVal.length < 3) {
      newSignupErrors.username = "Username must be at least 3 characters!";
    }

    if (!emailVal) {
      newSignupErrors.email = "Email is required!";
    }

    if (!passwordVal) {
      newSignupErrors.password = "Password is required!";
    } else if (passwordVal.length < 6) {
      newSignupErrors.password = "Password must be at least 6 characters!";
    }

    if (!confirmPasswordVal) {
      newSignupErrors.confirmPassword = "Confirm password is required!";
    } else if (passwordVal !== confirmPasswordVal) {
      newSignupErrors.confirmPassword = "Passwords do not match!";
    }

    setSignupErrors(newSignupErrors);

    const hasErrors = Object.values(newSignupErrors).some(
      (error) => error !== ""
    );
    if (hasErrors) return;

    userDetails.name.current.value = "";
    userDetails.username.current.value = "";
    userDetails.email.current.value = "";
    userDetails.password.current.value = "";
    userDetails.confirmPassword.current.value = "";

    let userData = {
      name: nameVal,
      username: usernameVal,
      email: emailVal,
      password: passwordVal,
    };

    let submitted = api
      .post("/signup", userData, { withCredentials: true })
      .then((res) => {
        if (res.data.success) {
          setSignupDbMessage((prev) => ({
            err: { message: "" },
            success: { message: res.data.message },
          }));
          setUser(res.data.data);
          setIsLoading(true);
          setTimeout(() => {
            navigate("/dashboard/feed");
            setIsLoading(false);
          }, 1000);
        } else {
          setSignupDbMessage((prev) => ({
            ...prev,
            err: { message: res.data.message },
            success: { message: "" },
          }));
          return;
        }
      })
      .catch((err) => {
        return err;
      });
  };
  // signup logic ends

  // login logic starts
  const userLoginDetails = {
    username: useRef(),
    password: useRef(),
  };

  // error from frontend to frontend
  const [loginErrors, setLoginErrors] = useState({
    userEmail: "",
    userPass: "",
  });

  // error from Db to frontend
  const [loginDbMessage, setLoginDbMessage] = useState({
    success: {
      message: "",
    },
    error: {
      message: "",
    },
  });

  const handleSigninForm = (e) => {
    e.preventDefault();
    let userEmail = userLoginDetails.username.current.value.trim();
    let userPassword = userLoginDetails.password.current.value.trim();

    const newErrors = {
      userEmail: "",
      userPass: "",
    };

    if (!userEmail) {
      newErrors.userEmail = "User email is required";
    }

    if (!userPassword) {
      newErrors.userPass = "User password is required";
    }

    setLoginErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error !== "");

    if (hasErrors) return;

    let userData = {
      email: userEmail,
      password: userPassword,
    };

    let loggedIn = api
      .post("/login", userData, { withCredentials: true })
      .then((res) => {
        if (res.data.success) {
          setLoginDbMessage((prev) => ({
            success: { message: res.data.message },
          }));
          setUser(res.data.data);
          setIsLoading(true);
          setTimeout(() => {
            navigate("/dashboard/feed");
            setIsLoading(false);
          }, 1500);
        } else {
          setLoginDbMessage((prev) => ({
            error: { message: res.data.message },
          }));

          return;
        }
      })
      .catch((err) => console.log(err));

    userLoginDetails.username.current.value = "";
    userLoginDetails.password.current.value = "";
  };
  // login logic ends

  //logout starts
  const handleLogout = () => {
    api
      .get("/logout", { withCredentials: true })
      .then((res) => {
        if (res.data.success) {
          setUser(null);
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };
  //logout ends

  //fetch user data starts
  useEffect(() => {
    api
      .get("/me", { withCredentials: true })
      .then((res) => {
        if (res.data.success) setUser(res.data.data);
        else setUser(null);
      })
      .catch(() => setUser(null))
      .finally(() => setAuthLoading(false));
  }, []);

  //fetch user data ends

  return (
    <UserContext.Provider
      value={{
        handleSignupFormSubmit,
        userDetails,
        isloading,
        signupDbMessage,
        signupErrors,
        handleSigninForm,
        userLoginDetails,
        loginErrors,
        loginDbMessage,
        user,
        authLoading,
        handleLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
