import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

function FeaturePanel({user}) {
    const navigate = useNavigate();
    
    return (
        <div className='feature-menu'>
            <h1>Bienvenido, {user}</h1>
            <div className="feature-buttons">
                <button onClick={() => navigate("/categories")}>Categorías</button>
                <button onClick={() => navigate("/exercises")}>Mis ejercicios</button>
                <button onClick={() => navigate("/guides")}>Guías</button>
            </div>
            <h1>Fijados</h1>
        </div>
    );
}

export default FeaturePanel;