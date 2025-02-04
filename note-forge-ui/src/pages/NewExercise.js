import React, { useActionState, useState } from 'react';
import '../styles/NewExercise.css'; 
import { useNavigate } from 'react-router-dom';
import { createExercise } from '../services/ExerciseService';

function NewExercise() {

    const [exerciseData, setExerciseData] = useState({
        title: '',
        description: '',
        difficult: '',
        collection: '',
        reference: '',
        answer: '',
        duration: '',
        tags: '',
        details: ''
    });

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const handleChange = (e) => {
        setExerciseData({
            ...exerciseData, 
            [e.target.name]: e.target.value
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createExercise(exerciseData);
            if (response.message) {
                alert(`Ejercicio almacenado con éxito! ID: ${response.exerciseId}`); // Muestra el ID del ejercicio si la respuesta es exitosa
            } else {
                alert("Error al almacenar ejercicio");
            }
        } catch (error) {
            setErrors(error);
            console.log('Error en el registro', error);
        }
    }    

    return (
        <div className="background-container">
        <div className='create-page'>
            <form className='create-exercise-form' onSubmit={handleSubmit}>
                <label>Título del ejercicio</label>
                <textarea className='title-exercise' type='text' name='title' required />

                <label>Descripción</label>
                <textarea className='description-exercise' name='description' required />

                <label>Dificultad</label>
                <textarea className='difficult-exercise' type='text' name='difficulty' required />

                <label>Colección</label>
                <textarea className='collection-exercise' type='text' name='collection' required />

                {/* Campos opcionales */}
                <label>Referencia (Libro/Link)</label>
                <textarea className='reference-exercise' type='text' name='reference' />

                <label>Respuesta</label>
                <textarea className='answer-exercise' type='text' name='answer' />

                <label>Duración Estimada</label>
                <textarea className='duration-exercise' type='text' name='duration' />

                <label>Etiquetas</label>
                <textarea className='tags-exercise' type='text' name='tags' />

                <label>Detalles</label>
                <textarea className='details' type='text' name='details' />

                <button className="save-button" type="submit">Guardar</button>
            </form>
        </div>
        </div>
    );
}

export default NewExercise;
