import React, { useContext } from "react";
import { ClientContext } from "../../../contexts/ClientContext";


const ClientProfileDashboard = () => {

    const { currentClient, setCurrentUser } = useContext(ClientContext);

    return(
        <h1>ClientProfileDashboard</h1>
    )
}

export default ClientProfileDashboard;