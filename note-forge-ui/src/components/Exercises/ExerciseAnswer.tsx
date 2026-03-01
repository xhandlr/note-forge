import React from 'react';

interface ExerciseAnswerProps {
    answer: string;
    onAnswerChange: (answer: string) => void;
}

const ExerciseAnswer: React.FC<ExerciseAnswerProps> = ({ answer, onAnswerChange }) => {
    return (
        <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-900">Respuesta / Solución</label>
            <textarea
                value={answer}
                onChange={(e) => onAnswerChange(e.target.value)}
                placeholder="Escriba la solución o respuesta..."
                rows={6}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
            />
            <p className="text-xs text-slate-500">Puede usar LaTeX: $x^2 + y^2 = z^2$</p>
        </div>
    );
};

export default ExerciseAnswer;
