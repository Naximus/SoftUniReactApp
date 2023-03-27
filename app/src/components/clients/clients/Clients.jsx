import { useContext, useEffect, useState } from "react";
import { BASE_URL } from "../../../api/config";
import { useNavigate } from "react-router-dom";
import SingleClient from "./SingleClient";
import { AppTokenContext } from "../../../contexts/AppTokenContext";


const Clients = () => {
  const [clients, setClients] = useState([]);
  const [error, setError] = useState(undefined);
  const { appToken, setAppToken } = useContext(AppTokenContext)

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
      })
      .catch((error) => {
        console.log("error: " + error);
        setError("User could not be authenticated");
      });
  }, []);

  return (
    <div className="clients-holder">
      <div className="search-bar">
        <input type="text" />
      </div>
      <div className="clients">
        {clients.map(client => (
          < SingleClient key={client._id} client= {client} />
          // <div className="client-holder" key={client._id}>
          //   {/* <p>{client.username} - {client.name} - active:{client.active.toString()}</p> */}
          //   {/* <h3>{client.name}</h3> */}
          // </div>
        ))}
      </div>
    </div>
  );
};


export default Clients;