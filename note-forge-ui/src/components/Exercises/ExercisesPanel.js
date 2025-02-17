import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getExercises } from "../../services/ExerciseService";
import ExerciseOption from "../Exercises/ExerciseOption";
import SearchBar from "../Dashboard/SearchBar";
import "../../styles/Exercises/Exercises.css";

function ExercisesPanel() {
    const navigate = useNavigate();
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        const fetchExercises = async () => {
            const data = await getExercises();
            setExercises(data);
        };
        fetchExercises();
    }, []);

    const handleDeleteExercise = (id) => {
        setExercises(exercises.filter(exercise => exercise.id != id));
    }

    return (
        <div className="exercises-wrapper">
            <div className="exercises-title">
                <h1>Mis ejercicios</h1>
                <SearchBar />
            </div>
            <div className="exercises-panel">
            {exercises.map(exercises => (
                <ExerciseOption 
                    key={exercises.id} 
                    id={exercises.id}
                    title={exercises.title} 
                    description={exercises.description} 
                    difficulty={exercises.difficulty} 
                    reference={exercises.reference} 
                    duration={exercises.duration} 
                    tags={exercises.tags} 
                    onDelete={handleDeleteExercise}
                /> 
            ))}
            </div>
            <div className="new-exercise" onClick={() => { navigate("/create-exercise"); }}>
                <h1>Crear nuevo ejercicio</h1>
            </div>
        </div>   
    );
}

export default ExercisesPanel;