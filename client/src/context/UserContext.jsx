import { createContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export let UserContext = createContext();

const UserContextProvider = ({ children }) => {
  let [token, setToken] = useState("");
  let [loading, setLoading] = useState(true);
  let [displayUserName, setDisplayUserName] = useState("");
  const navigate = useNavigate();

  // Singup logic

  const [isloading, setIsLoading] = useState(false);
  const [dbMessage, setDbMessage] = useState({
    err: {
      message: "",
    },
    success: {
      message: "",
    },
  });

  const userDetails = {
    username: useRef(),
    email: useRef(),
    password: useRef(),
    confirmPassword: useRef(),
  };

  const { username, email, password, confirmPassword } = userDetails;

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSignupFormSubmit = (e) => {
    e.preventDefault();

    const usernameVal = username.current.value.trim();
    const emailVal = email.current.value.trim();
    const passwordVal = password.current.value.trim();
    const confirmPasswordVal = confirmPassword.current.value.trim();

    const newErrors = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!usernameVal) {
      newErrors.username = "Username is required!";
    } else if (usernameVal.length < 3) {
      newErrors.username = "Username must be at least 3 characters!";
    }

    if (!emailVal) {
      newErrors.email = "Email is required!";
    }

    if (!passwordVal) {
      newErrors.password = "Password is required!";
    } else if (passwordVal.length < 6) {
      newErrors.password = "Password must be at least 6 characters!";
    }

    if (!confirmPasswordVal) {
      newErrors.confirmPassword = "Confirm password is required!";
    } else if (passwordVal !== confirmPasswordVal) {
      newErrors.confirmPassword = "Passwords do not match!";
    }

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error !== "");
    if (hasErrors) return;

    username.current.value = "";
    email.current.value = "";
    password.current.value = "";
    confirmPassword.current.value = "";

    let userData = {
      name: usernameVal,
      email: emailVal,
      password: passwordVal,
    };

    let submmited = axios
      .post("http://localhost:3001/signup", userData)
      .then((res) => {
        if (res.data.success) {
          setDbMessage((prev) => ({
            err: { message: "" },
            success: { message: res.data.message },
          }));
          setDisplayUserName(res.data.data.name);
          setIsLoading(true);
          setTimeout(() => {
            navigate("/");
            setIsLoading(false);
          }, 2000);
        } else {
          setDbMessage((prev) => ({
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

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else if (!token) {
      const localToken = localStorage.getItem("token");
      if (localToken) {
        setToken(localToken);
        setLoading(false);
      }
    }
  }, [token]);

  return (
    <UserContext.Provider
      value={{
        token,
        setToken,
        loading,
        handleSignupFormSubmit,
        userDetails,
        isloading,
        dbMessage,
        errors,
        displayUserName,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
