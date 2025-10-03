import React from 'react';

function TagsInput({ value = [], onChange }) {
    
    const handleKeyDown = (event) => {
        if (event.key === " " || event.key === "Enter") { 
            event.preventDefault();
            const newTag = event.target.value.trim();
            
            if (newTag && !value.includes(newTag)) {
                onChange([...value, newTag]); // Actualiza el estado en el padre
            }

            event.target.value = ""; // Limpia el input después de agregar la etiqueta
        }
    };

    const removeTag = (index) => {
        onChange(value.filter((_, i) => i !== index)); // Actualiza el padre eliminando el tag
    };

    return (
        <div className="tags-input-container">
            <label>Etiquetas</label>
            <div className="tags-wrapper">
                {value.map((tag, index) => (
                    <div key={index} className="tag">
                        #{tag}
                        <button className="remove-tag" onClick={() => removeTag(index)}>x</button>
                    </div>
                ))}
                <input 
                    type="text" 
                    placeholder="Escribe y presiona espacio o enter" 
                    onKeyDown={handleKeyDown} 
                />
            </div>
        </div>
    );
}

export default TagsInput;
