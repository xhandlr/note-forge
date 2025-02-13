import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/UserPanel.css';

function Panel() {
    const navigate = useNavigate();

    return (
        <div className='background-panel'>
            <div className='circle-panel'></div>
            <button onClick={() => { navigate("/create-exercise"); }}>Crear ejercicio</button>
            <button onClick={() => { navigate("/create-category"); }}>Crear categoría</button>
            <button>Crear guía</button>
            <button>Exportar a látex</button>
        </div>
    );
}

export default Panel;