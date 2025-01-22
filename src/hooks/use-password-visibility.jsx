import { useState } from "react";

export const usePasswordVisibility = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return {
    isPasswordVisible,
    togglePasswordVisibility,
  };
};