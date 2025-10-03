import React, { useState, useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { addCategory } from '../../services/CategoryService';
import Navbar from '../../components/UI/Navbar';

// Componentes memoizados para mejor rendimiento
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

function CreateCategory() {
  const navigate = useNavigate();
  const [categoryData, setCategoryData] = useState({
    name: '',
    description: '',
    image: null,
    isPinned: false
  });
  const [errors, setErrors] = useState({});

  // Manejador de cambios optimizado con useCallback
  const handleChange = useCallback((e) => {
    const { name, type, value, files, checked } = e.target;
    
    if (type === 'file') {
      setCategoryData(prev => ({ ...prev, image: files[0] }));
    } else if (type === 'checkbox') {
      setCategoryData(prev => ({ ...prev, isPinned: checked }));
    } else {
      setCategoryData(prev => ({ ...prev, [name]: value }));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', categoryData.name);
    formData.append('description', categoryData.description);
    if (categoryData.image) formData.append('image', categoryData.image);
    formData.append('isPinned', categoryData.isPinned ? '1' : '0');

    try {
      const response = await addCategory(formData);
      if (response.message) {
        alert(`Categoría ${categoryData.isPinned ? 'fijada y ' : ''}creada con éxito! ID: ${response.categoryId}`);
        navigate('/categories');
      }
    } catch (error) {
      setErrors(error);
      console.error('Error al crear categoría:', error);
    }
  };

  return (
    <div className='create-category-body'>
      <div className="create-category">
        <Navbar />
        <form onSubmit={handleSubmit} className="category-form">
          <h1>Nueva categoría</h1>
          <fieldset className="new-category-data">
            <legend>Crear una nueva categoría</legend>
            <label htmlFor="category-name">
              Nombre:
              <MemoInput
                id="category-name"
                name="name"
                type="text"
                maxLength={120}
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
                rows={3}
                maxLength={255}
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
            Crear categoría
          </button>
        </form>

        <div className='navigation-buttons'>
          <button type="button" onClick={() => navigate('/categories')}>
            Atrás
          </button>
          <button type="button" onClick={() => navigate('/dashboard')}>
            Volver al Inicio
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateCategory;