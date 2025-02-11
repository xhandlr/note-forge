import React, { useEffect, useState } from "react";
import ExerciseOption from "./ExerciseOption";
import { getExercises } from "../services/ExerciseService";
import "../styles/Exercises.css";

function Exercises() {
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        const fetchExercises = async () => {
            const data = await getExercises();
            setExercises(data);
        };
        fetchExercises();
    }, []);

    return (
        <div className="exercises-wrapper">
            {exercises.map(exercise => (
                <ExerciseOption key={exercise.id} title={exercise.title} />
            ))}
            <div className="option-buttons">
                <button>Crear</button>
                <button>Editar</button>
                <button>Ver</button>
                <button>Eliminar</button>
            </div>
        </div>
    );
}

export default Exercises;
