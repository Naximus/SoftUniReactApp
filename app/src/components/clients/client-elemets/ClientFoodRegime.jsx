import { useContext } from "react";
import { ClientContext } from "../../../contexts/ClientContext";

export const ClientFoodRegime = ({user}) => {
    const { currentClient, setCurrentUser } = useContext(ClientContext);
    return (
        <div className="main-box client-target">
            <h3>ХРАНИТЕЛЕН РЕЖИМ</h3>
            <p>{currentClient.foodRegime}</p>
        </div>
    )
}