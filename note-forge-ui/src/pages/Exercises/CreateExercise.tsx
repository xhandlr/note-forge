import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addExercise } from '../../services/ExerciseService';

import Navbar from '../../components/Dashboard/Navbar';
import DifficultyContainer from '../../components/Exercises/DifficultyContainer';
import ImageUploader from '../../components/Dashboard/ImageUploader';
import TagsInput from '../../components/Exercises/TagsInput';
import DurationInput from '../../components/Exercises/DurationInput';
import LatexEditor from '../../components/Exercises/LatexEditor';
import CategoryExercise from '../../components/Exercises/CategoryExercise';

function CreateExercise() {
    const [exerciseData, setExerciseData] = useState({
        title: '',
        description: '',
        difficulty: '',
        reference: '',
        answer: '',
        duration: '',
        tags: [],
        details: '', 
        image: null,
        categoryId: '',
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (e.target.name === "image") {
            console.log("Imagen seleccionada:", e.target.files[0]);
            setExerciseData({ ...exerciseData, image: e.target.files[0] });
        } else {
            console.log(`Cambiando ${name}:`, value);
            setExerciseData((prevState) => ({
                ...prevState,
                [name]: value,  // Maneja cualquier campo (incluyendo "collection")
            }));
        }
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append("title", exerciseData.title);
        formData.append("description", exerciseData.description);
        formData.append("difficulty", exerciseData.difficulty);
        formData.append("reference", exerciseData.reference);
        formData.append("answer", exerciseData.answer);
        formData.append("duration", exerciseData.duration);
        formData.append("tags", JSON.stringify(exerciseData.tags)); // Convertir array a string
        formData.append("details", exerciseData.details);
        formData.append("categoryId", exerciseData.categoryId);
    
        if (exerciseData.image) {
            formData.append("image", exerciseData.image); // Añadir imagen
        }
    
        try {
            const response = await addExercise(formData);
            if (response.message) {
                alert(`Ejercicio almacenado con éxito! ID: ${response.exerciseId}`);
            } else {
                alert("Error al almacenar ejercicio");
            }
        } catch (error) {
            setErrors(error);
            console.log('Error en el registro', error);
        }
    };
    
    return (
        <div className="create-exercise-body">
            <Navbar />
                <form className='create-exercise-form' onSubmit={handleSubmit}>
                        <h1>Nuevo ejercicio</h1>
                            <fieldset>
                                <label>Título del ejercicio </label>
                                <input className='title-exercise' type='text' name='title' onChange={handleChange} required />
                                {errors.title && <p className="error">{errors.title}</p>}
                                <DifficultyContainer value={exerciseData.difficulty} onChange={handleChange} />
                                <CategoryExercise value={exerciseData.categoryId} onChange={handleChange} /> 
                                <label>Descripción:</label>
                                <LatexEditor 
                                    value={exerciseData.description} 
                                    onChange={(e) => handleChange(e)} 
                                    name="description" 
                                    required 
                                />
                                <ImageUploader onImageSelect={(file) => setExerciseData({ ...exerciseData, image: file })} />
                            </fieldset>
                        
                            <fieldset>
                                <legend>Información opcional</legend>
                                <label>Referencia (Libro/Link)</label>
                                <textarea className='reference-exercise' type='text' name='reference' onChange={handleChange} />
                                {errors.reference && <p className='error'>{errors.reference}</p>}
                                <label>Respuesta:</label>
                                <LatexEditor 
                                    value={exerciseData.answer} 
                                    onChange={(e) => handleChange(e)} 
                                    name="answer" 
                                    required 
                                />
                                <DurationInput value={exerciseData.duration} onChange={handleChange} />
                                <TagsInput 
                                    value={exerciseData.tags} 
                                    onChange={(tags) => setExerciseData({ ...exerciseData, tags })} 
                                />
                                <label>Detalles</label>
                                <textarea className='details' type='text' name='details' onChange={handleChange} />
                                {errors.details && <p className='error'>{errors.details}</p>}
                            </fieldset>
                        <button className="save-button" type="submit">Guardar</button>
                </form>

                <div className='navigation-buttons'>
                    <button onClick={() => navigate("/exercises")}>Atrás</button>
                    <button onClick={() => navigate("/dashboard")}>Volver al Inicio</button>
                </div>
            </div>
    );
}

export default CreateExercise;