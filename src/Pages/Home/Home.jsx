import React, { useContext } from "react";
import ClientHome from "./ClientHome";
import { AuthContext } from "@/providers/AuthProvider";
import ArchitectHome from "./ArchitectHome";

const Home = () => {
  const { userProfile } = useContext(AuthContext);
  
  return (
    <div className="justify-center items-center gap-4 w-full h-2/3 flex">
      {userProfile.role === "client" ? <ClientHome /> : <ArchitectHome />}
    </div>
  );
};

export default Home;
