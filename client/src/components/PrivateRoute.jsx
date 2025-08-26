import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import LoadingPage from "../components/LoadingPage"; // adjust path if needed

const PrivateRoute = ({ children }) => {
  const { user, authLoading } = useContext(UserContext);

  if (authLoading) {
    return <LoadingPage />;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
