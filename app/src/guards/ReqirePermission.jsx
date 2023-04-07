import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { useJwt } from "react-jwt";

const ReqirePermission = ({ children, redirectTo }) => {
  const token = Cookies.get("fa_user");
  const { decodedToken, isExpired } = useJwt(token);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // TODO: Check if path allowed @server too.
    if (
      !decodedToken ||
      isExpired ||
      !decodedToken.allowedPaths.includes(location.pathname)
    ) {
      navigate(redirectTo);
    }
  }, [location.pathname, decodedToken, isExpired, redirectTo]);
  return children;
};

export default ReqirePermission;
