import React from 'react';
import '../styles/Categories.css';

function Categories() {
    return (
        <div className='categories-wrapper'>
            <div className='category-option'></div>
            <div className='option-buttons'>
                <button>Crear</button>
                <button>Editar</button>
                <button>Ver</button>
                <button>Eliminar</button>
            </div>
        </div>
    );
}

export default Categories;