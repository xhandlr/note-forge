import React, { useState, useEffect } from "react";
import Navbar from '../../components/UI/Navbar';
import SearchBar from "../../components/Dashboard/SearchBar";
import { getExercises } from "../../services/ExerciseService";
import ExerciseOption from "../../components/Exercises/ExerciseOption";

function CreateGuide() {
    const [exercises, setExercises] = useState([]);
    const [filteredExercises, setFilteredExercises] = useState([]);
    const [guideExercises, setGuideExercises] = useState([]); // Ejercicios en la guía
    const [guideTitle, setGuideTitle] = useState(""); // Título de la guía
    const [guideAuthor, setGuideAuthor] = useState(""); // Autor de la guía
    const [guideDescription, setGuideDescription] = useState(""); // Texto en el textarea

    useEffect(() => {
        const fetchData = async () => {
            const exercisesData = await getExercises();
            setExercises(exercisesData);
            setFilteredExercises(exercisesData);
        };
        fetchData();
    }, []);

    const updateGuideDescription = (newGuideExercises) => {
        const latexContent = `
\\title{${guideTitle || "Título de la guía"}}
\\author{${guideAuthor || "Autor"}}

${newGuideExercises
    .map(exercise => 
        `\\subsection*{${exercise.title}}\n${exercise.description}`
        + (exercise.answer && exercise.answer.trim() !== "" ? `\n\n\\subsection*{Respuesta}\n${exercise.answer}` : "")
    )
    .join("\n\n")}`;

        setGuideDescription(latexContent);
    };

    useEffect(() => {
        updateGuideDescription(guideExercises);
    }, [guideTitle, guideAuthor, guideExercises]);

    const handleDeleteExercise = (id) => {
        const updatedExercises = exercises.filter(exercise => exercise.id !== id);
        const updatedFilteredExercises = filteredExercises.filter(exercise => exercise.id !== id);
        setExercises(updatedExercises);
        setFilteredExercises(updatedFilteredExercises);
    };

    const handleDragStart = (e, id) => {
        e.dataTransfer.setData("exerciseId", id);
    };

    const handleDrop = (e, targetIndex) => {
        e.preventDefault();
        const exerciseId = parseInt(e.dataTransfer.getData("exerciseId"), 10);
        if (!exerciseId) return;

        const exerciseFromExercises = exercises.find(ex => ex.id === exerciseId);
        const exerciseFromGuide = guideExercises.find(ex => ex.id === exerciseId);

        if (!exerciseFromExercises && !exerciseFromGuide) {
            console.error("Ejercicio no encontrado:", exerciseId);
            return;
        }

        let newGuideExercises = [...guideExercises];

        // Si el ejercicio no está en la guía, lo agregamos
        if (exerciseFromExercises && !guideExercises.some(ex => ex.id === exerciseId)) {
            newGuideExercises.push(exerciseFromExercises);
        } 
        // Si el ejercicio ya está en la guía y lo estamos moviendo
        else if (exerciseFromGuide) {
            const draggedIndex = newGuideExercises.findIndex(ex => ex.id === exerciseId);
            if (draggedIndex !== -1 && targetIndex !== draggedIndex) {
                const [movedExercise] = newGuideExercises.splice(draggedIndex, 1);
                newGuideExercises.splice(targetIndex, 0, movedExercise);
            }
        }

        setGuideExercises(newGuideExercises);
    };

    const handleSearch = (query) => {
        if (!query.trim()) {
            setFilteredExercises(exercises);
        } else {
            const filtered = exercises.filter(exercise => 
                exercise.title.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredExercises(filtered);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault(); // Necesario para permitir el "drop"
    };

    return (
        <div className="create-guides-page">
            <Navbar />
            <div className="lateral-panel">
                <label htmlFor="title">
                    Título: <input type="text" id="title" name="guide" value={guideTitle} onChange={(e) => setGuideTitle(e.target.value)} />
                </label>
                <label htmlFor="author">
                    Autor: <input type="text" id="author" name="guide" value={guideAuthor} onChange={(e) => setGuideAuthor(e.target.value)} />
                </label>
                <p>Ejercicios</p>
                <SearchBar onSearch={handleSearch} />
                <div className="mini-panel">
                    {filteredExercises.map((exercise) => (
                        <ExerciseOption
                            key={exercise.id}
                            id={exercise.id}
                            title={exercise.title}
                            description={exercise.description}
                            className="custom-exercise-option"
                            onDelete={handleDeleteExercise}
                            draggable
                            onDragStart={(e) => handleDragStart(e, exercise.id)}
                        />
                    ))}
                </div>
            </div>
            <div>
                <h2>Ejercicios seleccionados</h2>
                <div
                    className="guide-creation"
                    onDrop={(e) => handleDrop(e, -1)} // No especificamos un índice aquí, se usará en los elementos individuales
                    onDragOver={handleDragOver}
                >
                    {guideExercises.map((exercise, index) => (
                        <div 
                            key={exercise.id} 
                            className="exercise-item"
                            draggable
                            onDragStart={(e) => handleDragStart(e, exercise.id)}
                            onDrop={(e) => handleDrop(e, index)} // Cambiaremos la posición de los ejercicios aquí
                            onDragOver={handleDragOver}
                        >
                            <div className="item-position">{index + 1}</div> {/* Muestra el orden dinámico */}
                            <div>
                                <h3>{exercise.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="right-panel">
                <label htmlFor="guide-description">Descripción</label>
                <textarea value={guideDescription} readOnly />
                <p>Imágenes</p>
                <div className="guide-images">
                    {guideExercises
                        .filter(exercise => exercise.imageUrl && exercise.imageUrl.trim() !== "")
                        .map((exercise) => (
                            <div key={exercise.id} className="image-container">
                                <img src={exercise.imageUrl} alt={`Ejercicio ${exercise.title}`} className="guide-image" />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default CreateGuide;
