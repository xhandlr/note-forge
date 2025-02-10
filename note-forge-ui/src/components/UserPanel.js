import React from 'react';
import '../styles/UserPanel.css';

function Panel() {
    return (
        <div className='background-panel'>
            <div className='circle-panel'></div>
            <button>Crear ejercicio</button>
            <button>Crear categoría</button>
            <button>Crear guía</button>
            <button>Exportar a látex</button>
        </div>
    );
}

export default Panel;