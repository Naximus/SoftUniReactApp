import React, { useContext, useEffect } from "react";
import { ClientContext } from "../../../contexts/ClientContext";
import Login from "../../../pages/login/Login";

import { ClientFoodRegime } from "../client-elemets/ClientFoodRegime";
import { ClientNotes } from "../client-elemets/ClientNotes";
import { ClientTarget } from "../client-elemets/ClientTarget";

const ClientProfileInfo = () => {

    const { currentClient, setCurrentUser } = useContext(ClientContext);
    

    return(
        <>
            <ul className="main-box">
                <li>
                    <div className="icon-phone inline-icons"></div>
                    <p>{currentClient.phoneNumber}</p>
                </li>
                <li>
                    <div className="icon-email inline-icons"></div>
                    <p>{currentClient.email}</p>
                </li>
                <li>
                    <div className="icon-calendar-add  inline-icons"></div>
                    <p>{currentClient.createDate}</p>
                </li>
            </ul>
            
            <ClientTarget  />
            <ClientNotes  />
            <ClientFoodRegime />
            </>
    )
}

export default ClientProfileInfo;