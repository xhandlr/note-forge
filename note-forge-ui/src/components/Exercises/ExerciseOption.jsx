import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Exercises/Exercises.css";
import { deleteExercise } from "../../services/ExerciseService";

function ExerciseOption({ id, title, description, difficulty, reference, duration, tags, className, imageUrl, onDelete }) {
    const navigate = useNavigate();

    const maxLength = 50;
    const truncatedDescription = description?.length > maxLength 
        ? description.slice(0, maxLength) + "..."
        : description;

    const handleDelete = async () => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este ejercicio?");
        if (confirmDelete) {
            try {
                await deleteExercise(id);
                if (onDelete) {
                    onDelete(id);
                }
            } catch (error) {
                console.error("Error al eliminar el ejercicio:", error);
            }
        }
    };

    const handleEdit = () => {
        navigate(`/edit-exercise/${id}`);
    };

    const isCustomExercise = className && className.includes("custom"); // Verifica si la clase incluye "custom"

    return (
        <div 
            className={`exercise-option ${className || ""}`} 
            draggable={className && className.includes("custom")}
            onDragStart={(e) => e.dataTransfer.setData("exerciseId", id.toString())} // Asegurar que se pasa como string
        >

            <h1>{title}</h1>

            {difficulty && (
                <div className="difficulty">
                    <p>Dificultad:</p> 
                    <div className="difficulty-box">{difficulty}</div>
                </div>
            )}

            {duration && (
                <div className="duration">
                    <box-icon type='solid' name='watch'></box-icon>
                    <p>{duration}</p>
                </div>
            )}

            {truncatedDescription && <p>{truncatedDescription}</p>}

            <div className="exercise-box-icon">
                {tags && <p>{tags}</p>}
                <div>
                    <box-icon 
                        name='edit-alt' 
                        type='solid' 
                        className="edit-alt"
                        onClick={handleEdit}
                        style={{ cursor: "pointer" }} 
                    ></box-icon>
                    <box-icon 
                        name='trash' 
                        type='solid' 
                        className="trash"
                        onClick={handleDelete}
                        style={{ cursor: "pointer" }} 
                    ></box-icon> 
                </div>
            </div>
        </div>
    );
}

export default ExerciseOption;
