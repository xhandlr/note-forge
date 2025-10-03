import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteCategory } from "../../services/CategoryService";

function CategoryOption({ id, name, description, imageUrl, onDelete }) {
    const navigate = useNavigate(); // Usamos el hook de navegación

    // Manejo de la eliminación
    const handleDelete = async () => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar esta categoría?");
        if (confirmDelete) {
            try {
                await deleteCategory(id);
                if (onDelete) {
                    onDelete(id); // Notifica al componente padre para actualizar la lista
                }
            } catch (error) {
                console.error("Error al eliminar la categoría:", error);
            }
        }
    };

    // Manejo de la edición
    const handleEdit = () => {
        navigate(`/edit-category/${id}`); // Redirige a la página de edición de la categoría
    };

    return (
        <div className='category-option'>
            <img 
                src={imageUrl || ''} 
                alt={name} 
                className="category-image" 
                style={imageUrl ? {} : { backgroundColor: 'blue' }} 
            />
            <div className="category-text">
                <div className="category-inputs">
                    <h1>{name}</h1>
                    <h2>{description}</h2>
                </div>
                <div className="category-box-icon">
                    <box-icon 
                        name='edit-alt' 
                        type='solid' 
                        className="edit-alt"
                        onClick={handleEdit} // Llama a handleEdit al hacer clic
                        style={{ cursor: "pointer" }} 
                    ></box-icon>
                    <box-icon 
                        name='trash' 
                        type='solid' 
                        className="trash" 
                        onClick={handleDelete} // Llama a handleDelete al hacer clic
                        style={{ cursor: "pointer" }} 
                    ></box-icon> 
                </div>
            </div>
        </div>
    );
}

export default CategoryOption;
