import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updateCategory, getCategoryById } from '../../services/CategoryService';
import '../../styles/Categories/CreateCategory.css';
import Navbar from '../../components/Dashboard/Navbar';

function EditCategory() {
    const navigate = useNavigate();
    const { id } = useParams(); // Obtener el ID de la URL
    const [categoryData, setCategoryData] = useState({
        name: '',
        description: '',
        image: null
    });
    const [errors, setErrors] = useState({}); 

    // Al montar el componente, obtener la categoría por ID
    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await getCategoryById(id);
                setCategoryData({
                    name: response.name || '',
                    description: response.description || '',
                    image: response.imageUrl || null
                });
            } catch (error) {
                console.error('Error al obtener la categoría', error);
            }
        };
    
        fetchCategory();
    }, [id]);

    const handleChange = (e) => {
        if (e.target.name === "image") {
            console.log("Imagen seleccionada:", e.target.files[0]); 
            setCategoryData({ ...categoryData, image: e.target.files[0] });
        } else {
            console.log(`Cambiando ${e.target.name}:`, e.target.value); 
            setCategoryData({ ...categoryData, [e.target.name]: e.target.value });
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!categoryData.name) {
            alert("El nombre de la categoría es obligatorio");
            return; // No enviar la solicitud si el campo 'name' está vacío
        }
    
        const formData = new FormData();
        formData.append("name", categoryData.name);
        formData.append("description", categoryData.description);
        formData.append("image", categoryData.image);
        
        try {
            const response = await updateCategory(id, formData); 
            if (response === true) { 
                alert(`Categoría actualizada con éxito!`);
                navigate("/categories");
            } else {
                alert("Error al actualizar categoría");
            }
        } catch (error) {
            setErrors(error);
            console.log('Error', error);
        }
    };
    

    return (
        <body className='create-category-body'>
            <div className="create-category">
                <Navbar />
                <form onSubmit={handleSubmit} className="category-form">
                    <h1>Editar categoría</h1>
                    <fieldset className="new-category-data">
                        <legend>Editar una categoría existente</legend>
                        <label htmlFor="category-name">Nombre: 
                            <input 
                                id="category-name" 
                                name="name" 
                                type="text" 
                                maxLength="120" 
                                value={categoryData.name} // Asignar valor desde el estado
                                onChange={handleChange} 
                                required 
                            />
                        </label>
                        <label htmlFor="category-description">Descripción: 
                            <textarea 
                                id="category-description" 
                                name="description" 
                                rows="3" 
                                cols="50" 
                                maxLength="255" 
                                className='category-textarea' 
                                value={categoryData.description} // Asignar valor desde el estado
                                onChange={handleChange} 
                                required 
                            />
                        </label>
                        <label htmlFor="category-profile">Portada: 
                            <input 
                                id="category-profile" 
                                name="image" 
                                type="file" 
                                accept="image/*" 
                                onChange={handleChange} 
                            />
                        </label>
                    </fieldset>
                    <label htmlFor="set-category">
                        <input className="set-checkbox" id="set-category" type="checkbox" /> Fijar esta categoría en la pantalla de Inicio
                    </label>
                    <input className="category-submit" type="submit" value="Actualizar categoría" />
                </form>
                <div className='navigation-buttons'>
                    <button onClick={() => { navigate("/categories"); }}>Atrás</button>
                    <button onClick={() => { navigate("/dashboard"); }}>Volver al Inicio</button>
                </div>
            </div>
        </body>
    );
}

export default EditCategory;
