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
    const { appUser, setAppUser } = useContext(AppUserContex);
    const { appToken, setAppToken } = useContext(AppTokenContext);
    const { currentClient, setCurrentUser } = useContext(ClientContext);

    const userRole = appUser ? JSON.stringify(appUser.type).replace(/"/g, '') : null;

    const [error, setError] = useState(undefined);

    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("cards");
    // Name change
    const userName = currentClient ? currentClient.name : null;
    const[isEditingName, setIsEditingName] = useState(false);
    const[currentName, setCurrentName] = useState(userName);
    const [editingName, setEditName] = useState(userName);
    // Avatar
    const avatarImage = currentClient ? currentClient.image : null;
    const [clientAvatar, setClientAvatar] = useState(avatarImage);
    const [isOpen, setIsOpen] = useState(false);


    // 
    const userId = useParams(":userId");
    let clientId = userId.clientId;

    // 
    // let clientId = appUser._id;

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
                console.log(result.image);
                setEditName(result.name);
                setCurrentName(result.name);
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




      const handleInputChange = (event) => {
        setEditName(event.target.value);
      };
      const editName = () => {
        setIsEditingName(true)
      }
      const handleSave = async () => {
        // setCurrentName(editingName);
        

        if (currentName !== editingName) {

          // fetch data here
          await fetch(`${BASE_URL}/clients/${clientId}/name`, {
            method: "PUT",
            headers: { "content-type": "application/json", "X-Authorization" :  appToken},
            mode: "cors",
            body: JSON.stringify({
              name: editingName,
            }),
          })
            .then((response) => {
              if (!response.ok) throw new Error(response.status);
              else {
                const responseName = response.name;
                setCurrentName(responseName);
                setCurrentName(editingName);
                return response.json();
              }
            })
            .catch((error) => {
              console.log("error: " + error);
              setError("User could not be authenticated");
            });

        }

        setIsEditingName(false);
      }
      const handleCancel = () => {
        setIsEditingName(false);
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
                {/* {["admin", "trainer", "manager"].includes(userRole) && */}
                    <div className="row-icons icon-edit" onClick={handleClick} ></div>
                  {/* } */}
                <div className="client-avatar">
                    {currentClient ? <img src={clientAvatar} alt="avatar" /> : null}
                </div>
                  {currentClient ? 
                  !isEditingName ? (
                    <div className="client-name">
                      {editingName}
                      {["admin", "trainer", "manager"].includes(userRole) &&
                        <div className="row-icons icon-edit p-div-margin" onClick={editName}></div>
                      }
                    </div>
                  ) : (
                    <div className="edit-icons-input-holder">
                      <input type="text" name="name" value={editingName || ""}  onChange={handleInputChange}/>
                      <div className="row-icons icon-save"  onClick={handleSave}></div>
                      <div className="row-icons icon-close-ring" onClick={handleCancel}></div>
                    </div>
                  ) 
                : null}

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
        {!isLoading && activeTab === "info" && currentClient && <div className="client-profile-info"><ClientProfileInfo userRole={userRole}/></div>}
        {!isLoading && activeTab === "cards" && currentClient && <div><ClientProfileCards userRole={userRole}/></div>}
        {!isLoading && activeTab === "dashboard" && currentClient && <div><ClientProfileDashboard userRole={userRole}/></div>}
        </main>
        </>
    )
}

export default ClientProfile;