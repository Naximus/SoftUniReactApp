import { useContext, useEffect, useState } from "react";
import { AppTokenContext } from "../../../contexts/AppTokenContext";
import { TrainerContext } from "../../../contexts/TrainerContext";
import { BASE_URL } from "../../../api/config";
import SingleClient from "../../clients/clients/SingleClient";




export const TrainerClients = () => {
    

    const [clients, setClients] = useState([]);
    const [error, setError] = useState(undefined);
    const { appToken, setAppToken } = useContext(AppTokenContext);
    const { currentTrainer, setCurrentTrenier  } = useContext(TrainerContext);
    
  // serach
  const [query, setQuery] = useState('');
  // =============

  const creatorId = currentTrainer._id;

  useEffect(() => {
    fetch(`${BASE_URL}/trainers/${creatorId}/clients`, {
      method: "GET",
      headers: { "content-type": "application/json", "X-Authorization" :  appToken},
      mode: "cors",
    })
      .then((response) => {
        if (!response.ok) throw new Error(response.status);
        else return response.json();
      })
      .then((result) => {
        setClients(result.data);
      })
      .catch((error) => {
        setError("User could not be authenticated");
      });
  }, []);


  // serach
  const searchKey = 'name';
    const handleInputChange = (event) => {
      setQuery(event.target.value);
    };

    const filteredData = clients.filter((item) => {
      // Filter the data based on the search query and searchKey
      return item[searchKey].toLowerCase().includes(query.toLowerCase());
    });

  // =============




    return (
        <div className="clients-holder">
            <div className="search-bar">
            <input 
                type="text"
                placeholder="Search..."
                value={query}
                onChange={handleInputChange}
            />
            </div>
            <div className="clients">
                {filteredData.map((client) => (
                < SingleClient key={client._id} client= {client} />
                ))}
            </div>
        </div>
    )
}

