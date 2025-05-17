import React, { useState } from 'react';
import '../../styles/Dashboard/ImageUploader.css';

function ImageUploader({ onImageSelect }) {
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');

    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            // Validar tipo de archivo
            if (!file.type.startsWith('image/')) {
                setError('Por favor, selecciona un archivo de imagen válido.');
                return;
            }

            // Validar tamaño (Ej: Máximo 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setError('La imagen no debe superar los 5MB.');
                return;
            }

            setImage(URL.createObjectURL(file)); // Crear vista previa
            setError('');
            onImageSelect(file); // Pasar el archivo al componente padre
        }
    };

    const removeImage = () => {
        setImage(null);
        onImageSelect(null); // Informar al padre que la imagen se eliminó
    };

    return (
        <div className="image-uploader">
            <input type="file" accept="image/*" onChange={handleImageChange} />
            
            {error && <p className="error-message">{error}</p>}

            {image && (
                <div className="image-preview">
                    <p>Vista previa:</p>
                    <img src={image} alt="Imagen cargada" />
                    <button type="button" className="remove-button" onClick={removeImage}>
                        Eliminar
                    </button>
                </div>
            )}
        </div>
    );
}

export default ImageUploader;
