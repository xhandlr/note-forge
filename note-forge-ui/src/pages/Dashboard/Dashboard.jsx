import React, { useRef, useState, useEffect } from "react"; 
import Navbar from "../../components/UI/Navbar";
import Statistics from "../../components/Dashboard/Statistics";
import UserPanel from "../../components/Dashboard/UserPanel";
import FeaturePanel from "../../components/Dashboard/FeaturePanel";

function Dashboard() { 
    const audioRef = useRef(new Audio(hoverSound));
    const menuRef = useRef(new Audio(menuSound));

    useEffect(() => {
        audioRef.current.load();
        menuRef.current.load();
    }, []);

    const enableSounds = () => setSoundEnabled(true);

    return (
        <div>
            <Navbar />
            <div className="dashboard" onClick={enableSounds}>
                <div className="feature-wrapper">
                    <Statistics />
                    <FeaturePanel />
                    <UserPanel />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
