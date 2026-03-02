import React, { useState, useMemo } from 'react';
import { Search, Plus, X, Check } from 'lucide-react';

interface Exercise {
    id: number;
    title: string;
    description: string;
    difficulty?: number;
    duration?: string;
    image_url?: string;
    imageUrl?: string;
}

interface Category {
    id: number;
    name: string;
}

interface ExercisePickerProps {
    isOpen: boolean;
    onClose: () => void;
    exercises: Exercise[];
    guideExercises: Exercise[];
    categories: Category[];
    onAddExercise: (exercise: Exercise) => void;
    onRemoveExercise: (id: number) => void;
}

const ExercisePicker: React.FC<ExercisePickerProps> = ({
    isOpen,
    onClose,
    exercises,
    guideExercises,
    categories,
    onAddExercise,
    onRemoveExercise,
}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState<number | null>(null);
    const selectedExerciseIds = new Set(guideExercises.map(ex => ex.id));

    const filteredExercises = useMemo(() => {
        return exercises.filter(ex => {
            const matchesSearch = ex.title.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesDifficulty = selectedDifficulty === null || ex.difficulty === selectedDifficulty;
            return matchesSearch && matchesDifficulty;
        });
    }, [exercises, searchQuery, selectedDifficulty]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-[2.5rem] w-full max-w-6xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
                {/* Header */}
                <div className="px-8 py-6 border-b border-slate-200 flex items-center justify-between">
                    <h2 className="text-2xl font-black text-slate-900">Seleccionar Ejercicios</h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-all"
                    >
                        <X size={24} strokeWidth={3} />
                    </button>
                </div>

                {/* Filters */}
                <div className="px-8 py-4 bg-slate-50 border-b border-slate-200 flex flex-col md:flex-row gap-4 items-start md:items-center">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                        <input
                            type="text"
                            placeholder="Buscar por título..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-rose-100 text-sm font-bold"
                        />
                    </div>

                    <div className="flex gap-2">
                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center">
                            Nivel:
                        </label>
                        <select
                            value={selectedDifficulty === null ? '' : selectedDifficulty}
                            onChange={(e) => setSelectedDifficulty(e.target.value === '' ? null : parseInt(e.target.value))}
                            className="px-3 py-2 border border-slate-200 rounded-lg font-bold text-sm outline-none focus:ring-2 focus:ring-rose-100"
                        >
                            <option value="">Todos</option>
                            {[1, 2, 3, 4, 5].map(level => (
                                <option key={level} value={level}>Nivel {level}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Counter */}
                <div className="px-8 py-3 bg-slate-50 border-b border-slate-200">
                    <p className="text-sm font-bold text-slate-600">
                        <span className="text-rose-600 font-black">{selectedExerciseIds.size}</span> ejercicio{selectedExerciseIds.size !== 1 ? 's' : ''} seleccionado{selectedExerciseIds.size !== 1 ? 's' : ''}
                    </p>
                </div>

                {/* Grid de Ejercicios */}
                <div className="flex-grow overflow-y-auto p-8">
                    {filteredExercises.length === 0 ? (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-slate-400 font-semibold">No hay ejercicios que coincidan con los filtros</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredExercises.map(exercise => {
                                const isSelected = selectedExerciseIds.has(exercise.id);
                                const imgUrl = exercise.image_url || exercise.imageUrl;

                                return (
                                    <div
                                        key={exercise.id}
                                        className={`bg-white rounded-[1.5rem] border-2 transition-all overflow-hidden flex flex-col ${
                                            isSelected
                                                ? 'border-rose-500 shadow-lg shadow-rose-100'
                                                : 'border-slate-200 hover:border-slate-300'
                                        }`}
                                    >
                                        {/* Imagen */}
                                        <div className="relative h-32 bg-slate-100 overflow-hidden">
                                            {imgUrl ? (
                                                <img
                                                    src={imgUrl}
                                                    alt={exercise.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                                                    <span className="text-slate-300 text-sm">Sin imagen</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="p-4 flex-grow flex flex-col">
                                            <h3 className="font-black text-slate-900 text-sm leading-tight mb-2 line-clamp-2">
                                                {exercise.title}
                                            </h3>

                                            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-3">
                                                Nivel {exercise.difficulty || 'N/A'} {exercise.duration ? `· ${exercise.duration} min` : ''}
                                            </p>

                                            <p className="text-xs text-slate-600 line-clamp-2 flex-grow mb-4">
                                                {exercise.description || 'Sin descripción'}
                                            </p>
                                        </div>

                                        {/* Button */}
                                        <button
                                            onClick={() =>
                                                isSelected
                                                    ? onRemoveExercise(exercise.id)
                                                    : onAddExercise(exercise)
                                            }
                                            className={`mx-4 mb-4 py-2 rounded-lg font-black text-sm transition-all flex items-center justify-center gap-2 ${
                                                isSelected
                                                    ? 'bg-rose-500 text-white hover:bg-rose-600'
                                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                            }`}
                                        >
                                            {isSelected ? (
                                                <>
                                                    <Check size={16} strokeWidth={3} /> Agregado
                                                </>
                                            ) : (
                                                <>
                                                    <Plus size={16} strokeWidth={3} /> Agregar
                                                </>
                                            )}
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-8 py-6 border-t border-slate-200 bg-slate-50 flex gap-3 justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-3 font-black rounded-lg text-slate-900 border border-slate-200 hover:bg-slate-50 transition-all"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onClose}
                        className="px-6 py-3 font-black rounded-lg bg-rose-500 text-white hover:bg-rose-600 transition-all"
                    >
                        Listo
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExercisePicker;
