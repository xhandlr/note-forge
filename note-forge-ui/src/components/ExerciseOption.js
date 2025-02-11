import React from "react";
import "../styles/Exercises.css";

function ExerciseOption({ title }) {
    return (
        <div className='exercise-option'>
            <h1>{title}</h1>
        </div>
    );
}

export default ExerciseOption;