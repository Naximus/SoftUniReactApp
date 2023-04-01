import React, { useContext } from "react";
import { useParams  } from 'react-router-dom';
import { ClientContext } from "../../contexts/ClientContext";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../api/config";
import ClientProfileInfo from "../../components/clients/client-profile-info/ClientProfileInfo";
import ClientProfileCards from "../../components/clients/client-profile-cards/ClientProfileCards";
import ClientProfileDashboard from "../../components/clients/client-profile-dashboard/ClientProfileDashboard";
import { AppTokenContext } from "../../contexts/AppTokenContext";
import AvatarPicker  from "../../components/clients/client-avatars/AddAvatar"
import { AppUserContex } from "../../contexts/AppUserContext";


const ClientProfile = () => {
    
    const { appToken, setAppToken } = useContext(AppTokenContext);
    const { currentClient, setCurrentUser } = useContext(ClientContext);
    console.log(currentClient);
    const [error, setError] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("cards");
    // Avatar
    const avatarImage = currentClient ? currentClient.image : null;
    const [clientAvatar, setClientAvatar] = useState(avatarImage);
    const [isOpen, setIsOpen] = useState(false);
    console.log(clientAvatar);

    const userId = useParams(":userId");
    let clientId = userId.clientId;
 


    useEffect(() => {
        if (!currentClient) {
            setIsLoading(true);
            fetch(`${BASE_URL}/clients/${clientId}`, {
                method: "GET",
                headers: { "content-type": "application/json", "X-Authorization" :  appToken},
                mode: "cors",
            })
            .then((response) => {
                if (!response.ok) throw new Error(response.status);
                else return response.json();
            })
            .then((result) => {
                console.log("v reloda na user");
                console.log(result.image);
                setClientAvatar(result.image);
                setCurrentUser(result);
                setIsLoading(false);

            })
            .catch((error) => {
                console.log("error: " + error);
                setError("User could not be authenticated");
                setIsLoading(false);
            });
        }
    }, [currentClient, setCurrentUser, clientId, appToken]);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
      };
     
    //   Avatar
      

      const handleClick = () => {
          setIsOpen(!isOpen);
        }
      
        const handleClose = () => {
          setIsOpen(false);
        }

    return(
        <>
        {isOpen && <AvatarPicker 
          clientAvatar={clientAvatar}
          setClientAvatar={setClientAvatar}
          onClose={handleClose}/>
        }
        
        <main className="client-profile mobile-pages">
            <div className="client-header">
                <div className="row-icons icon-expand-down" onClick={handleClick} ></div>
                <div className="client-avatar">
                    {currentClient ? <img src={clientAvatar} alt="avatar" /> : null}
                </div>
                {currentClient ? <h3 className="client-name">{currentClient.name}</h3> : null}
            
            </div>
            <nav className="navigation">

        <div
          className={activeTab === "info" ? "btn-icons icon-info-active" : "btn-icons icon-info"}
          onClick={() => handleTabClick("info")}
        > </div>
        <div
          className={activeTab === "cards" ? "btn-icons icon-card-active" : "btn-icons icon-card"}
          onClick={() => handleTabClick("cards")}
        ></div>
        <div
          className={activeTab === "dashboard" ? "btn-icons icon-desk-active" : "btn-icons icon-desk"}
          onClick={() => handleTabClick("dashboard")}
        ></div>
      </nav>
      
        {isLoading && <div>Loading...</div>}
        {!isLoading && activeTab === "info" && currentClient && <div className="client-profile-info"><ClientProfileInfo /></div>}
        {!isLoading && activeTab === "cards" && currentClient && <div><ClientProfileCards /></div>}
        {!isLoading && activeTab === "dashboard" && currentClient && <div><ClientProfileDashboard /></div>}
        </main>
        </>
    )
}

export default ClientProfile;