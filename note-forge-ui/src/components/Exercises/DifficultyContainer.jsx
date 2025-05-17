import React from "react";

function DifficultyContainer({ value, onChange }) {
    return (
        <div>
            <label>Dificultad</label>
            <div className="difficulty-container">
                {[1, 2, 3, 4, 5].map((num) => (
                    <label key={num} className="difficulty-option">
                        <input 
                            type="radio" 
                            name="difficulty" 
                            value={num} 
                            onChange={onChange} 
                            required
                            checked={value === num.toString()} // Comparar con el valor recibido de props
                        />
                        <span>{num}</span>
                    </label>
                ))}
            </div>
        </div>
    );
}

export default DifficultyContainer;
