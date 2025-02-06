import React, { useState } from 'react';
import addCategory from '../services/CategoryService';

function CreateCategory() {

    const [categoryData, setCategoryData] = useState({
        name: '',
        description: ''
    });

    const [Errors, setErrors] = useState({});
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await addCategory(categoryData);
            if (response.message) {
                alert(`Ejercicio almacenado con éxito! ID: ${response.exerciseId}`);
            } else {
                alert("Error al almacenar ejercicio");
            }
        } catch (error) {
            setErrors(error);
            console.log('Error en el registro', error);
        }
    }

    return (
        <div className='create-category'>
            <p>Crear nueva categoría</p>
            <form onSubmit={handleSubmit}>
                <input></input>
            </form>
        </div>
    );
}

export default CreateCategory;