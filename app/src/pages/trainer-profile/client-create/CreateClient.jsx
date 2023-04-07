import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../api/config";
import { AppTokenContext } from "../../../contexts/AppTokenContext";

const CreateClient = () => {
  const navigate = useNavigate();
  const { appToken, setAppToken } = useContext(AppTokenContext)
  
  const [values, setValues] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState(undefined);
  const [showError, setShowError] = useState(true);


  // ==========================================
  const [validationErrors, setValidationErrors] = useState({});
  const validateForm = () => {
    const errors = {};
  
    if (!values.name.trim()) {
      errors.name = "Името на треньора е задължително";
    }
  
    if (!values.password.trim()) {
      errors.password = "Паролата е задължителна";
    }
  
    if (!values.email.trim()) {
      errors.email = "Имейлът е задължителен";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Невалиден имейл адрес";
    }
  
    setValidationErrors(errors);

    setShowError(true);
    // Hide error after 3 seconds
    setTimeout(() => {
      setShowError(false);
      setValidationErrors({});
    }, 3000);

    return Object.keys(errors).length === 0;
  };
  // ==========================================


  const onChangeHandler = (e) => {
    setValues((state) => ({ ...state, [e.target.name]: e.target.value }));
    // TODO Form validation
    setIsValid(true);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (validateForm()) {
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
        .then(async (response) => {
          const res = await response.json()
          if (!response.ok) {
            const err = res.error
            throw new Error(err)
          }
          else return res;
        })
        .then((result) => {
          navigate("/");
        })
        .catch((error) => {
          setError(error.message);
          setShowError(true);
          // Hide error after 3 seconds
          setTimeout(() => {
            setShowError(false);
            setError(undefined)
          }, 3000);

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
          {validationErrors.name && <div className="error">{validationErrors.name}</div>}
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
          {validationErrors.email && <div className="error">{validationErrors.email}</div>}
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
        {validationErrors.password && <div className="error">{validationErrors.password}</div>}
        <button type="submit" className="btn-only-text-outline-small">
          Запази
        </button>
      </div>
    </form>
  );
};


export default CreateClient;