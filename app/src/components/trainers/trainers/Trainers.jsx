import { useContext, useEffect, useState } from "react";
import { BASE_URL } from "../../../api/config";
import { useNavigate } from "react-router-dom";
import { AppTokenContext } from "../../../contexts/AppTokenContext";
import SingleTrainer from "./SingleTrainer";
import { TrainerContext } from "../../../contexts/TrainerContext";


const Trainers = () => {
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
          < SingleTrainer key={trainer._id} trainer= {trainer} />
        ))}
      </div>
    </div>
   
    </>
  );
};


export default Trainers;