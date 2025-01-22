/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { getDataPrivate } from "../utils/api";
import { jwtStorage } from "../utils/jwt_storage";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true); 

  const navigate = useNavigate();

  const getDataProfile = () => {
    setIsLoading(true);
    getDataPrivate("/api/v1/protected/data")
      .then((resp) => {
        if (resp?.user_logged) {
          console.log("user logged", resp?.user_logged[0]);
          setUserProfile(resp.user_logged[0]);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch((err) => {
        console.error(err);
        setIsLoggedIn(false);
      })
      .finally(() => {
        setIsLoading(false); 
      });
  };

  useEffect(() => {
    getDataProfile();
  }, []);

  const login = (access_token) => {
    jwtStorage.storeToken(access_token);
    getDataProfile();
    navigate("/home", { replace: true });
  };

  const logout = () => {
    jwtStorage.removeToken();
    setIsLoggedIn(false);
    setUserProfile({});
    navigate("/auth/login", { replace: true });
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, userProfile, isLoading, getDataProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
