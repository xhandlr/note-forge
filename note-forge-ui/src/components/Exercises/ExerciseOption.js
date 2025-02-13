import React from "react";
import "../../styles/Exercises/Exercises.css";

function ExerciseOption({ title, description, difficulty, reference, duration }) {
    return (
        <div className='exercise-option'>
            <h1>{title} - Dificultad: {difficulty} - Duración estimada: {duration} - Referencia: {reference}
            </h1>
            <h2>{description}</h2>
        </div>
    );
}

export default ExerciseOption;