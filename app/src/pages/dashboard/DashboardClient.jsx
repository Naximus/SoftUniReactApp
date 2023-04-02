import React, { useContext, useEffect, useState } from "react";
import UserInfo from "../../components/user/user-info/UserInfo";
import { BASE_URL } from "../../api/config";
import { AppUserContex } from "../../contexts/AppUserContext";
import { AppTokenContext } from "../../contexts/AppTokenContext";
import { ClientContext } from "../../contexts/ClientContext";
import ClientProfile from "../client-profile/ClientProfile";
import { useNavigate } from "react-router-dom";

const DashboardClient = () => {
  
  const { appUser, setAppUser } = useContext(AppUserContex);
  const { appToken, setAppToken } = useContext(AppTokenContext);
  const { currentClient, setCurrentUser } = useContext(ClientContext);
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  console.log('currentClient' + " " +currentClient);

  useEffect(() => {
    if (!currentClient) {
        console.log("V IFA");
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
          console.log(result);
            setCurrentUser(result);
            setIsLoading(false);
            navigate(`/clients/${result._id}`);

        })
        .catch((error) => {
            console.log("error: " + error);
            setError("User could not be authenticated");
            setIsLoading(false);
        });
    } else {
        console.log("V ELSA");
        setCurrentUser(appUser);
        navigate(`/clients/${appUser._id}`);
    }
    
}, [currentClient, setCurrentUser,  appToken]);



  return (
    <>
      {/* {isLoading && <div>Loading...</div>} */}
      {/* {!isLoading && <div><ClientProfile /></div>} */}
      <h1>V Dasha</h1>
    </>
  );
};

export default DashboardClient;
