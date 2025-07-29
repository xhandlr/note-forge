import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Dashboard/Navbar";
import UserPanel from "../../components/Dashboard/UserPanel";
import SearchBar from "../../components/Dashboard/SearchBar";
import ExercisesPanel from "../../components/Exercises/ExercisesPanel";
import { getExercises } from "../../services/ExerciseService"; 


/**
 * Main component for the exercises page.
 * Fetches exercises from the API and allows filtering by title or description.
 * Contains the UserPanel and the SearchBar component.
 */
function Exercises() {
    const navigate = useNavigate();
    
    // State for storing all exercises  
    const [exercises, setExercises] = useState([]);  

    // State for storing filtered exercises  
    const [filteredExercises, setFilteredExercises] = useState([]);  

    /**
     * useEffect for loading exercises in the component with the 'getExercises()' function which fetches data from the API.
     * Stores the state of the exercises and initializes the filtered exercises array.
     */
    useEffect(() => {
        const fetchExercises = async () => {
            const data = await getExercises();
            setExercises(data);
            setFilteredExercises(data);
        };
        fetchExercises();
    }, []);

    /**
     * Handles the search of filtered exercises by title or description.
     * @param {string} query - Search text input by the user.
     */
    const handleSearch = (query) => {
        if (query.trim() === "") {
            setFilteredExercises(exercises); 
        } else {
            setFilteredExercises(
                exercises.filter(exercise =>
                    exercise.title.toLowerCase().includes(query.toLowerCase()) ||
                    exercise.description.toLowerCase().includes(query.toLowerCase())
                )
            );
        }
    };

    /**
     * Deletes an exercise from the state.
     * @param {number} id - The ID of the exercise to be deleted.
     */
    const handleDeleteExercise = (id) => {
        // Update both exercises and filteredExercises
        setExercises(exercises.filter(exercise => exercise.id !== id));
        setFilteredExercises(filteredExercises.filter(exercise => exercise.id !== id));
    };

    return (
        <div>
            <Navbar />
            <div className="exercises-page">
                <div className="feature-wrapper">
                    <div className="exercises-wrapper">
                        <div className="exercises-title">
                            <h1>Mis ejercicios</h1>
                            <SearchBar onSearch={handleSearch} />
                        </div>
                        {/* Pass handleDeleteExercise as prop */}
                        <ExercisesPanel exercises={filteredExercises} onDelete={handleDeleteExercise} />
                        <div className="new-exercise" onClick={() => { navigate("/create-exercise"); }}>
                            <h1>Crear nuevo ejercicio</h1>
                        </div>  
                    </div>
                    <UserPanel />
                </div>
            </div>
        </div>
    );
}

export default Exercises;
