import { useContext, useEffect, useState } from "react";
import { AppTokenContext } from "../../contexts/AppTokenContext";
import { BASE_URL } from "../../api/config";



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
        console.log(result);
        console.log(result.data);
        setTrainers(result.data);
      })
      .catch((error) => {
        console.log("error: " + error);
        setError("User could not be authenticated");
      });
  }, []);

  

    return (
        <h1> trainers-for-clients </h1>
    )
}

export default TrainersListForClients;