import React from 'react';
import { Search, Plus } from 'lucide-react';

interface Exercise {
    id: number;
    title: string;
    description: string;
    difficulty?: number;
}

interface ExerciseSearchProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    filteredExercises: Exercise[];
    onAddExercise: (exercise: Exercise) => void;
}

const ExerciseSearch: React.FC<ExerciseSearchProps> = ({
    searchQuery,
    onSearchChange,
    filteredExercises,
    onAddExercise
}) => {
    return (
        <div className="flex-1 flex flex-col">
            <div className="mb-4">
                <div className="relative">
                    <Search className="absolute left-3 top-3 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Buscar ejercicios..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2">
                {filteredExercises.map(exercise => (
                    <div
                        key={exercise.id}
                        className="p-3 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors group"
                    >
                        <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-slate-900 text-sm line-clamp-1">{exercise.title}</h4>
                                <p className="text-slate-500 text-xs line-clamp-2">{exercise.description}</p>
                            </div>
                            <button
                                onClick={() => onAddExercise(exercise)}
                                className="shrink-0 p-1.5 bg-rose-500 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-600"
                                title="Agregar ejercicio"
                            >
                                <Plus size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExerciseSearch;
