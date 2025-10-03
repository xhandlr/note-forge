import React from 'react';
import { useNavigate } from 'react-router-dom';

function Panel() {
    const navigate = useNavigate();

    return (
        <div className='background-panel'>
            <div className='circle-panel'></div>
            <button onClick={() => { navigate("/create-exercise"); }}>Crear ejercicio</button>
            <button onClick={() => { navigate("/create-category"); }}>Crear categoría</button>
            <button onClick={() => { navigate("/create-guide"); }}>Crear guía</button>
            <button onClick={() => { navigate("/library"); }}>Mi biblioteca</button>
        </div>
    );
}

export default Panel;