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

interface ExerciseSearchProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    filteredExercises: Exercise[];
    onAddExercise: (exercise: Exercise) => void;
    guideExercises?: Exercise[];
    onRemoveExercise?: (id: number) => void;
    onOpenPicker?: () => void;
}

const ExerciseSearch: React.FC<ExerciseSearchProps> = ({
    filteredExercises,
    onAddExercise,
    guideExercises = [],
    onRemoveExercise = () => {},
    onOpenPicker = () => {}
}) => {
    const selectedExerciseIds = new Set(guideExercises.map(ex => ex.id));

    // Obtener últimos 4 ejercicios creados
    const lastFourExercises = React.useMemo(() => {
        return filteredExercises.slice(-4).reverse();
    }, [filteredExercises]);

    return (
        <div className="flex-shrink-0">
            <div className="flex items-center gap-2 text-slate-900 mb-6">
                <BookOpen size={18} strokeWidth={2.5} />
                <h3 className="text-sm font-black uppercase tracking-widest">Últimos Ejercicios</h3>
            </div>

            {/* Últimos 4 Ejercicios */}
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

            {/* Botón Explorar Todos */}
            <button
                onClick={onOpenPicker}
                className="w-full py-3 px-4 rounded-xl font-black text-sm bg-slate-100 text-slate-900 hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
            >
                Explorar Todos los Ejercicios
                <ChevronRight size={16} strokeWidth={3} />
            </button>
        </div>
    );
};

export default ExerciseSearch;
