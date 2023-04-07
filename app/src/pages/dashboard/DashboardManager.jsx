import React, { useContext, useEffect, useState } from "react";
import UserInfo from "../../components/user/user-info/UserInfo";
import { AppUserContex } from "../../contexts/AppUserContext";
import { AppTokenContext } from "../../contexts/AppTokenContext";
import { TrainerContext } from "../../contexts/TrainerContext";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../api/config";
import ManagerProfile from "../manager-profile/ManagerProfile";

const DashboardManager = () => {
  const { appUser, setAppUser } = useContext(AppUserContex);
  const { appToken, setAppToken } = useContext(AppTokenContext);
  // const { currentTrainer, setCurrentTrenier  } = useContext(TrainerContext);

  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!appUser) {
        setIsLoading(true);
        fetch(`${BASE_URL}/manager/${appUser._id}`, {
            method: "GET",
            headers: { "content-type": "application/json", "X-Authorization" :  appToken},
            mode: "cors",
        })
        .then((response) => {
            if (!response.ok) throw new Error(response.status);
            else return response.json();
        })
        .then((result) => {
            setAppUser(result);
            setIsLoading(false);
            navigate(`/manager/${result._id}`);

        })
        .catch((error) => {
            setError("User could not be authenticated");
            navigate(`/login`);
            setIsLoading(false);
        });
    } 
   
    
}, [appUser, setAppUser,  appToken]);



  return (
    <ManagerProfile />
  );
};

export default DashboardManager;
