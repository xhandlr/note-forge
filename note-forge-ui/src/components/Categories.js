import React, { useEffect, useState } from 'react';
import CategoryOption from './CategoryOption';
import '../styles/Categories.css';

function Categories() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Este ejemplo usa un fetch ficticio

        fetch('/categories')
            .then(response => response.json())
            .then(data => setCategories(data))  // Guarda las categorías en el estado.
            .catch(error => console.error("Error fetching categories:", error));
    }, []);  // Se ejecuta solo una vez al cargar el componente.

    return (
        <div className='categories-wrapper'>
            {categories.map(category => (
                <CategoryOption key={category.id} name={category.name} />
            ))}

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
