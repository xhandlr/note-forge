import React from 'react';
import { GripVertical, Trash2 } from 'lucide-react';

interface Exercise {
    id: number;
    title: string;
    description: string;
    difficulty?: number;
    duration?: string;
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
        <section className="space-y-6 pt-4">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-amber-500">
                    <GripVertical size={18} strokeWidth={2.5} />
                    <h2 className="text-sm font-black uppercase tracking-widest">Orden de los Ejercicios</h2>
                </div>
                <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-black rounded-lg uppercase tracking-widest">
                    {exercises.length} Ejercicios
                </span>
            </div>

            <div className="space-y-3" onDrop={(e) => onDrop(e, -1)} onDragOver={onDragOver}>
                {exercises.length === 0 ? (
                    <div className="py-20 text-center border-2 border-dashed border-slate-100 rounded-3xl bg-slate-50/30">
                        <p className="text-slate-300 font-bold">No hay ejercicios seleccionados aún.</p>
                    </div>
                ) : (
                    exercises.map((item, idx) => (
                        <div
                            key={item.id}
                            draggable
                            onDragStart={(e) => onDragStart(e, item.id)}
                            onDrop={(e) => onDrop(e, idx)}
                            onDragOver={onDragOver}
                            className="flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-2xl hover:border-rose-200 hover:shadow-sm transition-all group cursor-grab active:cursor-grabbing"
                        >
                            <div className="cursor-grab text-slate-200 group-hover:text-slate-400 p-1">
                                <GripVertical size={20} />
                            </div>
                            <div className="w-10 h-10 shrink-0 bg-slate-900 text-white rounded-xl flex items-center justify-center font-black text-sm">
                                {idx + 1}
                            </div>
                            <div className="flex-grow min-w-0">
                                <h4 className="font-bold text-slate-900 text-sm truncate">{item.title}</h4>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                    Dificultad: {item.difficulty || 'N/A'}
                                    {item.duration ? ` · ${item.duration} min` : ''}
                                </p>
                            </div>
                            <button
                                onClick={() => onRemove(item.id)}
                                className="p-2.5 text-slate-300 hover:text-rose-500 transition-colors"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
};

export default GuideExercisesList;
