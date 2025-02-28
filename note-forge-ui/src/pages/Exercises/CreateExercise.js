import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addExercise } from '../../services/ExerciseService';
import { getCategories } from '../../services/CategoryService';
import Navbar from '../../components/Dashboard/Navbar';
import ImageUploader from '../../components/Dashboard/ImageUploader';
import '../../styles/Exercises/CreateExercise.css';
import katex from 'katex';
import 'katex/dist/katex.min.css'; // Importa el CSS de KaTeX

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
    const [categories, setCategories] = useState([]);
    const [latexPreview, setLatexPreview] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
            const fetchCategories = async () => {
                const data = await getCategories();
                setCategories(data);
            };
            fetchCategories();
        }, []);

    const handleChange = (e) => {
        setExerciseData({
            ...exerciseData,
            [e.target.name]: e.target.value
        });

        if (e.target.name === 'description') {
            const content = e.target.value;

            // Expresión regular para detectar bloques LaTeX
            const latexRegex = /(\\(?:\(|\[|\$\$?)[\s\S]*?\\(?:\)|\]|\$\$?))/g;

            // Dividir el contenido en segmentos de texto y LaTeX
            const segments = content.split(latexRegex);

            let processedContent = '';
            segments.forEach(segment => {
                if (!segment) return;

                // Verificar si el segmento es LaTeX
                if (latexRegex.test(segment)) {
                    try {
                        // Renderizar el segmento LaTeX
                        const latexContent = segment
                            .replace(/^\\(\(|\[|\$\$?)/, '') // Eliminar delimitadores iniciales
                            .replace(/\\(\)|\]|\$\$?)$/, ''); // Eliminar delimitadores finales

                        const displayMode = segment.startsWith('\\[') || segment.startsWith('$$');
                        processedContent += katex.renderToString(latexContent, {
                            displayMode: displayMode,
                            throwOnError: false
                        });
                    } catch (error) {
                        processedContent += `<span style="color: red;">Error en LaTeX: ${segment}</span>`;
                    }
                } else {
                    // Mantener el texto plano sin cambios
                    processedContent += segment
                        .replace(/&/g, '&amp;')
                        .replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;')
                        .replace(/\n/g, '<br/>');
                }
            });

            setLatexPreview(processedContent);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await addExercise(exerciseData);
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

                                <label>Dificultad</label>
                                <div className="difficulty-container">
                                    {[1, 2, 3, 4, 5].map((num) => (
                                        <label key={num} className="difficulty-option">
                                            <input 
                                                type="radio" 
                                                name="difficulty" 
                                                value={num} 
                                                onChange={handleChange} 
                                                required
                                            />
                                            <span>{num}</span>
                                        </label>
                                    ))}
                                </div>
                                {errors.difficulty && <p className='error'>{errors.difficulty}</p>}

                                <label>Categoría</label>
                                <select 
                                    className="category-exercise" 
                                    name="category" 
                                    onChange={handleChange} 
                                    required
                                >
                                    <option value="">Selecciona una categoría</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.name}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.category && <p className="error">{errors.category}</p>}

                                {/* Área de Descripción y Vista Previa */}
                                <div className="description-container">
                                    <div className="description-editor">
                                        <label>Descripción</label>
                                        <textarea
                                            className='description-exercise'
                                            name='description'
                                            rows="5"
                                            cols="50"
                                            onChange={handleChange}
                                            placeholder="Escribe aquí en formato LaTeX (usa \( ... \) para matemáticas en línea o \[ ... \] para ecuaciones en bloque)"
                                            required
                                        />
                                        {errors.description && <p className="error">{errors.description}</p>}
                                    </div>

                                    {/* Vista Previa en Tiempo Real */}
                                    <div className="latex-preview">
                                        <h3>Vista Previa:</h3>
                                        <div className="preview-box" dangerouslySetInnerHTML={{ __html: latexPreview }} />
                                    </div>
                                </div>
                                <ImageUploader />
                            </fieldset>
                        
                            <fieldset>
                                <legend>Información opcional</legend>
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
                    <button onClick={() => navigate("/exercises")}>Atrás</button>
                    <button onClick={() => navigate("/dashboard")}>Volver al Inicio</button>
                </div>
            </div>
    );
}

export default CreateExercise;