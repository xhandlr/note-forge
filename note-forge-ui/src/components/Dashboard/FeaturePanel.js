import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Dashboard/Dashboard.css";

function FeaturePanel({user}) {
    const navigate = useNavigate();
    
    return (
        <div className='feature-menu'>
            <h1>Bienvenido, {user}</h1>
            <div className="feature-buttons">
                <div className="button-container">
                <button className="categories-button" onClick={() => navigate("/categories")}>Categorías</button>
                </div>
                <div className="button-container">
                <button className="exercises-button" onClick={() => navigate("/exercises")}>Mis ejercicios</button></div>
                <div className="button-container">
                <button className="guides-button" onClick={() => navigate("/guides")}>Guías</button></div>
            </div>
            <h1>Categorías fijadas</h1>
        </div>
    );
}

export default FeaturePanel;