import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Dashboard/Navbar';
import BgDecoration from '../../components/UI/BgDecoration';
import Footer from '../../components/UI/Footer';
import SearchBar from "../../components/Dashboard/SearchBar";
import { getExercises } from "../../services/ExerciseService";
import ExerciseOption from "../../components/Exercises/ExerciseOption";
import { FileText, GripVertical, Trash2, Download, Eye, ArrowLeft, Plus } from 'lucide-react';

interface Exercise {
    id: number;
    title: string;
    description: string;
    answer?: string;
    imageUrl?: string;
    difficulty?: number;
}

function CreateGuide() {
    const navigate = useNavigate();
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
    const [guideExercises, setGuideExercises] = useState<Exercise[]>([]); // Ejercicios en la guía
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

    const handleRemoveFromGuide = (id) => {
        setGuideExercises(guideExercises.filter(ex => ex.id !== id));
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
        e.preventDefault();
    };

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <BgDecoration file="orange.png" position="top-0 left-0" />
            <BgDecoration file="yellow.png" position="top-0 right-0" />

            <Navbar />

            <div className="w-[60%] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-left mt-20">

                {/* Header de página */}
                <div className="flex items-center justify-between bg-white p-5 rounded-[2rem] shadow-lg border border-slate-200">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center shadow-inner">
                            <FileText size={22} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h1 className="text-xl font-black text-slate-900 tracking-tight">Forjar Guía</h1>
                            <p className="text-slate-500 font-semibold text-xs">Agrupa ejercicios en un documento profesional.</p>
                        </div>
                    </div>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="p-3 bg-slate-50 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all hover:cursor-pointer"
                    >
                        <ArrowLeft size={20} strokeWidth={3} />
                    </button>
                </div>

                {/* Contenedor de dos columnas */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Columna izquierda: Configuración y Ejercicios Seleccionados */}
                    <div className="space-y-8">

                        {/* Configuración de la Guía */}
                        <div className="bg-white p-7 lg:p-9 rounded-[2.5rem] shadow-xl border border-slate-200 space-y-8">
                            <h2 className="text-lg font-black text-slate-900 tracking-tight">Configuración</h2>

                            <div className="w-full">
                                <label className="text-slate-900 font-black text-base ml-1 block mb-4">Título de la Guía *</label>
                                <input
                                    type="text"
                                    value={guideTitle}
                                    onChange={(e) => setGuideTitle(e.target.value)}
                                    placeholder="Ej: Guía de Ejercicios #4 - Cálculo"
                                    className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] outline-none focus:ring-4 focus:ring-rose-100 focus:border-rose-400 transition-all font-bold text-slate-800 text-base"
                                />
                            </div>

                            <div className="w-full">
                                <label className="text-slate-900 font-black text-base ml-1 block mb-4">Autor</label>
                                <input
                                    type="text"
                                    value={guideAuthor}
                                    onChange={(e) => setGuideAuthor(e.target.value)}
                                    placeholder="Ej: Facultad de Ciencias"
                                    className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] outline-none focus:ring-4 focus:ring-rose-100 focus:border-rose-400 transition-all font-bold text-slate-800 text-base"
                                />
                            </div>
                        </div>

                        {/* Ejercicios Seleccionados */}
                        <div className="bg-white p-7 lg:p-9 rounded-[2.5rem] shadow-xl border border-slate-200 space-y-6">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-black text-slate-900 tracking-tight">Orden de los Retos</h3>
                                <span className="text-xs bg-slate-900 text-white px-4 py-2 rounded-full font-black uppercase tracking-widest">
                                    {guideExercises.length} ejercicios
                                </span>
                            </div>

                            <div
                                className="space-y-4"
                                onDrop={(e) => handleDrop(e, -1)}
                                onDragOver={handleDragOver}
                            >
                                {guideExercises.length === 0 ? (
                                    <div className="py-16 text-center border-4 border-dashed border-slate-100 rounded-[2rem] bg-slate-50/50">
                                        <p className="text-slate-300 font-black text-base">Sin ejercicios seleccionados</p>
                                        <p className="text-slate-400 font-semibold mt-2 text-sm">Arrastra ejercicios desde el panel derecho.</p>
                                    </div>
                                ) : (
                                    guideExercises.map((exercise, idx) => (
                                        <div
                                            key={exercise.id}
                                            draggable
                                            onDragStart={(e) => handleDragStart(e, exercise.id)}
                                            onDrop={(e) => handleDrop(e, idx)}
                                            onDragOver={handleDragOver}
                                            className="flex items-center gap-4 p-4 bg-slate-50 rounded-[1.5rem] border border-slate-100 group hover:bg-white hover:border-rose-400 hover:shadow-lg transition-all cursor-grab active:cursor-grabbing"
                                        >
                                            <div className="text-slate-200 group-hover:text-rose-400 transition-colors">
                                                <GripVertical size={20} />
                                            </div>
                                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center font-black text-rose-500 shadow-sm border border-slate-100 text-sm group-hover:bg-rose-500 group-hover:text-white transition-all">
                                                {idx + 1}
                                            </div>
                                            <div className="flex-grow">
                                                <h4 className="font-black text-slate-900 text-sm group-hover:text-rose-600 transition-colors line-clamp-1">{exercise.title}</h4>
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Dificultad: {exercise.difficulty || 'N/A'}</span>
                                            </div>
                                            <button
                                                onClick={() => handleRemoveFromGuide(exercise.id)}
                                                className="p-2 text-slate-300 hover:text-red-500 transition-colors bg-white rounded-lg shadow-sm border border-slate-100"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Botones de Acción */}
                        <div className="flex gap-4">
                            <button className="flex-1 bg-rose-500 text-white py-4 rounded-[1.5rem] font-black text-base flex items-center justify-center gap-2 shadow-xl shadow-rose-900/20 hover:bg-rose-600 transition-all active:scale-95">
                                <Download size={20} strokeWidth={3} /> Exportar PDF
                            </button>
                            <button className="flex-1 bg-slate-100 text-slate-600 py-4 rounded-[1.5rem] font-black text-base flex items-center justify-center gap-2 hover:bg-slate-200 transition-all">
                                <Eye size={20} /> Vista Previa
                            </button>
                        </div>
                    </div>

                    {/* Columna derecha: Ejercicios Disponibles y Vista Previa */}
                    <div className="space-y-8">

                        {/* Ejercicios Disponibles */}
                        <div className="bg-white p-7 lg:p-9 rounded-[2.5rem] shadow-xl border border-slate-200 space-y-6">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-black text-slate-900 tracking-tight">Ejercicios Disponibles</h3>
                                <button
                                    onClick={() => navigate('/exercises/create')}
                                    className="p-2 bg-slate-900 text-white rounded-xl hover:bg-rose-500 transition-all"
                                >
                                    <Plus size={18} strokeWidth={3} />
                                </button>
                            </div>

                            <SearchBar onSearch={handleSearch} />

                            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                                {filteredExercises.map((exercise) => (
                                    <div
                                        key={exercise.id}
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, exercise.id)}
                                        className="cursor-grab active:cursor-grabbing"
                                    >
                                        <ExerciseOption
                                            id={exercise.id}
                                            title={exercise.title}
                                            description={exercise.description}
                                            difficulty={exercise.difficulty}
                                            reference={null}
                                            duration={null}
                                            tags={null}
                                            className="custom-exercise-option"
                                            imageUrl={exercise.imageUrl}
                                            onDelete={handleDeleteExercise}
                                        />
                                    </div>
                                ))}
                                {filteredExercises.length === 0 && (
                                    <div className="py-8 text-center">
                                        <p className="text-slate-400 font-semibold text-sm">No hay ejercicios disponibles</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Vista Previa LaTeX */}
                        <div className="bg-white p-7 lg:p-9 rounded-[2.5rem] shadow-xl border border-slate-200 space-y-6">
                            <h3 className="text-lg font-black text-slate-900 tracking-tight">Vista Previa LaTeX</h3>

                            <textarea
                                value={guideDescription}
                                readOnly
                                rows={12}
                                className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] outline-none resize-none font-mono text-xs text-slate-700 leading-relaxed"
                            />

                            {guideExercises.some(ex => ex.imageUrl && ex.imageUrl.trim() !== "") && (
                                <div className="space-y-3">
                                    <p className="text-slate-500 font-black text-sm ml-1">Imágenes incluidas</p>
                                    <div className="grid grid-cols-2 gap-3">
                                        {guideExercises
                                            .filter(exercise => exercise.imageUrl && exercise.imageUrl.trim() !== "")
                                            .map((exercise) => (
                                                <div key={exercise.id} className="rounded-[1.5rem] overflow-hidden border-2 border-slate-100 shadow-sm">
                                                    <img src={exercise.imageUrl} alt={exercise.title} className="w-full h-24 object-cover" />
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>

            <Footer />
        </div>
    );
}

export default CreateGuide;
