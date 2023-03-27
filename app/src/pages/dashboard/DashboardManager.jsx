import React from "react";
import UserInfo from "../../components/user/user-info/UserInfo";

const DashboardManager = ({ user }) => {
  return (
    <main className="dashboard dashboard--manager">
      <h1>Dashboard Manager</h1>
      <UserInfo user={user} />
    </main>
  );
};

export default DashboardManager;
