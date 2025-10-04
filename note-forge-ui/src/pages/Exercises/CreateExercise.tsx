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
import ReferenceInput from '../../components/Exercises/ReferenceInput';

interface ReferenceItem {
    id: string;
    type: 'book' | 'link' | 'document';
    title: string;
    content: string;
}

interface Tag {
    text: string;
    color: string;
}

interface ExerciseData {
    title: string;
    description: string;
    difficulty: string;
    references: ReferenceItem[];
    answer: string;
    duration: string;
    tags: Tag[];
    details: string;
    image: File | null;
    categoryId: string;
}

interface FormErrors {
    title?: string;
    description?: string;
    difficulty?: string;
    categoryId?: string;
    references?: string;
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
        references: [],
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

    // Función para manejar el cambio de referencias
    const handleReferencesChange = (references: ReferenceItem[]) => {
        setExerciseData((prevState) => ({
            ...prevState,
            references,
        }));
    };

    // Función para convertir referencias a string
    const referencesToString = (references: ReferenceItem[]): string => {
        return references.map(ref => {
            const prefix = ref.type === 'book' ? '📚' : ref.type === 'link' ? '🔗' : '📄';
            return `${prefix} ${ref.title}: ${ref.content}`;
        }).join('\n');
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', exerciseData.title);
        formData.append('description', exerciseData.description);
        formData.append('difficulty', exerciseData.difficulty);
        formData.append('references', JSON.stringify(exerciseData.references));
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
            setErrors(error as FormErrors);
            console.log('Error en el registro', error);
        }
    };

    return (
        <div className="min-h-screen">

            <BgDecoration
                file="orange.png"
                position='top-0 left-0'
            />
            <BgDecoration
                file="yellow.png"
                position='top-0 right-0'
            />

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
                                <ReferenceInput
                                    references={exerciseData.references}
                                    onChange={handleReferencesChange}
                                    error={errors.references}
                                />
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