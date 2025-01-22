import { Button } from "@/components/ui/button";
import React from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate()
  return (
    <div className="w-screen h-screen flex items-center justify-center text-center text-9xl text-color-950 bg-color-50">
      SIAPA SURUH LUPA PASSWORD{" "}
      <Button
        onClick={() => {
          navigate("/auth/login");
        }}
      >
        Login boss
      </Button>
    </div>
  );
};

export default ForgotPassword;
