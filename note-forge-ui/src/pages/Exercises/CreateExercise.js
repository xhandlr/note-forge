import React, { useActionState, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addExercise } from '../../services/ExerciseService';
import Navbar from '../../components/Dashboard/Navbar';
import '../../styles/Exercises/CreateExercise.css'; 

function CreateExercise() {

    const [exerciseData, setExerciseData] = useState({
        title: '',
        description: '',
        difficulty: '',
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
            const response = await addExercise(exerciseData);
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
        <body className="create-exercise-body">
            <div className='create-exercise'>
                <Navbar />
                <form className='create-exercise-form' onSubmit={handleSubmit}>
                    <h1>Nuevo ejercicio</h1>
                        <fieldset>
                            <legend>Crear un  nuevo ejercicio</legend>
                            <label>Título del ejercicio: <textarea className='title-exercise' type='text' name='title' onChange={handleChange} required /></label>
                            {errors.title && <p className="error">{errors.title}</p>}

                            <label>Descripción</label>
                            <textarea className='description-exercise' name='description' rows="5" cols="50" onChange={handleChange} required />
                            {errors.description && <p className='error'>{errors.description}</p>}

                            <label>Dificultad</label>
                            <textarea className='difficulty-exercise' type='text' name='difficulty' onChange={handleChange} required />
                            {errors.difficulty && <p className='error'>{errors.dificulty}</p>}

                            <label>Categoría</label>
                            <textarea className='category-exercise' type='text' name='category' onChange={handleChange} required />
                            {errors.category && <p className='error'>{errors.category}</p>}
                        </fieldset>
                    
                        <fieldset>
                            <legend>Información adicional</legend>
                            <label>Referencia (Libro/Link)</label>
                            <textarea className='reference-exercise' type='text' name='reference' onChange={handleChange} />
                            {errors.reference && <p className='error'>{errors.reference}</p>}

                            <label>Respuesta</label>
                            <textarea className='answer-exercise' type='text' name='answer' onChange={handleChange} />
                            {errors.answer && <p className='error'>{errors.answer}</p>}

                            <label>Duración Estimada</label>
                            <textarea className='duration-exercise' type='text' name='duration' onChange={handleChange} />
                            {errors.duration && <p className='error'>{errors.duration}</p>}

                            <label>Etiquetas</label>
                            <textarea className='tags-exercise' type='text' name='tags' onChange={handleChange} />
                            {errors.tags && <p className='error'>{errors.tags}</p>}

                            <label>Detalles</label>
                            <textarea className='details' type='text' name='details' onChange={handleChange} />
                            {errors.details && <p className='error'>{errors.details}</p>}
                        </fieldset>
                    <button className="save-button" type="submit">Guardar</button>
                </form>
                <div className='navigation-buttons'>
                        <button onClick={() => { navigate("/exercises"); }}>Atrás</button>
                        <button onClick={() => { navigate("/dashboard"); }}>Volver al Inicio</button>
                </div>
            </div>
        </body>
    );
}

export default CreateExercise;
