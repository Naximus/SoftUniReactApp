import { useContext, useEffect, useState } from "react";
import { AppTokenContext } from "../../contexts/AppTokenContext";
import { ClientContext } from "../../contexts/ClientContext";
import { BASE_URL } from "../../api/config";
import { AppUserContex } from "../../contexts/AppUserContext";
import { EditSubscriptionCard } from "./edit-subscription-card/EditSubsctiptionCard";

export const SubscriptionCards = ({
    _id,
    type,
    start,
    end,
    trainingsLeft,
    paid,
    active,
    trainings
    
}) => {
    const currentCard = {
        _id,
        type,
        start,
        end,
        trainingsLeft,
        paid,
        active,
        trainings
    }
    const { appToken, setAppToken } = useContext(AppTokenContext);
    const { currentClient, setCurrentUser } = useContext(ClientContext);
    const { appUser, setAppUser } = useContext(AppUserContex);
    const [error, setError] = useState(undefined);

    const [ currentDate, setCurrentDate ] = useState(new Date());
    const [ arrivedDate, setArraivedDates ] = useState(trainings);
    const [ clientArrived, setClientArrived ] = useState("icon-check-ring");
    const [ treningsCount, setTreningsCount ] = useState(trainings.length);
    const [ trainingLeftCounter, setTreningLeft ] = useState(trainingsLeft);
    const [ cartData, setCardData ] = useState(currentCard);


    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
      }
    
      const handleClose = () => {
        setIsOpen(false);
      }


    // To set two dates to two variables
    // let curentDate = new Date();
    let endDate = new Date(end);
    
    const clientId = currentClient._id;
    
    const isPaid  = paid;
    const paidClass = isPaid ? 'paid-card' : 'unpaid-card';

    useEffect(() => {
        const interval = setInterval(() => {
          const now = new Date();
          if (now.getDate() !== currentDate.getDate()) {
            setCurrentDate(now);
            }
        }, 1000 * 60 * 60); // Update once per hour
    
        return () => clearInterval(interval);
      }, [currentDate]);    
    
      useEffect(() => {
            
            if (treningsCount > 0) {
                const lastItem = trainings[trainings.length - 1];

                const formattedNewDate  = currentDate.toISOString().substring(0, 10);
                const formattedServerDate = new Date(lastItem.date).toISOString().substring(0, 10);

                if (formattedNewDate != formattedServerDate) {
                    setClientArrived("icon-check-ring");
                    }else {
                        setClientArrived("icon-check-ring-active");
                    }
            }
            
      }, [])

    // To calculate the time difference of two dates
    let Difference_In_Time = endDate.getTime() - currentDate.getTime();
    
    // To calculate the no. of days between two dates
    let Difference_In_Days = Math.ceil(Difference_In_Time / (1000 * 3600 * 24));

    

    const clientIsArrived = async () => {
        
        if (clientArrived == "icon-check-ring-active") {
            return;
        }

        setClientArrived('icon-check-ring-active');
        const newTrainingsLeft = Number(trainingLeftCounter - 1);

        await fetch(`${BASE_URL}/clients/${clientId}/cards/${_id}/trainings`, {
            method: "POST",
            headers: { "content-type": "application/json", "X-Authorization" :  appToken},
            mode: "cors",
            body: JSON.stringify({
                trainer: [appUser._id], 
                date: [currentDate],
                trainingsLeft: newTrainingsLeft

            }),
          })
            .then((response) => {
              if (!response.ok) throw new Error(response.status);
              else return response.json();
            })
            .then((result) => {
                setTreningsCount(result.trainings.length)
                const data = result.trainings;
                setArraivedDates(state => [...data]);
                setTreningLeft(result.trainingsLeft);
                setCardData(result);
                
            })
            .catch((error) => {
              console.log("error: " + error);
              setClientArrived('icon-check-ring')
              setError("User could not be authenticated");
            });

    }

    
    return (
        <>
        {isOpen && <EditSubscriptionCard cartData= {currentCard} onClose={handleClose} />}
        <div className={`client-card ${type}`}>
            <div className="card-top-part">
                <div className="card-logo alfa-logo-no-text "></div>
                <h3 className="card-type">{type}</h3>
                <div className={`card-circle ${paidClass}`}></div>
            </div>
            <div className="card-middle-part">
                <div className="days-let">
                    <h4>Оставащи<br/>дни</h4>
                    <h4>{Difference_In_Days}</h4>
                </div>
                <div className="training-left">
                <h4>Оставащи<br/>тренировки</h4>
                    <h4>{trainingLeftCounter}</h4>
                </div>
            </div>
            <div className="client-visits">
                <div className="row-icons icon-edit" onClick={handleClick}> 
                </div>  
                
                <div className="card-visits">
                    <h3>Посещени</h3>
                    <div className= 'data-mini'>
                    {treningsCount > 0 ? 
                    arrivedDate.map((item) => (
                        <div key={item.date.substring(0, 10)} >
                        <p>{item.date.substring(0, 10)}</p>
                        </div>
                    ))
                    : <h3 >Няма посещения</h3>
                    }
                    </div>
                </div>
                <div className={`row-icons ${clientArrived}`} onClick={clientIsArrived}></div>
            </div>
        </div>
        </>
    )
}