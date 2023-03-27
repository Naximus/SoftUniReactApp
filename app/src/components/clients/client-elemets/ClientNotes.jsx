import { useContext } from "react";
import { ClientContext } from "../../../contexts/ClientContext";

export const ClientNotes = ({user}) => {
    const { currentClient, setCurrentUser } = useContext(ClientContext);
    return (
        
        <div className="main-box client-target">
            <h3>БЕЛЕЖКИ</h3>
            <p>{currentClient.notes}</p>
        </div>
    )
}