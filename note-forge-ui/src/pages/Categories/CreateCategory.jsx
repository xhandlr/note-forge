import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addCategory } from '../../services/CategoryService';
import '../../styles/Categories/CreateCategory.css';
import Navbar from '../../components/Dashboard/Navbar';

function CreateCategory() {

    const navigate = useNavigate();

    const [categoryData, setCategoryData] = useState({
        name: '',
        description: '',
        image: null,
        isPinned: false
    });

    const [errors, setErrors] = useState({}); 

    const handleChange = (e) => {
        if (e.target.name === "image") {
            console.log("Imagen seleccionada:", e.target.files[0]); 
            setCategoryData({ ...categoryData, image: e.target.files[0] });
        } else if (e.target.name === "isPinned") { 
            setCategoryData({ ...categoryData, isPinned: e.target.checked });
        } else {
            console.log(`Cambiando ${e.target.name}:`, e.target.value); 
            setCategoryData({ ...categoryData, [e.target.name]: e.target.value });
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append("name", categoryData.name);
        formData.append("description", categoryData.description);
        formData.append("image", categoryData.image);
        formData.append("isPinned", categoryData.isPinned ? "1" : "0");
    
        try {
            const response = await addCategory(formData);
            if (response.message) {
                alert(`Categoría ${categoryData.isPinned ? 'fijada y ' : ''}creada con éxito! ID: ${response.categoryId}`);
                navigate("/categories");
            }
        } catch (error) {
            setErrors(error);
            console.error('Error al crear categoría:', error);
        }
    };

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
                        <label for="category-profile">Portada: <input id="category-profile" name="image" type="file" accept="image/*" onChange={handleChange} />
                        </label>
                    </fieldset>
                    <label htmlFor="set-category">
                        <input 
                            id="set-category" 
                            name="isPinned"
                            type="checkbox" 
                            onChange={handleChange} 
                            checked={categoryData.isPinned}
                        />
                        Fijar esta categoría en la pantalla de Inicio
                    </label>
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