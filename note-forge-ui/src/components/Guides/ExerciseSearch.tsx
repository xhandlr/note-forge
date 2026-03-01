import React from 'react';
import { Search, Plus, BookOpen } from 'lucide-react';

interface Exercise {
    id: number;
    title: string;
    description: string;
    difficulty?: number;
    duration?: string;
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
    categories?: Category[];
    selectedCategories?: number[];
    onCategoriesChange?: (ids: number[]) => void;
}

const ExerciseSearch: React.FC<ExerciseSearchProps> = ({
    searchQuery,
    onSearchChange,
    filteredExercises,
    onAddExercise,
    categories = [],
    selectedCategories = [],
    onCategoriesChange = () => {}
}) => {
    const handleCategoryToggle = (categoryId: number) => {
        const updated = selectedCategories.includes(categoryId)
            ? selectedCategories.filter(id => id !== categoryId)
            : [...selectedCategories, categoryId];
        onCategoriesChange(updated);
    };
    return (
        <div className="flex-shrink-0">
            <div className="flex items-center gap-2 text-slate-900 mb-4">
                <BookOpen size={18} strokeWidth={2.5} />
                <h3 className="text-sm font-black uppercase tracking-widest">Biblioteca de Ejercicios</h3>
            </div>

            <div className="relative mb-4">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                <input
                    type="text"
                    placeholder="Buscar retos..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-rose-100 text-sm font-bold"
                />
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                {filteredExercises.map(exercise => (
                    <div
                        key={exercise.id}
                        draggable
                        className="bg-white p-4 rounded-xl border border-slate-200 hover:border-amber-400 transition-all flex items-center justify-between group cursor-grab shadow-sm"
                    >
                        <div className="min-w-0">
                            <p className="font-bold text-slate-900 text-xs truncate">{exercise.title}</p>
                            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">
                                Nivel {exercise.difficulty || 'N/A'}
                                {exercise.duration ? ` · ${exercise.duration} min` : ''}
                            </p>
                        </div>
                        <button
                            onClick={() => onAddExercise(exercise)}
                            className="p-2 bg-slate-50 text-slate-400 rounded-lg group-hover:bg-amber-500 group-hover:text-white transition-all"
                        >
                            <Plus size={16} strokeWidth={3} />
                        </button>
                    </div>
                ))}
                {filteredExercises.length === 0 && (
                    <div className="py-8 text-center">
                        <p className="text-slate-400 font-semibold text-sm">No hay ejercicios disponibles</p>
                    </div>
                )}
            </div>

            {categories.length > 0 && (
                <div className="mt-8 pt-8 border-t border-slate-200 space-y-3">
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
                                    className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
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
