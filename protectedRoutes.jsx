import { useContext } from "react";
import { userContext } from "./globalContext";
import { Navigate } from "react-router-dom";

function ProtectedRoutes({ children, userRole }) {
  const { role, isAuth } = useContext(userContext);

  // Not logged in, back to login
  if (!isAuth) {
    return <Navigate to="/" replace />;
  }

  // Specific role is required
  if (userRole && role !== userRole) {
    return <Navigate to="/unAuth" replace />;
  }

  return children;
}

export default ProtectedRoutes
