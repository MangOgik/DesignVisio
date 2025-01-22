import React, { useContext } from "react";
import MainLayout from "./MainLayout";
import { Navigate } from "react-router-dom";
import { AuthContext } from "@/providers/AuthProvider";

const PrivateRoute = ({ components, authUser }) => {
  const { isLoggedIn, userProfile, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center text-color-950">
        <div className="flex items-center space-x-2 mb-4">
          <div className="flex aspect-square size-20 items-center justify-center rounded-xl bg-color-500">
            <img
              src={`/LogoDesignVisioWhite.svg`}
              alt="Design Visio Logo"
              className="size-16"
            />
          </div>
        </div>
        <div className="text-xl font-medium flex items-center space-x-1">
          <span>Please wait a moment</span>
          <span className="dot-animation">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </span>
        </div>
        <style>{`
          .dot-animation span {
            animation: blink 1.5s infinite;
          }

          .dot-animation span:nth-child(1) {
            animation-delay: 0s;
          }

          .dot-animation span:nth-child(2) {
            animation-delay: 0.3s;
          }

          .dot-animation span:nth-child(3) {
            animation-delay: 0.6s;
          }

          @keyframes blink {
            0%,
            100% {
              opacity: 0.3;
            }
            50% {
              opacity: 1;
            }
          }
        `}</style>
      </div>
    );
  }

  if (isLoggedIn) {
    if (authUser === "all" || authUser === userProfile.role) {
      return <MainLayout>{components}</MainLayout>;
    } else {
      return <Navigate to="/home" replace />;
    }
  }

  return <Navigate to="/auth/login" replace />;
};

export default PrivateRoute;
