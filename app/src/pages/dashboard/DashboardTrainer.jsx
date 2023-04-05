import React, { useContext, useEffect, useState } from "react";
import TrainerProfile from "../trainer-profile/TrainerProfile";
import { AppUserContex } from "../../contexts/AppUserContext";
import { AppTokenContext } from "../../contexts/AppTokenContext";
import { TrainerContext } from "../../contexts/TrainerContext";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../api/config";

const DashboardTrainer = () => {

  console.log("DashboardTrainer");
  const { appUser, setAppUser } = useContext(AppUserContex);
  const { appToken, setAppToken } = useContext(AppTokenContext);
  const { currentTrainer, setCurrentTrenier  } = useContext(TrainerContext);

  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!currentTrainer) {
      console.log('V ifa');
        setIsLoading(true);
        console.log(appUser._id);
        fetch(`${BASE_URL}/trainers/${appUser._id}`, {
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
            setCurrentTrenier(result);
            setIsLoading(false);
            navigate(`/trainers/${result._id}`);

        })
        .catch((error) => {
            console.log("error: " + error);
            setError("User could not be authenticated");
            navigate(`/login`);
            setIsLoading(false);
        });
    } 
   
    
}, [currentTrainer, setCurrentTrenier,  appToken]);



  return (
    <>
      < TrainerProfile />
    </>
  );
};

export default DashboardTrainer;
