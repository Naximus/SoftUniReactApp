import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { localStorageTokenName } from "../../config";

const Logout = ({onLogout}) => {
  const navigate = useNavigate();

  useEffect(() => {
    onLogout();
    navigate('/login');
  },[]);

  return(
    <div>You've been logged out.</div>
  );
};

export default Logout;