import { useUser } from "@/context/UserContext";
import React from "react";

const SecuredRoute = ({ children }) => {
  const { user } = useUser();

  if (!user?.userID) return children;
};

export default SecuredRoute;
