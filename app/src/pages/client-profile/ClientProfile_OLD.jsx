import React from "react";
import {  useState } from 'react';
import { Link, Outlet, useLocation  } from 'react-router-dom';


const ClientProfile = ({user}) => {
    if (!user) {
        user = {};
    }
    let currentURL = useLocation();
    currentURL = currentURL.pathname;

    let infoTrue = true;
    let cardTrue = true;
    let dashboardTrue = true;

    if (currentURL === '/client-profile/cards') {
        infoTrue = false;
        dashboardTrue = false;
    } else if (currentURL === '/client-profile/info'){
        cardTrue = false;
        dashboardTrue = false;
    } else if (currentURL === '/client-profile/dashboard') {
        infoTrue = false;
        cardTrue = false;
    }

    const [showProfileInfo, setShowProfileInfo] = useState(infoTrue);
    const [showProfileCards, setShowProfileCards] = useState(cardTrue);
    const [showProfileDashboard, setShowProfileDashboard] = useState(dashboardTrue);

    const handleInfoClick = (e) => {
        if (e.target.className === 'btn-icons icon-info') {
            setShowProfileInfo(true);
            setShowProfileCards(false);
            setShowProfileDashboard(false);
        } else if (e.target.className === 'btn-icons icon-card') {
            setShowProfileInfo(false);
            setShowProfileCards(true);
            setShowProfileDashboard(false);
        }
        else if (e.target.className === 'btn-icons icon-desk') {
            setShowProfileInfo(false);
            setShowProfileCards(false);
            setShowProfileDashboard(true);
        }
    }

    return(
        <main className="client-profile mobile-pages">
            <div className="client-header">
                <div className="client-avatar">
                    {user ? <img src={user.image} alt="avatar" /> : null}
                    {/* <img src={user.image} alt="avatar" /> */}
                </div>
                {user ? <h3 className="client-name">{user.clientName}</h3> : null}
                {/* <h3 className="client-name">{user.clientName}</h3> */}
            </div>

            <nav className="navigation">
                <Link to="info" className={showProfileInfo ? "btn-icons icon-info-active" : "btn-icons icon-info"} onClick={handleInfoClick}></Link>
                <Link to="cards" className={showProfileCards ? "btn-icons icon-card-active" : "btn-icons icon-card"} onClick={handleInfoClick}></Link>
                <Link to="dashboard" className={showProfileDashboard ? "btn-icons icon-desk-active" : "btn-icons icon-desk"} onClick={handleInfoClick}></Link>
            </nav>
            <Outlet />

        </main>
    )
}

export default ClientProfile;