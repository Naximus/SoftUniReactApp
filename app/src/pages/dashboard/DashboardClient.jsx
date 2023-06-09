import React, { useContext, useEffect, useState } from "react";
import UserInfo from "../../components/user/user-info/UserInfo";
import { BASE_URL } from "../../api/config";
import { AppUserContex } from "../../contexts/AppUserContext";
import { AppTokenContext } from "../../contexts/AppTokenContext";
import { ClientContext } from "../../contexts/ClientContext";
import ClientProfile from "../client-profile/ClientProfile";
import { useNavigate } from "react-router-dom";

const DashboardClient = ({user}) => {
  const { appUser, setAppUser } = useContext(AppUserContex);
  const { appToken, setAppToken } = useContext(AppTokenContext);
  const { currentClient, setCurrentUser } = useContext(ClientContext);

  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  
  useEffect(() => {
    
        setIsLoading(true);
        fetch(`${BASE_URL}/clients/${appUser._id}`, {
            method: "GET",
            headers: { "content-type": "application/json", "X-Authorization" :  appToken},
            mode: "cors",
        })
        .then((response) => {
            if (!response.ok) throw new Error(response.status);
            else return response.json();
        })
        .then((result) => {
            setCurrentUser(result);
            setIsLoading(false);
            navigate(`/client/${result._id}`);

        })
        .catch((error) => {
            setError("User could not be authenticated");
            navigate(`/login`);
            setIsLoading(false);
        });
   
    
}, [currentClient, setCurrentUser,  appToken]);


  return (
    <>
      < ClientProfile />
    </>
  );
};

export default DashboardClient;
