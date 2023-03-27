import React from "react";
import UserInfo from "../../components/user/user-info/UserInfo";

const DashboardTrainer = ({ user }) => {
  return (
    <main className="dashboard dashboard--trainer">
      <h1>Dashboard Trainer</h1>
      <UserInfo user={user} />
    </main>
  );
};

export default DashboardTrainer;
