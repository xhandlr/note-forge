import React, { useState } from 'react';
import { Download, X } from 'lucide-react';
import JSZip from 'jszip';
import { useNotification } from '../../contexts/NotificationContext';

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

interface ExportGuideModalProps {
    isOpen: boolean;
    onClose: () => void;
    onExportComplete: () => Promise<void> | void;
    guideTitle: string;
    guideAuthor?: string;
    exercises: Exercise[];
}

interface ExportOptions {
    includeAnswers: boolean;
    answerPlacement: 'inline' | 'end';
    includeImages: boolean;
    includeDifficulty: boolean;
    includeDuration: boolean;
}

const ExportGuideModal: React.FC<ExportGuideModalProps> = ({
    isOpen,
    onClose,
    onExportComplete,
    guideTitle,
    guideAuthor,
    exercises,
}) => {
    const { showSuccess, showError } = useNotification();
    const [exporting, setExporting] = useState(false);
    const [exportOptions, setExportOptions] = useState<ExportOptions>({
        includeAnswers: true,
        answerPlacement: 'inline',
        includeImages: true,
        includeDifficulty: true,
        includeDuration: true,
    });

    const generateExportLatex = (): string => {
        const imgName = (url: string) => url.split('/').pop() || 'image.png';
        let content = `\\documentclass{article}
\\usepackage{amsmath}
\\usepackage{graphicx}
\\usepackage[utf8]{inputenc}
\\usepackage[T1]{fontenc}
\\usepackage[spanish]{babel}

\\title{${guideTitle || 'Guía de Ejercicios'}}
\\author{${guideAuthor || 'Autor'}}
\\date{\\today}

\\begin{document}

\\maketitle

`;

        if (exportOptions.answerPlacement === 'inline') {
            content += exercises.map((ex, idx) => {
                const imgUrl = ex.image_url || ex.imageUrl;
                let section = `\\section*{${idx + 1}. ${ex.title}}

${ex.description || ''}`;

                if (exportOptions.includeDifficulty && ex.difficulty) {
                    section += `\n\n\\textbf{Dificultad:} ${ex.difficulty}/5`;
                }
                if (exportOptions.includeDuration && ex.duration) {
                    section += `\n\\textbf{Tiempo:} ${ex.duration} min`;
                }

                if (exportOptions.includeImages && imgUrl) {
                    section += `\n\n\\begin{figure}[h]\n\\centering\n\\includegraphics[width=0.8\\textwidth]{images/${imgName(imgUrl)}}\n\\end{figure}`;
                }

                if (exportOptions.includeAnswers && ex.answer) {
                    section += `\n\n\\subsection*{Resolución}\n\n${ex.answer}`;
                }

                return section;
            }).join('\n\n');
        } else {
            content += exercises.map((ex, idx) => {
                const imgUrl = ex.image_url || ex.imageUrl;
                let section = `\\section*{${idx + 1}. ${ex.title}}

${ex.description || ''}`;

                if (exportOptions.includeDifficulty && ex.difficulty) {
                    section += `\n\n\\textbf{Dificultad:} ${ex.difficulty}/5`;
                }
                if (exportOptions.includeDuration && ex.duration) {
                    section += `\n\\textbf{Tiempo:} ${ex.duration} min`;
                }

                if (exportOptions.includeImages && imgUrl) {
                    section += `\n\n\\begin{figure}[h]\n\\centering\n\\includegraphics[width=0.8\\textwidth]{images/${imgName(imgUrl)}}\n\\end{figure}`;
                }

                return section;
            }).join('\n\n');

            if (exportOptions.includeAnswers) {
                content += `\n\n\\newpage\n\\section*{Resoluciones}

`;
                content += exercises.map((ex, idx) => {
                    if (!ex.answer) return '';
                    return `\\subsection*{${idx + 1}. ${ex.title}}\n\n${ex.answer}`;
                }).filter(s => s).join('\n\n');
            }
        }

        content += '\n\n\\end{document}';
        return content;
    };

    const handleExport = async () => {
        try {
            setExporting(true);
            const zip = new JSZip();
            const texContent = generateExportLatex();
            zip.file(`${guideTitle || 'guia'}.tex`, texContent);

            if (exportOptions.includeImages) {
                const imagesFolder = zip.folder('images');
                for (const exercise of exercises) {
                    const imgUrl = exercise.image_url || exercise.imageUrl;
                    if (imgUrl) {
                        try {
                            const imgName = imgUrl.split('/').pop() || 'image.png';
                            const response = await fetch(imgUrl);
                            const blob = await response.blob();
                            imagesFolder?.file(imgName, blob);
                        } catch (err) {
                            console.error('Error descargando imagen:', err);
                        }
                    }
                }
            }

            const blob = await zip.generateAsync({ type: 'blob' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${guideTitle || 'guia'}.zip`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

            showSuccess('Guía exportada correctamente');
            await onExportComplete();
            onClose();
        } catch (error) {
            console.error('Error al exportar:', error);
            showError('Error al exportar la guía');
        } finally {
            setExporting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-[2rem] shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="px-8 py-6 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-rose-100 text-rose-600 rounded-lg">
                            <Download size={20} />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-slate-900">Exportar Guía</h2>
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-0.5">Configura tu exportación</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all"
                    >
                        <X size={22} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-8 space-y-8">

                    {/* Respuestas */}
                    <div className="space-y-4">
                        <label className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                            <div className="w-4 h-4 bg-rose-500 rounded" />
                            Incluir Respuestas
                        </label>
                        <div className="flex gap-3">
                            <label className="flex items-center gap-3 px-4 py-3 bg-slate-50 border-2 rounded-xl cursor-pointer transition-all hover:border-rose-300"
                                style={{ borderColor: exportOptions.includeAnswers ? '#f43f5e' : '#e2e8f0' }}>
                                <input
                                    type="checkbox"
                                    checked={exportOptions.includeAnswers}
                                    onChange={(e) => setExportOptions({ ...exportOptions, includeAnswers: e.target.checked })}
                                    className="w-5 h-5 cursor-pointer accent-rose-500"
                                />
                                <span className="font-bold text-slate-700">Sí, incluir respuestas</span>
                            </label>
                        </div>
                    </div>

                    {/* Placement de respuestas */}
                    {exportOptions.includeAnswers && (
                        <div className="space-y-4 pl-4 border-l-2 border-amber-300">
                            <label className="text-sm font-black text-slate-900 uppercase tracking-widest">¿Dónde mostrar las respuestas?</label>
                            <div className="space-y-2">
                                <label className="flex items-center gap-3 px-4 py-3 bg-slate-50 border-2 rounded-xl cursor-pointer transition-all"
                                    style={{ borderColor: exportOptions.answerPlacement === 'inline' ? '#f43f5e' : '#e2e8f0' }}>
                                    <input
                                        type="radio"
                                        name="placement"
                                        checked={exportOptions.answerPlacement === 'inline'}
                                        onChange={() => setExportOptions({ ...exportOptions, answerPlacement: 'inline' })}
                                        className="w-5 h-5 cursor-pointer accent-rose-500"
                                    />
                                    <span className="font-bold text-slate-700">En cada ejercicio</span>
                                </label>
                                <label className="flex items-center gap-3 px-4 py-3 bg-slate-50 border-2 rounded-xl cursor-pointer transition-all"
                                    style={{ borderColor: exportOptions.answerPlacement === 'end' ? '#f43f5e' : '#e2e8f0' }}>
                                    <input
                                        type="radio"
                                        name="placement"
                                        checked={exportOptions.answerPlacement === 'end'}
                                        onChange={() => setExportOptions({ ...exportOptions, answerPlacement: 'end' })}
                                        className="w-5 h-5 cursor-pointer accent-rose-500"
                                    />
                                    <span className="font-bold text-slate-700">Al final del documento</span>
                                </label>
                            </div>
                        </div>
                    )}

                    {/* Campos adicionales */}
                    <div className="space-y-4">
                        <label className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                            <div className="w-4 h-4 bg-blue-500 rounded" />
                            Campos Adicionales
                        </label>
                        <div className="space-y-2">
                            <label className="flex items-center gap-3 px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl cursor-pointer hover:border-blue-300 transition-all">
                                <input
                                    type="checkbox"
                                    checked={exportOptions.includeImages}
                                    onChange={(e) => setExportOptions({ ...exportOptions, includeImages: e.target.checked })}
                                    className="w-5 h-5 cursor-pointer accent-blue-500"
                                />
                                <span className="font-bold text-slate-700">Incluir imágenes de ejercicios</span>
                            </label>
                            <label className="flex items-center gap-3 px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl cursor-pointer hover:border-blue-300 transition-all">
                                <input
                                    type="checkbox"
                                    checked={exportOptions.includeDifficulty}
                                    onChange={(e) => setExportOptions({ ...exportOptions, includeDifficulty: e.target.checked })}
                                    className="w-5 h-5 cursor-pointer accent-blue-500"
                                />
                                <span className="font-bold text-slate-700">Mostrar nivel de dificultad</span>
                            </label>
                            <label className="flex items-center gap-3 px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl cursor-pointer hover:border-blue-300 transition-all">
                                <input
                                    type="checkbox"
                                    checked={exportOptions.includeDuration}
                                    onChange={(e) => setExportOptions({ ...exportOptions, includeDuration: e.target.checked })}
                                    className="w-5 h-5 cursor-pointer accent-blue-500"
                                />
                                <span className="font-bold text-slate-700">Mostrar tiempo estimado</span>
                            </label>
                        </div>
                    </div>

                    {/* Info */}
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                        <p className="text-xs font-bold text-blue-700 leading-relaxed">
                            Se generará un archivo <strong>.zip</strong> con el documento LaTeX (.tex) e imágenes en una carpeta <strong>/images</strong>. Puedes compilarlo en cualquier editor LaTeX.
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-8 py-6 border-t border-slate-200 flex gap-3 bg-slate-50/50 sticky bottom-0">
                    <button
                        onClick={onClose}
                        disabled={exporting}
                        className="flex-1 px-6 py-3 bg-white border-2 border-slate-200 text-slate-600 rounded-xl font-black text-sm hover:bg-slate-50 transition-all disabled:opacity-60"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleExport}
                        disabled={exporting}
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-rose-500 text-white rounded-xl font-black text-sm hover:bg-rose-600 transition-all shadow-lg shadow-rose-200 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {exporting ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <Download size={18} />
                        )}
                        {exporting ? 'Exportando...' : 'Exportar'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExportGuideModal;
