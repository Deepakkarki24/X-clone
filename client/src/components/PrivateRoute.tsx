import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useUserContext } from "../context/hooks/useUserContext";
import LoadingPage from "./LoadingPage";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { user, authLoading } = useUserContext();

  if (authLoading) return <LoadingPage />;
  if (!user) return <Navigate to="/login" replace />;

  return children;
};

export default PrivateRoute;
