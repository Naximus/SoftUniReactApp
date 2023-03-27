import React from "react";
import UserInfo from "../../components/user/user-info/UserInfo";
import ClientProfile from "../client-profile/ClientProfile";
import DashboardManager from "./DashboardManager";
import DashboardTrainer from "./DashboardTrainer";


const Dashboard = ({appUser}) => {
    return appUser? 
        appUser.type === "manager"
            ? <DashboardManager user={appUser} />
            : appUser.type === "trainer"
            ? <DashboardTrainer user={appUser} />
            : <ClientProfile user={appUser} />
        : null;
}

export default Dashboard;