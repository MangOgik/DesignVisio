import ArchitectProfileCard from "@/components/card/ArchitectProfileCard";
import ClientProfileCard from "@/components/card/ClientProfileCard";
import { AuthContext } from "@/providers/AuthProvider";
import React, { useContext, useState } from "react";
import AccountInputDialog from "./AccountInputDialog";

const Account = () => {
  const { userProfile } = useContext(AuthContext);
  const [isInputDialogOpen, setIsInputDialogOpen] = useState(false);
  const { getDataProfile } = useContext(AuthContext);

  const openInputDialog = () => {
    setIsInputDialogOpen(true);
  };

  const closeInputDialog = () => {
    setIsInputDialogOpen(false);
    getDataProfile();
  };
  const isClient = userProfile.role === "client";
  return (
    <div
      className={`justify-center items-center gap-10 w-full ${
        isClient ? "h-4/5" : ""
      } px-4 pb-4 flex flex-col`}
    >
      <AccountInputDialog
        isOpen={isInputDialogOpen}
        handleClose={closeInputDialog}
      />
      {isClient ? (
        <ClientProfileCard openInputDialog={openInputDialog} />
      ) : (
        <ArchitectProfileCard openInputDialog={openInputDialog} />
      )}
    </div>
  );
};
export default Account;
