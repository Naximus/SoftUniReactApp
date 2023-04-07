import { useContext, useEffect, useState } from "react";
import { AppTokenContext } from "../../contexts/AppTokenContext";
import { BASE_URL } from "../../api/config";
import SingleTrainer from "../../components/trainers/trainers/SingleTrainer";
import SingleTrainerForClients from "../../components/trainers/trainers/SingleTrainerForClients";



const TrainersListForClients = () => {

    const [trainers, setTrainers] = useState([]);
    const [error, setError] = useState(undefined);
    const { appToken, setAppToken } = useContext(AppTokenContext);

  // serach
  const [query, setQuery] = useState('');
  // =============


  useEffect(() => {
    fetch(`${BASE_URL}/trainers`, {
      method: "GET",
      headers: { "content-type": "application/json", "X-Authorization" :  appToken},
      mode: "cors",
    })
      .then((response) => {
        if (!response.ok) throw new Error(response.status);
        else return response.json();
      })
      .then((result) => {
        setTrainers(result.data);
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

    const filteredData = trainers.filter((item) => {
      // Filter the data based on the search query and searchKey
      return item[searchKey].toLowerCase().includes(query.toLowerCase());
    });
  // =============

    return (
      <>

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
          {filteredData.map((trainer) => (
            < SingleTrainerForClients key={trainer._id} trainer= {trainer} />
          ))}
        </div>
      </div>
      </>
    )
}

export default TrainersListForClients;