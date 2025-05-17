import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updateCategory, getCategoryById } from '../../services/CategoryService';
import '../../styles/Categories/CreateCategory.css';
import Navbar from '../../components/Dashboard/Navbar';

function EditCategory() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [categoryData, setCategoryData] = useState({
        name: '',
        description: '',
        image: null,
        imageUrl: '', // Nuevo estado para la URL de la imagen actual
        isPinned: false
    });
    const [errors, setErrors] = useState({}); 

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await getCategoryById(id);
                setCategoryData({
                    name: response.name || '',
                    description: response.description || '',
                    image: null, // Mantenemos null para la nueva imagen
                    imageUrl: response.imageUrl || '', // Guardamos la URL de la imagen actual
                    isPinned: response.is_pinned || false // Asegúrate de que el backend envía este campo
                });
            } catch (error) {
                console.error('Error al obtener la categoría', error);
            }
        };
    
        fetchCategory();
    }, [id]);

    const handleChange = (e) => {
        if (e.target.name === "image") {
            setCategoryData({ 
                ...categoryData, 
                image: e.target.files[0],
                imageUrl: '' // Limpiamos la URL si se selecciona nueva imagen
            });
        } else if (e.target.name === "isPinned") { 
            setCategoryData({ ...categoryData, isPinned: e.target.checked });
        } else {
            setCategoryData({ ...categoryData, [e.target.name]: e.target.value });
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!categoryData.name) {
            alert("El nombre de la categoría es obligatorio");
            return;
        }
    
        const formData = new FormData();
        formData.append("name", categoryData.name);
        formData.append("description", categoryData.description);
        if (categoryData.image) {
            formData.append("image", categoryData.image);
        }
        formData.append("isPinned", categoryData.isPinned ? "1" : "0");
        
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
                                value={categoryData.name}
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
                                value={categoryData.description}
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
                            {/* Mostrar la imagen actual si existe y no se ha seleccionado una nueva */}
                            {categoryData.imageUrl && !categoryData.image && (
                                <div className="current-image-preview">
                                    <p>Imagen actual:</p>
                                    <img 
                                        src={categoryData.imageUrl} 
                                        alt="Current category" 
                                        className="current-image"
                                    />
                                </div>
                            )}
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