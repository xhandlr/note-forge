import React from 'react';
import { Eye, Code, X } from 'lucide-react';
import { renderLatex } from '../../utils/latexRenderer';

interface Exercise {
    id: number;
    title: string;
    description: string;
    answer?: string;
    image_url?: string;
    imageUrl?: string;
    difficulty?: number;
    duration?: string;
}

interface GuidePreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    previewTab: 'render' | 'latex';
    onTabChange: (tab: 'render' | 'latex') => void;
    guideTitle: string;
    guideAuthor: string;
    guideExercises: Exercise[];
    generateLatex: () => string;
}

const GuidePreviewModal: React.FC<GuidePreviewModalProps> = ({
    isOpen,
    onClose,
    previewTab,
    onTabChange,
    guideTitle,
    guideAuthor,
    guideExercises,
    generateLatex
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex flex-col">
            <div className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between shrink-0">
                <div className="flex gap-2">
                    <button
                        onClick={() => onTabChange('render')}
                        className={`flex items-center gap-2 px-5 py-2 rounded-xl font-black text-sm transition-all ${previewTab === 'render' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}
                    >
                        <Eye size={16} /> Previsualización
                    </button>
                    <button
                        onClick={() => onTabChange('latex')}
                        className={`flex items-center gap-2 px-5 py-2 rounded-xl font-black text-sm transition-all ${previewTab === 'latex' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}
                    >
                        <Code size={16} /> Código LaTeX
                    </button>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all"
                >
                    <X size={22} strokeWidth={2.5} />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto">
                {previewTab === 'render' ? (
                    <div className="max-w-3xl mx-auto py-12 px-6">
                        <div className="bg-white rounded-[2rem] shadow-2xl p-12 md:p-16">
                            <div className="text-center border-b border-slate-100 pb-8 mb-10 space-y-2">
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-500">Note Forge</p>
                                <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                                    {guideTitle || 'Sin título'}
                                </h1>
                                {guideAuthor && (
                                    <p className="text-slate-500 font-semibold text-sm">{guideAuthor}</p>
                                )}
                                <div className="flex items-center justify-center gap-4 pt-2 text-xs text-slate-400 font-bold">
                                    <span>{guideExercises.length} ejercicio{guideExercises.length !== 1 ? 's' : ''}</span>
                                    {guideExercises.reduce((acc, ex) => acc + (parseInt(ex.duration || '0', 10) || 0), 0) > 0 && <><span>·</span><span>~ {guideExercises.reduce((acc, ex) => acc + (parseInt(ex.duration || '0', 10) || 0), 0)} min</span></>}
                                </div>
                            </div>

                            {guideExercises.length === 0 ? (
                                <p className="text-center text-slate-300 font-semibold italic py-12">
                                    Agrega ejercicios a la guía para verlos aquí.
                                </p>
                            ) : (
                                <div className="space-y-12">
                                    {guideExercises.map((ex, idx) => {
                                        const imgUrl = ex.image_url || ex.imageUrl;
                                        return (
                                            <div key={ex.id} className="space-y-4">
                                                <div className="flex items-start gap-4">
                                                    <div className="w-10 h-10 shrink-0 bg-rose-500 text-white rounded-xl flex items-center justify-center font-black text-sm">
                                                        {idx + 1}
                                                    </div>
                                                    <h2 className="text-lg font-black text-slate-900 pt-1.5">{ex.title}</h2>
                                                </div>
                                                {ex.description && (
                                                    <div
                                                        className="text-slate-700 leading-relaxed ml-14 text-sm"
                                                        dangerouslySetInnerHTML={{ __html: renderLatex(ex.description) }}
                                                    />
                                                )}
                                                {imgUrl && (
                                                    <div className="ml-14 rounded-xl overflow-hidden border border-slate-100">
                                                        <img src={imgUrl} alt={ex.title} className="w-full h-auto max-h-72 object-contain" />
                                                    </div>
                                                )}
                                                {ex.answer && (
                                                    <div className="ml-14 bg-slate-50 rounded-xl p-5 border-l-4 border-amber-400">
                                                        <p className="text-[10px] font-black uppercase tracking-widest text-amber-600 mb-3">Resolución</p>
                                                        <div
                                                            className="text-slate-600 text-sm leading-relaxed"
                                                            dangerouslySetInnerHTML={{ __html: renderLatex(ex.answer) }}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="max-w-4xl mx-auto py-12 px-6">
                        <div className="bg-slate-900 rounded-[2rem] p-8 font-mono text-sm text-slate-300 shadow-2xl border border-slate-800 overflow-x-auto">
                            <pre className="whitespace-pre-wrap leading-relaxed">{generateLatex()}</pre>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GuidePreviewModal;
