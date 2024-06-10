import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Loader from "./Pages/Loaders/Loader";
import axios from "axios";
import { baseUrl } from "./constants/api";

// React Toastify Imports
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * A component that guards routes by checking authentication status.
 * If the user is authenticated, it renders the children components.
 * If not authenticated, it redirects to the sign-in page.
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The children components to render if authenticated.
 * @returns {ReactNode} - The authentication guard component.
 */

const guard = async (auth_token) => {
  return axios.get(`${baseUrl}/api/auth/verify/token`, {
    headers: {
      Authorization: `Token ${auth_token}`,
    },
  });
};

const AuthGuard = ({ children }) => {
  const auth_token = window.localStorage.getItem("mp-user-token");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (auth_token) {
      guard(auth_token)
        .then((res) => {
          console.log(res);
          setIsAuthenticated(true);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsAuthenticated(false);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [auth_token]);

  if (isLoading) {
    // Show loading state, you can customize this according to your needs
    return <Loader />;
  }

  if (!isAuthenticated) {
    toast.warning("Your session has been expired, please Login!");
    window.localStorage.removeItem("mp-user-token");
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};

export default AuthGuard;
