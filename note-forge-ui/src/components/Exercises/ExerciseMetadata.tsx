import React from 'react';

interface ExerciseMetadataProps {
    title: string;
    onTitleChange: (title: string) => void;
    description: string;
    onDescriptionChange: (description: string) => void;
    difficulty: number;
    onDifficultyChange: (difficulty: number) => void;
    duration: string;
    onDurationChange: (duration: string) => void;
}

const ExerciseMetadata: React.FC<ExerciseMetadataProps> = ({
    title,
    onTitleChange,
    description,
    onDescriptionChange,
    difficulty,
    onDifficultyChange,
    duration,
    onDurationChange
}) => {
    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">Título *</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => onTitleChange(e.target.value)}
                    placeholder="Ej: Integral de x²"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
            </div>

            <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">Descripción / Enunciado</label>
                <textarea
                    value={description}
                    onChange={(e) => onDescriptionChange(e.target.value)}
                    placeholder="Escriba el enunciado del ejercicio..."
                    rows={6}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 font-mono text-sm"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-bold text-slate-900 mb-2">Dificultad (1-5)</label>
                    <select
                        value={difficulty}
                        onChange={(e) => onDifficultyChange(Number(e.target.value))}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                    >
                        {[1, 2, 3, 4, 5].map(d => (
                            <option key={d} value={d}>{d} - {'⭐'.repeat(d)}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-900 mb-2">Duración (min)</label>
                    <input
                        type="number"
                        value={duration}
                        onChange={(e) => onDurationChange(e.target.value)}
                        placeholder="15"
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                </div>
            </div>
        </div>
    );
};

export default ExerciseMetadata;
