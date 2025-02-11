import React, { useRef, useState, useEffect } from "react"; 
import '../styles/Dashboard.css'; 
import hoverSound from "../assets/hover-sound.wav"; 
import menuSound from "../assets/click-sound.wav"; 
import Navbar from "../components/Navbar";
import Categories from "../components/Categories";
import Statistics from "../components/Statistics";
import SearchBar from "../components/SearchBar";
import UserPanel from "../components/UserPanel";
import Exercises from "../components/Exercises";

function Dashboard() { 
    const [soundEnabled, setSoundEnabled] = useState(false);
    const audioRef = useRef(new Audio(hoverSound));
    const menuRef = useRef(new Audio(menuSound));
    const [selectedPanel, setSelectedPanel] = useState("categorias");

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
                <div className="feature-navbar">
                    <button onClick={() => setSelectedPanel("categorias")}>Categorías</button>
                    <button onClick={() => setSelectedPanel("ejercicios")}>Ejercicios</button>
                    <button onClick={() => setSelectedPanel("guias")}>Guías</button>
                </div>
                <SearchBar></SearchBar>
                <div className="feature-wrapper">
                    <Statistics />
                    {selectedPanel === "categorias" && <Categories />}
                    {selectedPanel === "ejercicios" && <Exercises />}
                    <UserPanel />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
