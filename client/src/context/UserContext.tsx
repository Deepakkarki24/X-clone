import {
  createContext,
  useEffect,
  useState,
  useRef,
  type FormEvent,
  type ChangeEvent,
  type ReactNode,
  type RefObject,
} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";
import type { ApiResponse } from "../types/api";
import type {
  User,
  SignupErrors,
  LoginErrors,
  ProfileFormData,
} from "../types/user";
import { initialProfileFormData } from "../types/user";

export interface UserContextValue {
  handleSignupFormSubmit: (e: FormEvent<HTMLFormElement>) => void;
  userDetails: {
    name: RefObject<HTMLInputElement | null>;
    username: RefObject<HTMLInputElement | null>;
    email: RefObject<HTMLInputElement | null>;
    password: RefObject<HTMLInputElement | null>;
    confirmPassword: RefObject<HTMLInputElement | null>;
  };
  isLoading: boolean;
  signupDbMessage: {
    err: { message: string };
    success: { message: string };
  };
  signupErrors: SignupErrors;
  handleSigninForm: (e: FormEvent<HTMLFormElement>) => void;
  userLoginDetails: {
    username: RefObject<HTMLInputElement | null>;
    password: RefObject<HTMLInputElement | null>;
  };
  loginErrors: LoginErrors;
  loginDbMessage: {
    success: { message: string };
    error: { message: string };
  };
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  authLoading: boolean;
  handleLogout: () => void;
  handleMediaSubmit: (e: FormEvent<HTMLFormElement>) => void;
  formData: ProfileFormData;
  setFormData: React.Dispatch<React.SetStateAction<ProfileFormData>>;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const UserContext = createContext<UserContextValue | null>(null);

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState<ProfileFormData>(initialProfileFormData);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMediaSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData();
    if (formData.profile_image)
      data.append("profile_image", formData.profile_image);
    if (formData.cover_image) data.append("cover_image", formData.cover_image);
    if (formData.name) data.append("name", formData.name);
    if (formData.bio) data.append("bio", formData.bio);
    if (formData.location) data.append("location", formData.location);

    api
      .post<ApiResponse<User>>("/edit-profile", data, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        if (res.data.success && res.data.data) {
          setUser(res.data.data);
          setFormData(initialProfileFormData);
          toast.success(res.data.message);
        }
      })
      .catch((err: Error) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  const [authLoading, setAuthLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [signupDbMessage, setSignupDbMessage] = useState({
    err: { message: "" },
    success: { message: "" },
  });

  const userDetails = {
    name: useRef<HTMLInputElement>(null),
    username: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    password: useRef<HTMLInputElement>(null),
    confirmPassword: useRef<HTMLInputElement>(null),
  };

  const [signupErrors, setSignupErrors] = useState<SignupErrors>({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSignupFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nameVal = userDetails.name.current?.value.trim() ?? "";
    const usernameVal = userDetails.username.current?.value.trim() ?? "";
    const emailVal = userDetails.email.current?.value.trim() ?? "";
    const passwordVal = userDetails.password.current?.value.trim() ?? "";
    const confirmPasswordVal =
      userDetails.confirmPassword.current?.value.trim() ?? "";

    const newSignupErrors: SignupErrors = {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!nameVal) newSignupErrors.name = "Name is required!";
    if (!usernameVal) {
      newSignupErrors.username = "Username is required!";
    } else if (usernameVal.length < 3) {
      newSignupErrors.username = "Username must be at least 3 characters!";
    }
    if (!emailVal) newSignupErrors.email = "Email is required!";
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

    const hasErrors = Object.values(newSignupErrors).some((error) => error !== "");
    if (hasErrors) return;

    if (userDetails.name.current) userDetails.name.current.value = "";
    if (userDetails.username.current) userDetails.username.current.value = "";
    if (userDetails.email.current) userDetails.email.current.value = "";
    if (userDetails.password.current) userDetails.password.current.value = "";
    if (userDetails.confirmPassword.current)
      userDetails.confirmPassword.current.value = "";

    const userData = {
      name: nameVal,
      username: usernameVal,
      email: emailVal,
      password: passwordVal,
    };

    api
      .post<ApiResponse<User>>("/signup", userData, { withCredentials: true })
      .then((res) => {
        if (res.data.success && res.data.data) {
          setSignupDbMessage({
            err: { message: "" },
            success: { message: res.data.message },
          });
          setUser(res.data.data);
          setIsLoading(true);
          toast.success(res.data.message);
          setTimeout(() => {
            navigate("/dashboard/feed");
            setIsLoading(false);
          }, 1000);
        } else {
          toast.error("error while signup!");
          setSignupDbMessage((prev) => ({
            ...prev,
            err: { message: res.data.message },
            success: { message: "" },
          }));
        }
      })
      .catch((err: Error) => toast.error(err.message));
  };

  const userLoginDetails = {
    username: useRef<HTMLInputElement>(null),
    password: useRef<HTMLInputElement>(null),
  };

  const [loginErrors, setLoginErrors] = useState<LoginErrors>({
    userEmail: "",
    userPass: "",
  });

  const [loginDbMessage, setLoginDbMessage] = useState({
    success: { message: "" },
    error: { message: "" },
  });

  const handleSigninForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userEmail = userLoginDetails.username.current?.value.trim() ?? "";
    const userPassword = userLoginDetails.password.current?.value.trim() ?? "";

    const newErrors: LoginErrors = {
      userEmail: "",
      userPass: "",
    };

    if (!userEmail) newErrors.userEmail = "User email is required";
    if (!userPassword) newErrors.userPass = "User password is required";

    setLoginErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error !== "");
    if (hasErrors) return;

    const userData = { email: userEmail, password: userPassword };

    api
      .post<ApiResponse<User>>("/login", userData, { withCredentials: true })
      .then((res) => {
        if (res.data.success && res.data.data) {
          setLoginDbMessage({ success: { message: res.data.message }, error: { message: "" } });
          setUser(res.data.data);
          setIsLoading(true);
          toast.success(res.data.message);
          navigate("/dashboard/feed");
          setTimeout(() => setIsLoading(false), 1000);
        } else {
          toast.error(res.data.message);
          setLoginDbMessage({ success: { message: "" }, error: { message: res.data.message } });
        }
      })
      .catch((err: Error) => toast.error(err.message));

    if (userLoginDetails.username.current)
      userLoginDetails.username.current.value = "";
    if (userLoginDetails.password.current)
      userLoginDetails.password.current.value = "";
  };

  const handleLogout = () => {
    api
      .get<ApiResponse>("/logout", { withCredentials: true })
      .then((res) => {
        if (res.data.success) {
          setUser(null);
          toast.success(res.data.message);
          setIsLoading(true);
          setTimeout(() => setIsLoading(false), 1000);
        }
      })
      .catch((err: Error) => toast.error(err.message));
  };

  useEffect(() => {
    api
      .get<ApiResponse<User>>("/me", { withCredentials: true })
      .then((res) => {
        if (res.data.success && res.data.data) setUser(res.data.data);
        else setUser(null);
      })
      .catch(() => setUser(null))
      .finally(() => setAuthLoading(false));
  }, []);

  return (
    <UserContext.Provider
      value={{
        handleSignupFormSubmit,
        userDetails,
        isLoading,
        signupDbMessage,
        signupErrors,
        handleSigninForm,
        userLoginDetails,
        loginErrors,
        loginDbMessage,
        user,
        setUser,
        authLoading,
        handleLogout,
        handleMediaSubmit,
        formData,
        setFormData,
        handleChange,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
