import React, { useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { AppUserContex } from "../contexts/AppUserContext";

const ReqirePermission = ({ children, redirectTo, allowedFor }) => {

  const { appUser, setAppUser } = useContext(AppUserContex);
 
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // TODO: Check if path allowed @server too.
    if (
      !appUser ||
      // isExpired ||
      !allowedFor.includes(appUser.type)
    ) {
      navigate(redirectTo);
    }
  }, [appUser, redirectTo]);
  return children;
};

export default ReqirePermission;
