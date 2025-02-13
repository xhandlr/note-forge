import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getExercises } from "../services/ExerciseService";
import ExerciseOption from "../components/ExerciseOption";
import SearchBar from "./SearchBar";
import "../styles/Exercises.css";

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

    return (
        <div className="exercises-wrapper">
            <div className="categories-title">
                <h1>Mis ejercicios</h1>
                <SearchBar />
            </div>
            {exercises.map(exercises => (
                <ExerciseOption key={exercises.id} title={exercises.title} description={exercises.description} difficulty={exercises.difficulty} reference={exercises.reference} duration={exercises.duration} /> 
            ))}
            <div className="new-exercise" onClick={() => { navigate("/create-exercise"); }}>
                <h1>Crear nuevo ejercicio</h1>
            </div>
        </div>   
    );
}

export default ExercisesPanel;