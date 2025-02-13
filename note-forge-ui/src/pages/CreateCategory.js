import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addCategory } from '../services/CategoryService';
import '../styles/CreateCategory.css';
import Navbar from '../components/Navbar';

function CreateCategory() {

    const navigate = useNavigate();

    const [categoryData, setCategoryData] = useState({
        name: '',
        description: ''
    });

    const [errors, setErrors] = useState({}); 

    const handleChange = (e) => {
        setCategoryData({
            ...categoryData, 
            [e.target.name]: e.target.value
        })
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await addCategory(categoryData);
            if (response.message) {
                alert(`Categoría almacenada con éxito! ID: ${response.categoryId}`);
            } else {
                alert("Error al crear categoría");
            }
        } catch (error) {
            setErrors(error);
            console.log('Error en el registro', error);
        }
    }

    return (
        <body className='create-category-body'>
            <div className="create-category">
                <Navbar />
                <form onSubmit={handleSubmit} className="category-form">
                    <h1>Nueva categoría</h1>
                    <fieldset className="new-category-data">
                        <legend>Crear una nueva categoría</legend>
                        <label for="category-name">Nombre: <input id="category-name" name="name" type="text" maxlength="120" onChange={handleChange} required />
                        </label>
                        <label for="category-description">Descripción: <textarea id="category-description" name="description" rows="3" cols="50" maxlength="255" className='category-textarea' onChange={handleChange} required></textarea>
                        </label>
                        <label for="category-profile">Portada: <input id="category-profile" type="file" accept="image/*" />
                        </label>
                    </fieldset>
                    <label for="set-category"><input className="set-checkbox" id="set-category" type="checkbox"/> Fijar esta categoría en la pantalla de Inicio</label>
                    <input className="category-submit" type="submit" value="Crear categoría"/>
                </form>
                <div className='navigation-buttons'>
                    <button onClick={() => { navigate("/categories"); }}>Atrás</button>
                    <button onClick={() => { navigate("/dashboard"); }}>Volver al Inicio</button>
                </div>
            </div>
        </body>
    );    
}

export default CreateCategory;