import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updateExercise, getExerciseById } from '../../services/ExerciseService';
import Navbar from '../../components/UI/Navbar';

function EditExercise() {
    const navigate = useNavigate();
    const { id } = useParams(); 

    const [exerciseData, setExerciseData] = useState({
        title: '',
        description: '',
        difficulty: '',
        reference: '',
        answer: '',
        duration: '',
        tags: '',
        details: ''
    });

    const [errors, setErrors] = useState({}); 

    useEffect(() => {
        const fetchExercise = async () => {
            try {
                const response = await getExerciseById(id);
                console.log("Ejercicio obtenido:", response);

                if (!response) {
                    console.error("Error: La API no devolvió datos.");
                    return;
                }

                setExerciseData({
                    title: response.title || '',
                    description: response.description || '',
                    difficulty: response.difficulty || '',
                    reference: response.reference || '',
                    answer: response.answer || '',
                    duration: response.duration || '',
                    tags: response.tags || '',
                    details: response.details || ''
                });
            } catch (error) {
                console.error('Error al obtener el ejercicio:', error);
            }
        };

        fetchExercise();
    }, [id]);

    const handleChange = (e) => {
        setExerciseData({
            ...exerciseData, 
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
            const response = await updateExercise(id, exerciseData); 
            if (response === true) { 
                alert(`Ejercicio actualizado con éxito!`);
                navigate("/exercises");
            } else {
                alert("Error al actualizar ejercicio");
            }
        } catch (error) {
            setErrors(error);
            console.log('Error', error);
        }
    };

    return (
        <div className="create-exercise-body">
            <div className='create-exercise'>
                <Navbar />
                <form className='create-exercise-form' onSubmit={handleSubmit}>
                    <h1>Editar ejercicio</h1>
                    <fieldset>
                        <legend>Modificar ejercicio</legend>

                        <label>
                            Título del ejercicio:
                            <textarea 
                                className='title-exercise' 
                                name='title' 
                                value={exerciseData.title} 
                                onChange={handleChange} 
                                required 
                            />
                        </label>
                        {errors.title && <p className="error">{errors.title}</p>}

                        <label>Descripción</label>
                        <textarea 
                            className='description-exercise' 
                            name='description' 
                            rows="5" 
                            cols="50" 
                            value={exerciseData.description} 
                            onChange={handleChange} 
                            required 
                        />
                        {errors.description && <p className='error'>{errors.description}</p>}

                        <label>Dificultad</label>
                        <textarea 
                            className='difficulty-exercise' 
                            name='difficulty' 
                            value={exerciseData.difficulty} 
                            onChange={handleChange} 
                            required 
                        />
                        {errors.difficulty && <p className='error'>{errors.difficulty}</p>}

                        <label>Referencia (Libro/Link)</label>
                        <textarea 
                            className='reference-exercise' 
                            name='reference' 
                            value={exerciseData.reference} 
                            onChange={handleChange} 
                        />
                        {errors.reference && <p className='error'>{errors.reference}</p>}

                        <label>Respuesta</label>
                        <textarea 
                            className='answer-exercise' 
                            name='answer' 
                            value={exerciseData.answer} 
                            onChange={handleChange} 
                        />
                        {errors.answer && <p className='error'>{errors.answer}</p>}

                        <label>Duración Estimada</label>
                        <textarea 
                            className='duration-exercise' 
                            name='duration' 
                            value={exerciseData.duration} 
                            onChange={handleChange} 
                        />
                        {errors.duration && <p className='error'>{errors.duration}</p>}

                        <label>Etiquetas</label>
                        <textarea 
                            className='tags-exercise' 
                            name='tags' 
                            value={exerciseData.tags} 
                            onChange={handleChange} 
                        />
                        {errors.tags && <p className='error'>{errors.tags}</p>}

                        <label>Detalles</label>
                        <textarea 
                            className='details-exercise' 
                            name='details' 
                            value={exerciseData.details} 
                            onChange={handleChange} 
                        />
                        {errors.details && <p className='error'>{errors.details}</p>}
                    </fieldset>
                    
                    <button className="save-button" type="submit">Guardar</button>
                </form>
                
                <div className='navigation-buttons'>
                    <button onClick={() => { navigate("/exercises"); }}>Atrás</button>
                    <button onClick={() => { navigate("/dashboard"); }}>Volver al Inicio</button>
                </div>
            </div>
        </div>
    );
}

export default EditExercise;
