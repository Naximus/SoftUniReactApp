import { useContext, useEffect, useState } from "react";
import { AppUserContex } from "../../contexts/AppUserContext";
import { AppTokenContext } from "../../contexts/AppTokenContext";
import { TrainerContext } from "../../contexts/TrainerContext";
import { BASE_URL } from "../../api/config";
import { useParams } from "react-router-dom";



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
    const avatarImage = currentTrainer ? currentTrainer.image : null;
    const [trainerAvatar, setTrainerAvatar] = useState(avatarImage);
    const [isOpen, setIsOpen] = useState(false);


    // 
    const userId = useParams(":trainerId");
    let trainertId = userId.trainerId;

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
                console.log(result);
                setEditName(result.name);
                setCurrentName(result.name);
                setTrainerAvatar(result.image);
                setCurrentTrenier(result);
                setIsLoading(false);

            })
            .catch((error) => {
                console.log("error: " + error);
                setError("User could not be authenticated");
                setIsLoading(false);
            });
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
              console.log("error: " + error);
              setError("User could not be authenticated");
            });

        }

        setIsEditingName(false);
      }
      const handleCancel = () => {
        setIsEditingName(false);
      }






    return (
        <h1>Trainer Profile</h1>
    )
}

export default TrainerProfile;