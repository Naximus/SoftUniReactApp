import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
// import Cookies from "js-cookie";
// import { useJwt } from "react-jwt";
import jwt_decode from "jwt-decode";

import "./App.scss";
import Admin from "./pages/admin/Admin";
import ClientProfile from "./pages/client-profile/ClientProfile";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import Header from "./components/common/header/Header";
import Logout from "./pages/logout/Logout";

import ReqirePermission from "./guards/ReqirePermission";
import NotFound from "./components/not-found/NotFound";

import { localStorageTokenName } from "./config";


import Clients from "./components/clients/clients/Clients";
import CreateManager from "./pages/admin/manager-create/CreateManager";
import CreateTrainer from "./pages/manager-profile/trainer-create/CreateTrainer";
import CreateClient from "./pages/trainer-profile/client-create/CreateClient";
import { ClientContext } from "./contexts/ClientContext";
import { AppTokenContext } from "./contexts/AppTokenContext";
import { AppUserContex } from "./contexts/AppUserContext";
import Home from "./pages/home/Home";
import TrainersListForClients from "./pages/trainers-list/TrainerListForClients";
import Trainers from "./components/trainers/trainers/Trainers";
import TrainerProfile from "./pages/trainer-profile/TrainerProfile";
import { TrainerContext } from "./contexts/TrainerContext";
import ManagerProfile from "./pages/manager-profile/ManagerProfile";

function App() {
  const navigate = useNavigate();
  const lsToken = localStorage.getItem(localStorageTokenName);
  const decodedToken = lsToken
    ? jwt_decode(lsToken)
    : {
        type: "guest",
      };
  const [appUser, setAppUser] = useState(decodedToken);
  const [appToken, setAppToken] = useState(lsToken);
  const [currentClient, setCurrentUser] =useState();
  const [ currentTrainer, setCurrentTrenier ] = useState();


  const loginHandler = (token, decodedToken) => {
    setAppToken(token);
    setAppUser(decodedToken);
    console.log(decodedToken.type);
    // return <Dashboard appUser={appUser} />;
    return navigate(`/${decodedToken.type}`);
  };

  const logoutHandler = () => {
    localStorage.removeItem(localStorageTokenName);
    setAppUser({ type: "guest" });
  };


  return (
    <div className="App">
      <ClientContext.Provider value={{currentClient, setCurrentUser}}>
      <AppTokenContext.Provider value={{appToken, setAppToken}}>
      <AppUserContex.Provider value={{appUser, setAppUser}}>
      <TrainerContext.Provider value={{currentTrainer, setCurrentTrenier}}>

      <Header userType={appUser.type} />
      <Routes>
        <Route path="/login" element={<Login onLogin={loginHandler} />} />
        <Route
          path="/"
          element={
              <Home />
          }
        />

        <Route
          path="/client"
          element={
            <ReqirePermission redirectTo="/client">
              <Dashboard appUser={appUser} />
            </ReqirePermission>
          }
        />
        <Route
          path="/trainer"
          element={
            <ReqirePermission redirectTo="/trainer">
              <Dashboard appUser={appUser} />
            </ReqirePermission>
          }
        />
          <Route
          path="/manager"
          element={
            <ReqirePermission redirectTo="/manager">
              <Dashboard appUser={appUser} />
            </ReqirePermission>
          }
        />

        <Route path="manager/:manager" element={<ManagerProfile />}></Route>




        <Route path="client/:clientId" element={<ClientProfile />}></Route>

        <Route path="/trainers-for-clients" element={<TrainersListForClients />} />
        <Route path="/trainers" element={<Trainers />} />
        <Route path="trainers/:trainerId" element={<TrainerProfile />}></Route>
    
        {/* <Route
          path="/clients"
          element={
            // <ReqirePermission redirectTo="/login">
            <Clients appUser={appUser} appToken={appToken} />
            // </ReqirePermission>
          }
        /> */}
        <Route path="/logout" element={<Logout onLogout={logoutHandler} />} />
       
        <Route path="create-manager" element={<CreateManager />} />
        <Route path="create-trainer" element={<CreateTrainer />} />
        <Route path="create-client" element={<CreateClient/>} />


        <Route path="clients" element={<Clients />}></Route>
        <Route path="clients/:clientId" element={<ClientProfile />}></Route>

        <Route path="*" element={<NotFound status={404} />} />
      </Routes>
      
      </TrainerContext.Provider>
      </AppUserContex.Provider>
      </AppTokenContext.Provider>
      </ ClientContext.Provider>
    </div>
  );
}

export default App;
