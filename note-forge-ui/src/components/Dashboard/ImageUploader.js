import React, { useState } from 'react';
import '../../styles/Dashboard/ImageUploader.css';

function ImageUploader() {
    const [image, setImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file)); // Crea una URL temporal para vista previa
        }
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            
            {image && (
                <div className="image-preview">
                    <p>Vista previa:</p>
                    <img src={image} alt="Imagen cargada" />
                </div>
            )}
        </div>
    );
}

export default ImageUploader;
