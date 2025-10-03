import React, { useState, useEffect, useCallback, memo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updateCategory, getCategoryById } from '../../services/CategoryService';
import Navbar from '../../components/Dashboard/Navbar';

// Componentes memoizados
const MemoInput = memo(({ id, name, type, value, onChange, ...props }) => (
  <input
    id={id}
    name={name}
    type={type}
    value={value}
    onChange={onChange}
    {...props}
  />
));

const MemoTextarea = memo(({ id, name, value, onChange, ...props }) => (
  <textarea
    id={id}
    name={name}
    value={value}
    onChange={onChange}
    {...props}
  />
));

function EditCategory() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [categoryData, setCategoryData] = useState({
    name: '',
    description: '',
    image: null,
    imageUrl: '',
    isPinned: false
  });
  const [errors, setErrors] = useState({});

  // Función para cargar la categoría
  const fetchCategory = useCallback(async () => {
    try {
      const response = await getCategoryById(id);
      setCategoryData({
        name: response.name || '',
        description: response.description || '',
        image: null,
        imageUrl: response.imageUrl || '',
        isPinned: response.is_pinned || false
      });
    } catch (error) {
      console.error('Error al obtener la categoría', error);
    }
  }, [id]);

  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  // Manejador de cambios optimizado
  const handleChange = useCallback((e) => {
    const { name, type, files, checked, value } = e.target;
    
    setCategoryData(prev => {
      if (type === 'file') {
        return { 
          ...prev, 
          image: files[0],
          imageUrl: '' 
        };
      }
      if (name === 'isPinned') {
        return { ...prev, isPinned: checked };
      }
      return { ...prev, [name]: value };
    });
  }, []);

  // Manejador de envío del formulario
  const handleSubmit = useCallback(async (e) => {
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
      console.error('Error', error);
    }
  }, [categoryData, id, navigate]);

  return (
    <div className='create-category-body'>
      <div className="create-category">
        <Navbar />
        <form onSubmit={handleSubmit} className="category-form">
          <h1>Editar categoría</h1>
          <fieldset className="new-category-data">
            <legend>Editar una categoría existente</legend>
            
            <label htmlFor="category-name">
              Nombre:
              <MemoInput
                id="category-name"
                name="name"
                type="text"
                maxLength="120"
                value={categoryData.name}
                onChange={handleChange}
                required
              />
            </label>
            
            <label htmlFor="category-description">
              Descripción:
              <MemoTextarea
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
            
            <label htmlFor="category-profile">
              Portada:
              <MemoInput
                id="category-profile"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleChange}
              />
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
          
          <div className="checkbox-container">
            <MemoInput
              id="set-category"
              name="isPinned"
              type="checkbox"
              checked={categoryData.isPinned}
              onChange={handleChange}
            />
            <label htmlFor="set-category">
              Fijar esta categoría en la pantalla de Inicio
            </label>
          </div>
          
          <button type="submit" className="category-submit">
            Actualizar categoría
          </button>
        </form>
        
        <div className='navigation-buttons'>
          <button type="button" onClick={() => navigate("/categories")}>
            Atrás
          </button>
          <button type="button" onClick={() => navigate("/dashboard")}>
            Volver al Inicio
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditCategory;