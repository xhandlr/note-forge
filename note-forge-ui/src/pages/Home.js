import React, { useRef, useState, useEffect } from "react"; 
import '../styles/Home.css'; 
import hoverSound from "../assets/hover-sound.wav"; 
import menuSound from "../assets/click-sound.wav"; 
import Navbar from "../components/Navbar";


function Home() { 
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

    return ( 
        <div className="home-page" onClick={enableSounds}>  {/* Permitir sonidos al hacer clic en cualquier parte de la página */}
            <Navbar playMenuSound={playMenuSound} />
            <body className="home-body">
                <div className="recently-exercises">
                    <div className="title-recently">
                        <h1>Ejercicios recientes</h1>
                    </div>
                    <p>No hay ejercicios agregados recientemente.</p>
                </div>
                <div className="menu">
                    <div className="button-group">
                        <div className="top-buttons">
                            <a href="/home/create">
                                <button className="create-button" onMouseEnter={playSound} onClick={playMenuSound}>Crear Ejercicio</button>
                            </a>
                            <a href="/home/exercises">
                                <button className="read-button" onMouseEnter={playSound} onClick={playMenuSound}>Ver Ejercicios</button>
                            </a>
                        </div>
                        <div className="bottom-buttons">
                            <button className="delete-button" onMouseEnter={playSound} onClick={playMenuSound}>Eliminar Ejercicios</button>
                            <button className="edit-button" onMouseEnter={playSound} onClick={playMenuSound}>Editar Ejercicios</button>
                        </div>
                    </div>
                    <button className="export-button" onMouseEnter={playSound} onClick={playMenuSound}>Exportar a LaTeX</button>
                </div>
            </body>
        </div>
    );
}

export default Home;
