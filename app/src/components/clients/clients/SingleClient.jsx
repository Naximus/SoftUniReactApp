import React, { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClientContext } from "../../../contexts/ClientContext";



const SingleClient = ({
    client
}) => {

    const navigate = useNavigate();

    const { currentClient, setCurrentUser } = useContext(ClientContext);
   
    const onClickUser = () => {
        
        setCurrentUser(client);
        navigate(`/clients/${client._id}`);
    }

    return (
        
        <div className="client-holder">
            <h1>{client.name}</h1>
            <p>active:{client.active.toString()}</p> 

            <button className="btn-only-text-outline-small" onClick={onClickUser}>Details</button>
            
            
        </div>
    )
}


export default SingleClient;