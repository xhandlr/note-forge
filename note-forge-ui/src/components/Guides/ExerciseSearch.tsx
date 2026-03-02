import React from 'react';
import { Plus, BookOpen, Check, ChevronRight } from 'lucide-react';

interface Exercise {
    id: number;
    title: string;
    description: string;
    difficulty?: number;
    duration?: string;
    image_url?: string;
    imageUrl?: string;
    categoryId?: number;
}

interface Category {
    id: number;
    name: string;
}

interface ExerciseSearchProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    filteredExercises: Exercise[];
    onAddExercise: (exercise: Exercise) => void;
    guideExercises?: Exercise[];
    onRemoveExercise?: (id: number) => void;
    onOpenPicker?: () => void;
    categories?: Category[];
    selectedCategories?: number[];
    onCategoriesChange?: (ids: number[]) => void;
}

const ExerciseSearch: React.FC<ExerciseSearchProps> = ({
    filteredExercises,
    onAddExercise,
    guideExercises = [],
    onRemoveExercise = () => {},
    onOpenPicker = () => {},
    categories = [],
    selectedCategories = [],
    onCategoriesChange = () => {}
}) => {
    const selectedExerciseIds = new Set(guideExercises.map(ex => ex.id));

    // Obtener últimos 4 ejercicios creados
    const lastFourExercises = React.useMemo(() => {
        return filteredExercises.slice(-4).reverse();
    }, [filteredExercises]);

    const handleCategoryToggle = (categoryId: number) => {
        const updated = selectedCategories.includes(categoryId)
            ? selectedCategories.filter(id => id !== categoryId)
            : [...selectedCategories, categoryId];
        onCategoriesChange(updated);
    };

    return (
        <div className="flex-shrink-0">
            {/* Últimos Ejercicios */}
            <div className="mb-8">
                <div className="flex items-center gap-2 text-slate-900 mb-6">
                    <BookOpen size={18} strokeWidth={2.5} />
                    <h3 className="text-sm font-black uppercase tracking-widest">Últimos Ejercicios</h3>
                </div>

                <div className="space-y-3 mb-6">
                    {lastFourExercises.length === 0 ? (
                        <div className="py-6 text-center">
                            <p className="text-slate-400 font-semibold text-xs">No hay ejercicios disponibles</p>
                        </div>
                    ) : (
                        lastFourExercises.map(exercise => {
                            const isSelected = selectedExerciseIds.has(exercise.id);
                            return (
                                <div
                                    key={exercise.id}
                                    draggable
                                    className="bg-white p-4 rounded-xl border border-slate-200 hover:border-rose-300 transition-all flex items-center justify-between group cursor-grab shadow-sm hover:shadow-md"
                                >
                                    <div className="min-w-0 flex-grow">
                                        <p className="font-bold text-slate-900 text-xs truncate">{exercise.title}</p>
                                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">
                                            Nivel {exercise.difficulty || 'N/A'}
                                            {exercise.duration ? ` · ${exercise.duration} min` : ''}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => isSelected ? onRemoveExercise(exercise.id) : onAddExercise(exercise)}
                                        className={`p-2 rounded-lg transition-all flex-shrink-0 ml-2 ${
                                            isSelected
                                                ? 'bg-rose-500 text-white'
                                                : 'bg-slate-50 text-slate-400 group-hover:bg-rose-500 group-hover:text-white'
                                        }`}
                                    >
                                        {isSelected ? (
                                            <Check size={16} strokeWidth={3} />
                                        ) : (
                                            <Plus size={16} strokeWidth={3} />
                                        )}
                                    </button>
                                </div>
                            );
                        })
                    )}
                </div>

                <button
                    onClick={onOpenPicker}
                    className="w-full py-3 px-4 rounded-xl font-black text-sm bg-slate-100 text-slate-900 hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
                >
                    Explorar Todos los Ejercicios
                    <ChevronRight size={16} strokeWidth={3} />
                </button>
            </div>

            {/* Asignaturas */}
            {categories.length > 0 && (
                <div className="pt-8 border-t border-slate-200 space-y-3">
                    <h4 className="text-xs font-black uppercase tracking-widest text-slate-500">Asignaturas</h4>
                    <div className="space-y-2">
                        {categories.map(category => (
                            <label
                                key={category.id}
                                className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 cursor-pointer transition-colors group"
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedCategories.includes(category.id)}
                                    onChange={() => handleCategoryToggle(category.id)}
                                    className="w-4 h-4 accent-rose-500 rounded cursor-pointer"
                                />
                                <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900">{category.name}</span>
                            </label>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExerciseSearch;
