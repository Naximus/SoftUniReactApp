import { useContext } from "react";
import { ClientContext } from "../../../contexts/ClientContext";

export const ClientTarget = ({user}) => {
    const { currentClient, setCurrentUser } = useContext(ClientContext);
    return (
        <div className="main-box client-target">
            <h3>ЦЕЛ НА КЛИЕНТА</h3>
            <p>{currentClient.clientTarget}</p>
        </div>
)
}