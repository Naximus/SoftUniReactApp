import React, { useContext } from "react";
import { ClientContext } from "../../../contexts/ClientContext";
import { SubscriptionCards } from "../../subscription-cards/SubscriptionCards";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../api/config";
import { AddSubscriptionCard } from "../../subscription-cards/add-subscription-card/AddSubscriptionCard";
import { useNavigate } from "react-router-dom";
import { AppTokenContext } from "../../../contexts/AppTokenContext";
import { CreateCardConext } from "../../../contexts/CreatCardContex";

const ClientProfileCards = () => {
    const { appToken, setAppToken } = useContext(AppTokenContext);
    const { currentClient, setCurrentUser } = useContext(ClientContext);



    const [clientCards, setClientCards] = useState([]);
    const [error, setError] = useState(undefined);
    const [addCard, setAddCard] = useState(false);

    const clientId = currentClient._id;
    const clientCreator = currentClient.creator;

    const showAddCardsMenu = () => {
        setAddCard(true);
    }

    useEffect(() => {
      fetch(`${BASE_URL}/clients/${clientId}/cards`, {
        method: "GET",
        headers: { "content-type": "application/json", "X-Authorization" :  appToken},
        mode: "cors",
      })
        .then((response) => {
          if (!response.ok) throw new Error(response.status);
          else return response.json();
        })
        .then((result) => {
          setClientCards(result.data);
        })
        .catch((error) => {
          console.log("error: " + error);
          setError("User could not be authenticated");
        });
    }, []);


    // -------------------------------------
    const navigate = useNavigate();
    const onSaveCard = async (newCard) => {
        // TODO Send data to API and redirect to /client-profile/cards
        console.log(newCard);
        
        
        const result = await fetch(`${BASE_URL}/clients/${clientId}/cards`, {
            method: "POST",
            headers: { "content-type": "application/json", "X-Authorization" :  appToken},
            mode: "cors",
            body: JSON.stringify({
                type: newCard.type,
                start: newCard.start,
                end: newCard.end,
                trainingsLeft: newCard.trainingsLeft,
                paid: newCard.paid,
                owner: newCard.owner,
                trainer: clientCreator,

            }),
          })
            .then((response) => {
              if (!response.ok) throw new Error(response.status);
              else return response.json();
            })
            .then((result) => {
              setClientCards(state => [...state, result])
              navigate(`/clients/${clientId}`);
            })
            .catch((error) => {
              console.log("error: " + error);
              setError("User could not be authenticated");
            });

            setAddCard(false);
      }

    // --------------------------------------------

        const onUpdateCard = async (_id, updatedCard) => {
            // TODO Send data to API and redirect to /client-profile/cards
           
            
            
            const result = await fetch(`${BASE_URL}/clients/${clientId}/cards/${_id}`, {
                method: "PUT",
                headers: { "content-type": "application/json", "X-Authorization" :  appToken},
                mode: "cors",
                body: JSON.stringify({
                    _id: updatedCard._id,
                    start: updatedCard.start,
                    end: updatedCard.end,
                    trainingsLeft: updatedCard.trainingsLeft,
                    paid: updatedCard.paid
                }),
              })
                .then((response) => {
                  if (!response.ok) throw new Error(response.status);
                  else return response.json();
                })
                .then((result) => {
                  const cards = clientCards;
                  const updatedCards = cards.map((card) => {
                    if (card._id === result._id) {
                      // Replace the matching card with the updated result
                      return result;
                    } else {
                      return card;
                    }
                  });
                  setClientCards(updatedCards);
                  navigate(`/clients/${clientId}`);
                })
                .catch((error) => {
                  console.log("error: " + error);
                  setError("User could not be authenticated");
                });
    
          }
    
        // --------------------------------------------
          const deleteSelectedCard = async (_id) => {
          

                const result = await fetch(`${BASE_URL}/clients/${clientId}/cards/${_id}`, {
                method: "DELETE",
                headers: { "content-type": "application/json", "X-Authorization" :  appToken},
                mode: "cors",
                body: JSON.stringify({
                }),
              })
                .then((response) => {
                  if (!response.ok) throw new Error(response.status);
                  else return response.json();
                })
                .then((result) => {
                  const newData = clientCards;
                  const state = newData.filter((x) => x._id !== result._id);
                  setClientCards(state)
                  navigate(`/clients/${clientId}`);
                })
                .catch((error) => {
                  console.log("error: " + error);
                  setError("User could not be authenticated");
                });
    
          }


      const cardContexProps = {
          onSaveCard,
          clientCreator,
          clientId,
          setAddCard,
          onUpdateCard,
          deleteSelectedCard
      }
    return(
        <>
       
       <CreateCardConext.Provider value = {cardContexProps} >
        <div className="client-cards-holder">
            {clientCards.map(x => 
                <SubscriptionCards key= {x._id} {...x} /> 
            )}
            {clientCards.length === 0 && (
                <h3 >Няма активни карти</h3>
            )}
            {/* <h1>Cards</h1> */}
            
            <button className="btn-only-text-outline-small" onClick = {showAddCardsMenu}>Добави карта</button>
              
                { addCard && <AddSubscriptionCard />}
              
        </div>
        </CreateCardConext.Provider>
        </>
    )
}

export default ClientProfileCards;