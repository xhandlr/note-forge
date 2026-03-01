import React from 'react';
import { GripVertical, Trash2, Eye } from 'lucide-react';
import { renderLatex } from '../../utils/latexRenderer';

interface Exercise {
    id: number;
    title: string;
    description: string;
}

interface GuideExercisesListProps {
    exercises: Exercise[];
    onRemove: (id: number) => void;
    onDragStart: (e: React.DragEvent, id: number) => void;
    onDragOver: (e: React.DragEvent) => void;
    onDrop: (e: React.DragEvent, targetIndex: number) => void;
    onPreview: (exercise: Exercise) => void;
}

const GuideExercisesList: React.FC<GuideExercisesListProps> = ({
    exercises,
    onRemove,
    onDragStart,
    onDragOver,
    onDrop,
    onPreview
}) => {
    return (
        <div className="flex-1 flex flex-col">
            <h3 className="font-bold text-slate-900 mb-4">Ejercicios en la guía ({exercises.length})</h3>

            {exercises.length === 0 ? (
                <div className="flex-1 flex items-center justify-center text-slate-400 text-sm">
                    Arrastra ejercicios aquí o búscalos
                </div>
            ) : (
                <div className="flex-1 overflow-y-auto space-y-2">
                    {exercises.map((exercise, idx) => (
                        <div
                            key={exercise.id}
                            draggable
                            onDragStart={(e) => onDragStart(e, exercise.id)}
                            onDragOver={onDragOver}
                            onDrop={(e) => onDrop(e, idx)}
                            className="p-3 bg-white border border-slate-200 rounded-lg hover:border-rose-300 transition-colors group cursor-move"
                        >
                            <div className="flex items-start gap-3">
                                <GripVertical className="text-slate-400 shrink-0 mt-1" size={16} />
                                <div className="flex-1 min-w-0">
                                    <span className="font-bold text-slate-900">{idx + 1}.</span>
                                    <h4 className="font-bold text-slate-900 text-sm line-clamp-1 inline-block ml-2">
                                        {exercise.title}
                                    </h4>
                                    {exercise.description && (
                                        <p
                                            className="text-slate-500 text-xs line-clamp-2 mt-1"
                                            dangerouslySetInnerHTML={{
                                                __html: renderLatex(exercise.description).substring(0, 100) + '...'
                                            }}
                                        />
                                    )}
                                </div>
                                <div className="flex gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => onPreview(exercise)}
                                        className="p-1.5 bg-blue-500 text-white rounded hover:bg-blue-600"
                                        title="Ver vista previa"
                                    >
                                        <Eye size={14} />
                                    </button>
                                    <button
                                        onClick={() => onRemove(exercise.id)}
                                        className="p-1.5 bg-red-500 text-white rounded hover:bg-red-600"
                                        title="Eliminar"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default GuideExercisesList;
