import React, { useState } from "react";

interface DeleteDialogProps {
    categoryName: string;
    exercisesCount: number;
    onConfirm: (deleteExercises: boolean) => void;
    onCancel: () => void;
    deleting?: boolean;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({ categoryName, exercisesCount, onConfirm, onCancel, deleting }) => {
    const [typedName, setTypedName] = useState('');
    const [deleteExercises, setDeleteExercises] = useState(false);
    const canDelete = typedName === categoryName;

    return (
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100]"
            onClick={onCancel}
        >
            <div
                className="bg-white rounded-[2rem] p-8 max-w-md w-full mx-4 shadow-2xl"
                onClick={e => e.stopPropagation()}
            >
                <h2 className="text-2xl font-black text-slate-900 mb-1">¿Seguro?</h2>
                <p className="text-slate-500 text-sm font-medium mb-6">Esta acción no se puede deshacer.</p>

                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-black text-slate-700 mb-2 block">
                            Escribe <span className="text-rose-600 font-black">{categoryName}</span> para confirmar
                        </label>
                        <input
                            type="text"
                            value={typedName}
                            onChange={e => setTypedName(e.target.value)}
                            placeholder={categoryName}
                            autoFocus
                            className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-rose-400 focus:ring-4 focus:ring-rose-100 transition-all"
                        />
                    </div>

                    {exercisesCount > 0 && (
                        <div className="bg-slate-50 rounded-2xl p-5 space-y-3 border border-slate-100">
                            <p className="text-sm font-black text-slate-700">
                                ¿Qué deseas hacer con los ejercicios de su interior?{' '}
                                Tienes <span className="text-rose-600">{exercisesCount}</span> ejercicio{exercisesCount !== 1 ? 's' : ''}
                            </p>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="radio"
                                    name="exercise-action"
                                    checked={deleteExercises}
                                    onChange={() => setDeleteExercises(true)}
                                    className="accent-rose-500 w-4 h-4"
                                />
                                <span className="text-sm font-bold text-slate-700">Eliminar todos los ejercicios</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="radio"
                                    name="exercise-action"
                                    checked={!deleteExercises}
                                    onChange={() => setDeleteExercises(false)}
                                    className="accent-rose-500 w-4 h-4"
                                />
                                <span className="text-sm font-bold text-slate-700">Conservar ejercicios</span>
                            </label>
                        </div>
                    )}
                </div>

                <div className="flex gap-3 mt-8">
                    <button
                        onClick={onCancel}
                        disabled={deleting}
                        className="flex-1 py-3 rounded-[1.5rem] border-2 border-slate-200 text-slate-600 font-black text-sm hover:bg-slate-50 transition-all disabled:opacity-50"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={() => onConfirm(deleteExercises)}
                        disabled={!canDelete || deleting}
                        className="flex-1 py-3 rounded-[1.5rem] bg-rose-500 text-white font-black text-sm hover:bg-rose-600 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-xl shadow-rose-200"
                    >
                        {deleting ? 'Eliminando...' : 'Eliminar'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteDialog;
