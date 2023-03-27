import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../api/config";
import { AppTokenContext } from "../../../contexts/AppTokenContext";

const CreateClient = () => {
  const navigate = useNavigate();
  const { appToken, setAppToken } = useContext(AppTokenContext)
  
  console.log(appToken);
  const [values, setValues] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState(undefined);

  const onChangeHandler = (e) => {
    setValues((state) => ({ ...state, [e.target.name]: e.target.value }));
    // TODO Form validation
    setIsValid(true);
  };

  const onSubmitHandler = async (e) => {
    console.log(appToken);
    e.preventDefault();
    if (isValid) {
      // TODO make post request
      const result = await fetch(`${BASE_URL}/clients`, {
        method: "POST",
        headers: { "content-type": "application/json", "X-Authorization" :  appToken},
        mode: "cors",
        body: JSON.stringify({
          username: values.name,
          password: values.password,
          email: values.email,
          name: values.name,
        }),
      })
        .then((response) => {
          if (!response.ok) throw new Error(response.status);
          else return response.json();
        })
        .then((result) => {
          navigate("/");
        })
        .catch((error) => {
          console.log("error: " + error);
          setError("User could not be authenticated");
        });
    }
  };

  return (
    <form id="create" onSubmit={onSubmitHandler}>
      <div className="client-profile mobile-pages">
        {error ? <div className="error">{error}</div> : null}
        <h1>Създавене на клиента</h1>
        <div className="client-profile-info">
          <div className="input-holder">
            <label
              htmlFor="clientName"
              className="icon-user-white row-icons"
            ></label>
            <input
              value={values.name}
              onChange={onChangeHandler}
              type="text"
              id="name"
              name="name"
              placeholder="Име на клиента"
            />
          </div>

          <div className="input-holder">
            <label
              htmlFor="clientEmail"
              className="icon-email row-icons"
            ></label>
            <input
              value={values.email}
              onChange={onChangeHandler}
              type="email"
              id="email"
              name="email"
              placeholder="Email"
            />
          </div>

          <div className="input-holder">
            <label
              htmlFor="ClienUsername"
              className="icon-user-cicrle-white row-icons"
            ></label>
            <input
              value={values.username}
              onChange={onChangeHandler}
              type="text"
              id="username"
              name="username"
              placeholder="Псевдоним, добави ако няма email"
            />
          </div>

          <div className="input-holder">
            <label
              htmlFor="ClienPasswor"
              className="icon-lock-white row-icons"
            ></label>
            <input
              value={values.password}
              onChange={onChangeHandler}
              type="password"
              id="password"
              name="password"
              placeholder="***********"
            />
          </div>
        </div>

        <button type="submit" className="btn-only-text-outline-small">
          Запази
        </button>
      </div>
    </form>
  );
};


export default CreateClient;