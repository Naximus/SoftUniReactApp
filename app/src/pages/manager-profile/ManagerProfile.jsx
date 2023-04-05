import styles from './ManagerProfile.module.scss';
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
          console.log(result);
          setClients(result.data);
          setActiveClients(result.count)
        })
        .catch((error) => {
          console.log("error: " + error);
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
            console.log(result);
            // setClients(result.data);
            setActiveCards(result.count)
          })
          .catch((error) => {
            console.log("error: " + error);
            setError("User could not be authenticated");
          });
      }, [] );
  

    return (
        <>
            <h1>ОБЩА ИНФОРМАЦИЯ</h1>
            <div className={styles.circleWrap}>
                <div className={styles.circle}>
                <div className={[styles.mask, styles.full].join(' ')}>
                    <div className={styles.fill}></div>
                </div>
                <div className={[styles.mask, styles.half].join(' ')}>
                    <div className={styles.fill}></div>
                </div>
                <div className={styles.insideCircle}> {activeCards} </div>
                </div>
            </div>
            <div className={styles.counter}>{activeClients}</div>
            <div className={styles.counter}>{activeCards}</div>
        </>
    )
}

export default ManagerProfile;