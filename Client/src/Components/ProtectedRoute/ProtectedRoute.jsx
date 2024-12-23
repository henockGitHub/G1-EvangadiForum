import  { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserLoginInfo } from "../../App"; // Adjust the path based on your structure

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserLoginInfo);

  // If no user is logged in, redirect to the login page
  if (!user || !user.username) {
    return <Navigate to="/auth" replace />;
  }

  // Otherwise, render the children (protected component)
  return children;
};

export default ProtectedRoute;