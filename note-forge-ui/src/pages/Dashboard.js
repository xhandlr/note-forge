import React, { useRef, useState, useEffect } from "react"; 
import '../styles/Dashboard.css'; 
import hoverSound from "../assets/hover-sound.wav"; 
import menuSound from "../assets/click-sound.wav"; 
import Navbar from "../components/Navbar";


function Dashboard() { 
    const [soundEnabled, setSoundEnabled] = useState(false);  // Estado para controlar si los sonidos pueden reproducirse
    const audioRef = useRef(new Audio(hoverSound));
    const menuRef = useRef(new Audio(menuSound));

    // UseEffect para cargar los sonidos al principio sin reproducirlos
    useEffect(() => {
        audioRef.current.load();
        menuRef.current.load();
    }, []);

    const enableSounds = () => {
        setSoundEnabled(true);  // Permitir la reproducción de sonidos después de la primera interacción
    };

    const playSound = () => {
        if (soundEnabled) {
            audioRef.current.currentTime = 0; // Reinicia el sonido si ya estaba reproduciéndose
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

    const [selectedPanel, setSelectedPanel] = useState("categorias");

    return (
        <div>
            <Navbar />
            <div onClick={enableSounds}>
                <h1>¡Bienvenido!</h1>
                <div className="feature-navbar">
                    <button>Categorías</button>
                    <button>Ejercicios</button>
                    <button>Guías</button>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;