// import styles from './ManagerProfile.module.scss';
import "./ManagerProfile.scss";
import { useContext, useEffect, useState } from "react";
import { AppTokenContext } from "../../contexts/AppTokenContext";
import { BASE_URL } from "../../api/config";
import { AppUserContex } from "../../contexts/AppUserContext";


const ManagerProfile = () => {
    const { appToken, setAppToken } = useContext(AppTokenContext);
    const { appUser, setAppUser } = useContext(AppUserContex);
    const [error, setError] = useState(undefined);

    const [clients, setClients] = useState([]);
    const [activeClients, setActiveClients] = useState([]);
    const [activeCards, setActiveCards] = useState([]);

    
    

  
    useEffect(() => {
      fetch(`${BASE_URL}/clients`, {
        method: "GET",
        headers: { "content-type": "application/json", "X-Authorization" :  appToken},
        mode: "cors",
      })
        .then((response) => {
          if (!response.ok) throw new Error(response.status);
          else return response.json();
        })
        .then((result) => {
          setClients(result.data);
          setActiveClients(result.count)
        })
        .catch((error) => {
          setError("User could not be authenticated");
        });
    }, [] );
    
    useEffect(() => {
        fetch(`${BASE_URL}/clients/${appUser._id}/cards`, {
          method: "GET",
          headers: { "content-type": "application/json", "X-Authorization" :  appToken},
          mode: "cors",
        })
          .then((response) => {
            if (!response.ok) throw new Error(response.status);
            else return response.json();
          })
          .then((result) => {
            setActiveCards(result.count)
          })
          .catch((error) => {
            setError("User could not be authenticated");
          });
      }, [] );
  

    return (
        <>
            <div className="manager-profile">
                <h1>ИНФОРМАЦИЯ</h1>
                
                <div className="container-progressbars">
                    <div>
                        <h2>Активни карти</h2>
                        <div className="progressbar">
                            <svg className="progressbar-svg">
                                <circle cx="80" cy="80" r="70" className="progressbar-svg-circle circle-cards shadow-cards"> </circle>
                            </svg>
                            <span className="progressbar-text shadow-cards">{activeCards}</span>
                        </div>
                    </div>
                    <div>
                        <h2>Активни клиенти</h2>
                        <div className="progressbar">
                            <svg className="progressbar-svg">
                                <circle cx="80" cy="80" r="70" className="progressbar-svg-circle circle-clients shadow-clients"> </circle>
                            </svg>
                            <span className="progressbar-text shadow-clients">{activeClients}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ManagerProfile;