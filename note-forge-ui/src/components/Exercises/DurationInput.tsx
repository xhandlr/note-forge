import React from "react";

function DurationInput({ value, onChange }) {
    return (
        <div className="duration-input-container">
            <label>Duración Estimada (en minutos)</label>
            <input
                className="duration-exercise"
                type="number"
                name="duration"
                value={value}
                onChange={onChange}
                min="1"
                step="1"
                required
                placeholder="Escribe los minutos"
            />
            <div className="duration-options">
                {[5, 10, 15, 20, 30, 60].map((time) => (
                    <button
                        key={time}
                        type="button"
                        className="duration-option"
                        onClick={() => onChange({ target: { name: "duration", value: time } })}
                    >
                        {time} min
                    </button>
                ))}
            </div>
        </div>
    );
}

export default DurationInput;
