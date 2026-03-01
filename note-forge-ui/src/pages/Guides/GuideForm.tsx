import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Dashboard/Navbar';
import Footer from '../../components/UI/Footer';
import { useExerciseService } from '../../services/ServiceFactory';
import { addGuide, updateGuide, getGuideById } from "../../services/GuideService";
import { getCategories } from "../../services/CategoryService";
import { ArrowLeft, Save, Download } from 'lucide-react';
import { useNotification } from '../../contexts/NotificationContext';
import ExportGuideModal from '../../components/Guides/ExportGuideModal';
import ExerciseSearch from '../../components/Guides/ExerciseSearch';
import GuideExercisesList from '../../components/Guides/GuideExercisesList';
import GuideMetadata from '../../components/Guides/GuideMetadata';

interface Exercise {
    id: number;
    title: string;
    description: string;
}

interface GuideFormProps {
    mode: 'create' | 'edit';
    guideId?: string;
}

const GuideForm: React.FC<GuideFormProps> = ({ mode, guideId }) => {
    const navigate = useNavigate();
    const { showSuccess, showError } = useNotification();
    const exerciseService = useExerciseService();

    const [loading, setLoading] = useState(mode === 'edit');
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
    const [guideExercises, setGuideExercises] = useState<Exercise[]>([]);
    const [guideTitle, setGuideTitle] = useState("");
    const [guideAuthor, setGuideAuthor] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [showExportModal, setShowExportModal] = useState(false);
    const [categories, setCategories] = useState<any[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const [draggedExerciseId, setDraggedExerciseId] = useState<number | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [exercisesData, categoriesData] = await Promise.all([
                    exerciseService.getAll(),
                    getCategories()
                ]);
                setExercises(exercisesData);
                setFilteredExercises(exercisesData);
                setCategories(categoriesData);
            } catch (error) {
                console.error('Error loading data:', error);
                showError('Error al cargar datos');
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (mode === 'edit' && guideId) {
            const fetchGuide = async () => {
                try {
                    const data = await getGuideById(guideId);
                    if (data) {
                        setGuideTitle(data.title || '');
                        setGuideAuthor(data.author || '');
                        if (data.exercises) setGuideExercises(data.exercises);
                        if (data.categories) {
                            setSelectedCategories(data.categories.map((cat: any) => cat.id));
                        }
                    }
                } catch {
                    showError('Error al cargar la guía');
                } finally {
                    setLoading(false);
                }
            };
            fetchGuide();
        }
    }, [mode, guideId]);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        if (!query.trim()) {
            setFilteredExercises(exercises);
        } else {
            setFilteredExercises(exercises.filter(ex =>
                ex.title.toLowerCase().includes(query.toLowerCase())
            ));
        }
    };

    const handleAddToGuide = (exercise: Exercise) => {
        if (!guideExercises.find(e => e.id === exercise.id)) {
            setGuideExercises([...guideExercises, exercise]);
        }
    };

    const handleRemoveFromGuide = (id: number) => {
        setGuideExercises(guideExercises.filter(e => e.id !== id));
    };

    const handleDragStart = (e: React.DragEvent, id: number) => {
        setDraggedExerciseId(id);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDrop = (e: React.DragEvent, targetIndex: number) => {
        e.preventDefault();
        if (draggedExerciseId === null) return;

        const draggedIndex = guideExercises.findIndex(e => e.id === draggedExerciseId);
        if (draggedIndex === targetIndex) return;

        const newExercises = [...guideExercises];
        const [removed] = newExercises.splice(draggedIndex, 1);
        newExercises.splice(targetIndex, 0, removed);
        setGuideExercises(newExercises);
        setDraggedExerciseId(null);
    };

    const saveGuide = async () => {
        if (!guideTitle.trim()) {
            showError('El título es obligatorio');
            return;
        }

        try {
            const guideData = {
                title: guideTitle,
                author: guideAuthor,
                exerciseIds: guideExercises.map(e => e.id),
                categoryIds: selectedCategories
            };

            if (mode === 'create') {
                await addGuide(guideData);
                showSuccess('Guía creada exitosamente');
                navigate('/dashboard', { state: { tab: 'guias' } });
            } else if (guideId) {
                await updateGuide(guideId, guideData);
                showSuccess('Guía actualizada exitosamente');
                navigate(-1);
            }
        } catch (error) {
            showError('Error al guardar la guía');
        }
    };

    const handleSave = () => {
        saveGuide();
    };

    const handleExportComplete = async () => {
        await saveGuide();
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex flex-col">
                <Navbar />
                <div className="flex items-center justify-center h-screen">
                    <div className="w-12 h-12 border-4 border-rose-500 border-t-transparent rounded-full animate-spin" />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Navbar />

            <div className="w-[90%] lg:w-[70%] mx-auto px-4 py-8 mt-16 flex-grow">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden flex flex-col min-h-[80vh]">

                    {/* Header */}
                    <div className="px-8 py-6 border-b border-slate-200 flex justify-between items-center">
                        <h1 className="text-2xl font-black text-slate-900">
                            {mode === 'edit' ? 'Editar Guía' : 'Nueva Guía'}
                        </h1>
                        <button
                            onClick={() => {
                                if (mode === 'edit') {
                                    navigate(-1);
                                } else {
                                    navigate('/dashboard');
                                }
                            }}
                            className="flex items-center gap-2 text-slate-500 hover:text-slate-900"
                        >
                            <ArrowLeft size={18} /> Volver
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col lg:flex-row flex-grow">

                        {/* Left - Edición */}
                        <div className="lg:w-2/3 p-8 space-y-8 border-r border-slate-200 overflow-y-auto">
                            <GuideMetadata
                                title={guideTitle}
                                onTitleChange={setGuideTitle}
                                author={guideAuthor}
                                onAuthorChange={setGuideAuthor}
                                categories={categories}
                                selectedCategories={selectedCategories}
                                onCategoriesChange={setSelectedCategories}
                            />

                            <div className="h-px bg-slate-200" />

                            <div className="flex-1">
                                <h3 className="font-bold text-slate-900 mb-4">Buscar Ejercicios</h3>
                                <ExerciseSearch
                                    searchQuery={searchQuery}
                                    onSearchChange={handleSearch}
                                    filteredExercises={filteredExercises}
                                    onAddExercise={handleAddToGuide}
                                />
                            </div>
                        </div>

                        {/* Right - Preview & List */}
                        <div className="lg:w-1/3 p-8 space-y-6 bg-slate-50 flex flex-col">
                            <GuideExercisesList
                                exercises={guideExercises}
                                onRemove={handleRemoveFromGuide}
                                onDragStart={handleDragStart}
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={handleDrop}
                                onPreview={(ex) => alert(`Vista previa: ${ex.title}`)}
                            />

                            {/* Actions */}
                            <div className="flex gap-2 pt-4">
                                <button
                                    onClick={handleSave}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-rose-500 text-white rounded-lg font-bold hover:bg-rose-600"
                                >
                                    <Save size={16} /> Guardar
                                </button>
                                <button
                                    onClick={() => setShowExportModal(true)}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600"
                                >
                                    <Download size={16} /> Exportar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />

            {showExportModal && (
                <ExportGuideModal
                    isOpen={showExportModal}
                    guideTitle={guideTitle}
                    guideAuthor={guideAuthor}
                    exercises={guideExercises}
                    onClose={() => setShowExportModal(false)}
                    onExportComplete={handleExportComplete}
                />
            )}
        </div>
    );
};

export default GuideForm;
