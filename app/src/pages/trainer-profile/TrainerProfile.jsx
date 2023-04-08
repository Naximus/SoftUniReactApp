import { useContext, useEffect, useState } from "react";
import { AppUserContex } from "../../contexts/AppUserContext";
import { AppTokenContext } from "../../contexts/AppTokenContext";
import { TrainerContext } from "../../contexts/TrainerContext";
import { BASE_URL } from "../../api/config";
import { useParams } from "react-router-dom";
import AvatarPicker from "../../components/clients/client-avatars/AddAvatar";
import TrainerProfileInfo from "../../components/trainers/trainer-profile-info/TrainerProfileInfo";
import { TrainerClients } from "../../components/trainers/trainer-clients/TrainerClients";



const TrainerProfile = () => {

    const { appUser, setAppUser } = useContext(AppUserContex);
    const { appToken, setAppToken } = useContext(AppTokenContext);

    const { currentTrainer, setCurrentTrenier  } = useContext(TrainerContext);

    const userRole = appUser ? JSON.stringify(appUser.type).replace(/"/g, '') : null;

    const [error, setError] = useState(undefined);

    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("cards");
    // Name change
    const userName = currentTrainer ? currentTrainer.name : null;
    const[isEditingName, setIsEditingName] = useState(false);
    const[currentName, setCurrentName] = useState(userName);
    const [editingName, setEditName] = useState(userName);
    // Avatar
    // const avatarImage = currentTrainer ? currentTrainer.image : null;
    // const [clientAvatar, setClientAvatar] = useState(avatarImage);
    
    const [clientAvatar, setClientAvatar] = useState();
    // const avatarImage = currentTrainer ? currentTrainer.image : null;

    const [isOpen, setIsOpen] = useState(false);


    // 
    const userId = useParams(":trainerId");
    let trainertId = userId.trainerId === undefined ? appUser._id : userId.trainerId;

    useEffect(() => {
        
        if (!currentTrainer) {
            setIsLoading(true);
            fetch(`${BASE_URL}/trainers/${trainertId}`, {
                method: "GET",
                headers: { "content-type": "application/json", "X-Authorization" :  appToken},
                mode: "cors",
            })
            .then((response) => {
                if (!response.ok) throw new Error(response.status);
                else return response.json();
            })
            .then((result) => {
                setEditName(result.name);
                setCurrentName(result.name);
                setClientAvatar(result.image);
                setCurrentTrenier(result);
                setIsLoading(false);

            })
            .catch((error) => {
                setError("User could not be authenticated");
                setIsLoading(false);
            });
        } else {
          setEditName(currentTrainer.name);
          setCurrentName(currentTrainer.name);
          setClientAvatar(currentTrainer.image)
        }
    }, [currentTrainer, setCurrentTrenier, trainertId, appToken]);


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
          await fetch(`${BASE_URL}/trainers/${trainertId}/name`, {
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
              setError("User could not be authenticated");
            });

        }

        setIsEditingName(false);
      }
      const handleCancel = () => {
        setIsEditingName(false);
      }






    return (
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
                      {currentTrainer ? <img src={clientAvatar} alt="avatar" /> : null}
                  </div>
                    {currentTrainer ? 
                    !isEditingName ? (
                      <div className="client-name">
                        {editingName}
                        {["admin", "manager"].includes(userRole) &&
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
            className={activeTab === "cards" ? "btn-icons icon-clients-active" : "btn-icons icon-clients"}
            onClick={() => handleTabClick("cards")}
          ></div>
          <div
            className={activeTab === "dashboard" ? "btn-icons icon-desk-active" : "btn-icons icon-desk"}
            onClick={() => handleTabClick("dashboard")}
          ></div>
        </nav>
        
          {isLoading && <div>Loading...</div>}
          {!isLoading && activeTab === "info" && currentTrainer && <div className="client-profile-info"><TrainerProfileInfo userRole={userRole}/></div>}
          {!isLoading && activeTab === "cards" && currentTrainer && <div><TrainerClients userRole={userRole}/></div>}
          {/* {!isLoading && activeTab === "dashboard" && currentClient && <div><ClientProfileDashboard userRole={userRole}/></div>} */}
          </main>

          </>
    )
}

export default TrainerProfile;