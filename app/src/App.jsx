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


  const loginHandler = (token, decodedToken) => {
    setAppToken(token);
    setAppUser(decodedToken);
    return navigate(`/`);
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
      <Header userType={appUser.type} />
      <Routes>
        <Route path="/login" element={<Login onLogin={loginHandler} />} />
        <Route
          path="/"
          element={
            // <ReqirePermission redirectTo="/login">
              <Dashboard appUser={appUser} />
            // </ReqirePermission>
          }
        />
        {/* <Route
          path="/create-client"
          element={
            // <ReqirePermission redirectTo="/login">
            <CreateClient />
            // </ReqirePermission>
          }
        /> */}
        {/* <Route
          path="/clients"
          element={
            // <ReqirePermission redirectTo="/login">
            <Clients appUser={appUser} appToken={appToken} />
            // </ReqirePermission>
          }
        /> */}
        <Route path="/logout" element={<Logout onLogout={logoutHandler} />} />
        {/* <Route
          path="/admin"
          element={
            <ReqirePermission redirectTo="/login">
              <Admin appUser={appUser} />
            </ReqirePermission>
          }
        > */}
          {/* <Route path="create-manager" element={<CreateManager user={appUser} />} /> */}
        {/* </Route> */}
        <Route path="create-manager" element={<CreateManager />} />
        <Route path="create-trainer" element={<CreateTrainer />} />
        <Route path="create-client" element={<CreateClient/>} />

        {/* <Route path="clients" element={<Clients appUser={appUser} appToken={appToken}/>} /> */}
        {/* <Route
          path="/clientProfile"
          element={
            // <ReqirePermission redirectTo="/login">
              <ClientProfile user={appUser} />
            // </ReqirePermission>
          }
        /> */}

        <Route path="clients" element={<Clients />}>
        </Route>
        <Route path="clients/:clientId" element={<ClientProfile />}>
          {/* <Route path="cards" element={<ClientProfileCards />} />
          <Route path="info" element={<ClientProfileInfo />} />
          <Route path="dashboard" element={<ClientProfileDashboard />} />
          <Route path="*" element={<NotFound status={404} />} /> */}
        </Route>


        {/* <Route
          path="/client-profile"
          element={<ClientProfile user={appUser} />}
        >
          <Route index element={<ClientProfile />} />
          <Route
            path="cards"
            element={<ClientProfileCards clentCard={clentCard} />}
          />
          <Route path="info" element={<ClientProfileInfo appUser={appUser} />} />
          <Route path="dashboard" element={<ClientProfileDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Route> */}
        <Route path="*" element={<NotFound status={404} />} />
      </Routes>
      </AppUserContex.Provider>
      </AppTokenContext.Provider>
      </ ClientContext.Provider>
    </div>
  );
}

export default App;
