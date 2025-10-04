import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addExercise } from '../../services/ExerciseService';

// UI Components
import Navbar from '../../components/Dashboard/Navbar';
import BgDecoration from '../../components/UI/BgDecoration';
import Footer from '../../components/UI/Footer';

// Exercise Components
import DifficultyContainer from '../../components/Exercises/DifficultyContainer';
import ImageUploader from '../../components/Dashboard/ImageUploader';
import TagsInput from '../../components/Exercises/TagsInput';
import DurationInput from '../../components/Exercises/DurationInput';
import LatexEditor from '../../components/Exercises/LatexEditor';
import CategoryExercise from '../../components/Exercises/CategoryExercise';

interface ExerciseData {
    title: string;
    description: string;
    difficulty: string;
    reference: string;
    answer: string;
    duration: string;
    tags: string[];
    details: string;
    image: File | null;
    categoryId: string;
}

interface FormErrors {
    title?: string;
    description?: string;
    difficulty?: string;
    categoryId?: string;
    reference?: string;
    answer?: string;
    duration?: string;
    tags?: string;
    details?: string;
    image?: string;
}

function CreateExercise() {
    const [exerciseData, setExerciseData] = useState<ExerciseData>({
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

    const [errors, setErrors] = useState<FormErrors>({});
    const navigate = useNavigate();

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setExerciseData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', exerciseData.title);
        formData.append('description', exerciseData.description);
        formData.append('difficulty', exerciseData.difficulty);
        formData.append('reference', exerciseData.reference);
        formData.append('answer', exerciseData.answer);
        formData.append('duration', exerciseData.duration);
        formData.append('tags', JSON.stringify(exerciseData.tags));
        formData.append('details', exerciseData.details);
        formData.append('categoryId', exerciseData.categoryId);

        if (exerciseData.image) {
            formData.append('image', exerciseData.image);
        }

        try {
            const response = await addExercise(formData);
            if (response.message) {
                alert(`Ejercicio almacenado con éxito! ID: ${response.exerciseId}`);
                navigate('/exercises');
            } else {
                alert('Error al almacenar ejercicio');
            }
        } catch (error) {
            // Asumimos que el error es un objeto con campos de error
            setErrors(error as FormErrors);
            console.log('Error en el registro', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <BgDecoration file="orange.png" position="top-0 left-0" />
            <BgDecoration file="yellow.png" position="top-0 right-0" />

            <Navbar />

            <div className="max-w-5xl mx-auto px-6 pt-24 pb-10">
                {/* Header */}
                <div className="bg-white rounded-lg border border-gray-300 p-8 mb-6 shadow-sm">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Crear Nuevo Ejercicio</h1>
                    <p className="text-gray-600">
                        Completa la información para agregar un nuevo ejercicio a tu colección
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">

                    <div className="bg-white rounded-lg border border-gray-300 p-8 shadow-sm">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">Información Principal</h2>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Título del ejercicio *
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={exerciseData.title}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                                    placeholder="Ingresa el título del ejercicio"
                                    required
                                />
                                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Dificultad *
                                    </label>
                                    <DifficultyContainer
                                        value={exerciseData.difficulty}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Categoría *
                                    </label>
                                    <CategoryExercise
                                        value={exerciseData.categoryId}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Descripción *
                                </label>
                                <LatexEditor
                                    value={exerciseData.description}
                                    onChange={handleChange}
                                    name="description"
                                />
                                {errors.description && (
                                    <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Imagen (opcional)
                                </label>
                                <ImageUploader
                                    onImageSelect={(file) =>
                                        setExerciseData({ ...exerciseData, image: file })
                                    }
                                />
                                {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg border border-gray-300 p-8 shadow-sm">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">Información Adicional</h2>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Referencia (Libro/Link)
                                </label>

                                <div className="flex gap-2 mb-3">
                                    <button
                                        type="button"
                                        onClick={() => setExerciseData({ ...exerciseData, reference: '📚 Libro: ' })}
                                        className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors flex items-center gap-1"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                        Libro
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setExerciseData({ ...exerciseData, reference: '🔗 Link: ' })}
                                        className="px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors flex items-center gap-1"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                        </svg>
                                        Link
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setExerciseData({ ...exerciseData, reference: '📄 Documento: ' })}
                                        className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-100 transition-colors flex items-center gap-1"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        Documento
                                    </button>
                                </div>

                                <textarea
                                    name="reference"
                                    value={exerciseData.reference}
                                    onChange={handleChange}
                                    rows={3}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all resize-none"
                                    placeholder="Ej: Cálculo de Stewart, Capítulo 3 o https://example.com/resource  "
                                />
                                {errors.reference && (
                                    <p className="text-red-500 text-sm mt-1">{errors.reference}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Respuesta
                                </label>
                                <LatexEditor
                                    value={exerciseData.answer}
                                    onChange={handleChange}
                                    name="answer"
                                />
                                {errors.answer && <p className="text-red-500 text-sm mt-1">{errors.answer}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Duración estimada
                                </label>
                                <DurationInput value={exerciseData.duration} onChange={handleChange} />
                                {errors.duration && (
                                    <p className="text-red-500 text-sm mt-1">{errors.duration}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Etiquetas
                                </label>
                                <TagsInput
                                    value={exerciseData.tags}
                                    onChange={(tags) => setExerciseData({ ...exerciseData, tags })}
                                />
                                {errors.tags && <p className="text-red-500 text-sm mt-1">{errors.tags}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Detalles adicionales
                                </label>
                                <textarea
                                    name="details"
                                    value={exerciseData.details}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all resize-none"
                                    placeholder="Agrega notas o detalles adicionales sobre el ejercicio"
                                />
                                {errors.details && (
                                    <p className="text-red-500 text-sm mt-1">{errors.details}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => navigate('/exercises')}
                                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200"
                            >
                                Atrás
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate('/dashboard')}
                                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200"
                            >
                                Volver al Inicio
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="px-8 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-200 shadow-md hover:shadow-lg"
                        >
                            Guardar Ejercicio
                        </button>
                    </div>
                </form>
            </div>

            <Footer />
        </div>
    );
}

export default CreateExercise;