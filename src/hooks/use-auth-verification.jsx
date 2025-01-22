import { useContext, useEffect, useState } from "react";
import { verifyToken } from "@/utils/api";
import { jwtStorage } from "@/utils/jwt_storage";
import { AuthContext } from "@/providers/AuthProvider";
// import useAuthStore from "@/stores/auth-store";

export const useAuthVerification = () => {
  const [isLoading, setIsLoading] = useState(true);
  const {login, isLoggedIn} = useContext(AuthContext)

  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await verifyToken("/api/v1/protected/verify-token");
        const userData = response.user_logged[0];
        // console.log("user logged:", userData);
        // console.log("response:", response);
        if (response.message === "Token is valid") {
          await jwtStorage.storeUser({
            name: userData.name,
            email: userData.email,
            id: userData.id,
            role: response.role,
          });
          login(response.role);
        } else {
          await clearAuthData();
        }
      } catch (error) {
        await clearAuthData();
      } finally {
        setIsLoading(false);
      }
    };

    const clearAuthData = async () => {
      await Promise.all([jwtStorage.removeToken(), jwtStorage.removeUser()]);
    };

    if (!isLoggedIn) {
      validateToken();
    } else {
      setIsLoading(false);
    }
  }, [isLoggedIn, login]);

  return {
    isLoading,
    isAuthenticated: isLoggedIn,
  };
};
