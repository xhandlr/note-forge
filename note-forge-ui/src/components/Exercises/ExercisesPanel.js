import React from "react";
import { useNavigate } from "react-router-dom";
import ExerciseOption from "../Exercises/ExerciseOption";
import "../../styles/Exercises/Exercises.css";

function ExercisesPanel({ exercises, onDelete }) {
    return (
        <div>
            <div className="exercises-panel">
                {exercises.map(exercise => (
                    <ExerciseOption 
                        key={exercise.id} 
                        id={exercise.id}
                        title={exercise.title} 
                        description={exercise.description} 
                        difficulty={exercise.difficulty} 
                        reference={exercise.reference} 
                        duration={exercise.duration} 
                        tags={exercise.tags} 
                        onDelete={onDelete} // Pass the delete handler
                    /> 
                ))}
            </div>
        </div>
    );
}

export default ExercisesPanel;
