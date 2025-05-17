import React, { useRef, useState, useEffect } from "react"; 
import '../../styles/Dashboard/Dashboard.css'; 
import hoverSound from "../../assets/hover-sound.wav"; 
import menuSound from "../../assets/click-sound.wav"; 
import Navbar from "../../components/Dashboard/Navbar";
import Statistics from "../../components/Dashboard/Statistics";
import UserPanel from "../../components/Dashboard/UserPanel";
import FeaturePanel from "../../components/Dashboard/FeaturePanel";

function Dashboard() { 
    const [soundEnabled, setSoundEnabled] = useState(false);
    const audioRef = useRef(new Audio(hoverSound));
    const menuRef = useRef(new Audio(menuSound));

    useEffect(() => {
        audioRef.current.load();
        menuRef.current.load();
    }, []);

    const enableSounds = () => setSoundEnabled(true);
    
    const playSound = () => {
        if (soundEnabled) {
            audioRef.current.currentTime = 0;
            audioRef.current.volume = 0.5;
            audioRef.current.play();
        }
    };

    const playMenuSound = () => {
        if (soundEnabled) {
            menuRef.current.currentTime = 0;
            menuRef.current.play();
            menuRef.current.volume = 0.7;
        }
    };


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
