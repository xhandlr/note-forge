import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Dashboard/Navbar';
import Footer from '../../components/UI/Footer';
import { useExerciseService } from '../../services/ServiceFactory';
import { addGuide, updateGuide, getGuideById } from "../../services/GuideService";
import { FileText, GripVertical, Trash2, Eye, ArrowLeft, Plus, Search, BookOpen, Code, Type, X, Save, Download, Check } from 'lucide-react';
import { useNotification } from '../../contexts/NotificationContext';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import JSZip from 'jszip';

// --- LaTeX rendering helpers ---
function applyTextCommands(text: string): string {
    return text
        .replace(/\\(begin|end)\{document\}/g, '')
        .replace(/\\documentclass(\[.*?\])?\{.*?\}/g, '')
        .replace(/\\usepackage(\[.*?\])?\{.*?\}/g, '')
        .replace(/\\textbf\{([^}]*)\}/g, '<strong>$1</strong>')
        .replace(/\\textit\{([^}]*)\}/g, '<em>$1</em>')
        .replace(/\\underline\{([^}]*)\}/g, '<u>$1</u>')
        .replace(/\\text\{([^}]*)\}/g, '$1')
        .replace(/\\emph\{([^}]*)\}/g, '<em>$1</em>')
        .replace(/\\(section|chapter)\*?\{([^}]*)\}/g, '<strong class="text-lg">$2</strong>')
        .replace(/\\subsection\*?\{([^}]*)\}/g, '<strong>$1</strong>')
        .replace(/\\\\/g, '<br/>')
        .replace(/\\newline/g, '<br/>')
        .replace(/\\par\b/g, '<br/><br/>');
}

function renderLatex(text: string): string {
    if (!text) return '';
    const latexRegex = /(\\(?:\(|\[)[\s\S]*?\\(?:\)|\])|\$\$[\s\S]*?\$\$)/g;
    const segments = text.split(latexRegex);
    let processed = '';
    for (const segment of segments) {
        if (!segment) continue;
        if (segment.startsWith('\\(') || segment.startsWith('\\[') || segment.startsWith('$$')) {
            try {
                const displayMode = segment.startsWith('\\[') || segment.startsWith('$$');
                const content = segment
                    .replace(/^(\\[\(\[]|\$\$)/, '')
                    .replace(/(\\[\)\]]|\$\$)$/, '');
                processed += katex.renderToString(content, { displayMode, throwOnError: false });
            } catch {
                processed += segment;
            }
        } else {
            const escaped = segment
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');
            processed += applyTextCommands(escaped).replace(/\n/g, '<br/>');
        }
    }
    return processed;
}

interface Exercise {
    id: number;
    title: string;
    description: string;
    answer?: string;
    image_url?: string;
    imageUrl?: string;
    difficulty?: number;
    categoryId?: number;
    duration?: string;
}

interface GuideFormProps {
    mode: 'create' | 'edit';
    guideId?: string;
}

const GuideForm: React.FC<GuideFormProps> = ({ mode, guideId }) => {
    const navigate = useNavigate();
    const { showSuccess, showError } = useNotification();
    const exerciseService = useExerciseService();
    const [loading, setLoading] = useState(mode === 'edit');
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
    const [guideExercises, setGuideExercises] = useState<Exercise[]>([]);
    const [guideTitle, setGuideTitle] = useState("");
    const [guideAuthor, setGuideAuthor] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [showPreview, setShowPreview] = useState(false);
    const [previewTab, setPreviewTab] = useState<'render' | 'latex'>('render');
    const [showExportModal, setShowExportModal] = useState(false);
    const [exportOptions, setExportOptions] = useState({
        includeAnswers: true,
        answerPlacement: 'inline' as 'inline' | 'end',
        includeImages: true,
        includeDifficulty: true,
        includeDuration: true,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const exercisesData = await exerciseService.getAll();
                setExercises(exercisesData);
                setFilteredExercises(exercisesData);
            } catch (error) {
                console.error('Error loading exercises:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (mode === 'edit' && guideId) {
            const fetchGuide = async () => {
                try {
                    const data = await getGuideById(guideId);
                    if (data) {
                        setGuideTitle(data.title || '');
                        setGuideAuthor(data.author || '');
                        if (data.exercises) setGuideExercises(data.exercises);
                    }
                    setLoading(false);
                } catch {
                    showError('Error al cargar la guía');
                    setLoading(false);
                }
            };
            fetchGuide();
        }
    }, [mode, guideId]);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        if (!query.trim()) {
            setFilteredExercises(exercises);
        } else {
            setFilteredExercises(exercises.filter(ex =>
                ex.title.toLowerCase().includes(query.toLowerCase())
            ));
        }
    };

    const handleRemoveFromGuide = (id: number) => {
        setGuideExercises(guideExercises.filter(ex => ex.id !== id));
    };

    const handleAddToGuide = (exercise: Exercise) => {
        if (!guideExercises.some(ex => ex.id === exercise.id)) {
            setGuideExercises([...guideExercises, exercise]);
        }
    };

    const handleDragStart = (e: React.DragEvent, id: number) => {
        e.dataTransfer.setData("exerciseId", id.toString());
    };

    const handleDrop = (e: React.DragEvent, targetIndex: number) => {
        e.preventDefault();
        const exerciseId = parseInt(e.dataTransfer.getData("exerciseId"), 10);
        if (!exerciseId) return;

        const fromLibrary = exercises.find(ex => ex.id === exerciseId);
        const fromGuide = guideExercises.find(ex => ex.id === exerciseId);
        if (!fromLibrary && !fromGuide) return;

        let updated = [...guideExercises];
        if (fromLibrary && !guideExercises.some(ex => ex.id === exerciseId)) {
            updated.push(fromLibrary);
        } else if (fromGuide) {
            const draggedIdx = updated.findIndex(ex => ex.id === exerciseId);
            if (draggedIdx !== -1 && targetIndex !== draggedIdx) {
                const [moved] = updated.splice(draggedIdx, 1);
                updated.splice(targetIndex, 0, moved);
            }
        }
        setGuideExercises(updated);
    };

    const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); };

    const generateLatex = () => {
        const imgName = (url: string) => url.split('/').pop() || 'image.png';
        return `\\documentclass{article}
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

${guideExercises.map((ex, idx) => {
    const imgUrl = ex.image_url || ex.imageUrl;
    return `\\section*{${idx + 1}. ${ex.title}}

${ex.description || ''}
${imgUrl ? `\n\\begin{figure}[h]\n\\centering\n\\includegraphics[width=0.8\\textwidth]{images/${imgName(imgUrl)}}\n\\end{figure}\n` : ''}
${ex.answer ? `\n\\subsection*{Resolución}\n\n${ex.answer}` : ''}`;
}).join('\n\n')}

\\end{document}`;
    };

    const handleSave = () => {
        if (!guideTitle.trim()) {
            showError('El título de la guía es obligatorio');
            return;
        }
        setShowExportModal(true);
    };

    const handleSaveAndClose = async () => {
        const guideData = {
            title: guideTitle,
            author: guideAuthor,
            description: generateLatex(),
            exerciseIds: guideExercises.map(ex => ex.id),
        };
        try {
            if (mode === 'edit' && guideId) {
                await updateGuide(guideId, guideData);
                showSuccess('Guía actualizada con éxito!');
            } else {
                await addGuide(guideData);
                showSuccess('Guía creada con éxito!');
            }
            navigate('/dashboard');
        } catch {
            showError('Error al guardar la guía');
        }
    };

    const generateExportLatex = () => {
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
            // Respuestas en cada ejercicio
            content += guideExercises.map((ex, idx) => {
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
            // Respuestas al final
            content += guideExercises.map((ex, idx) => {
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
                content += guideExercises.map((ex, idx) => {
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
            const zip = new JSZip();
            const texContent = generateExportLatex();
            zip.file(`${guideTitle || 'guia'}.tex`, texContent);

            // Agregar imágenes
            if (exportOptions.includeImages) {
                const imagesFolder = zip.folder('images');
                for (const exercise of guideExercises) {
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
            await handleSaveAndClose();
            setShowExportModal(false);
        } catch (error) {
            console.error('Error al exportar:', error);
            showError('Error al exportar la guía');
        }
    };

    const calculateTotalTime = () =>
        guideExercises.reduce((acc, ex) => acc + (parseInt(ex.duration || '0', 10) || 0), 0);

    const calculateAvgDifficulty = () => {
        if (guideExercises.length === 0) return 0;
        const sum = guideExercises.reduce((acc, ex) => acc + (ex.difficulty || 0), 0);
        return Math.round(sum / guideExercises.length);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex flex-col">
                <Navbar />
                <div className="flex items-center justify-center h-screen">
                    <div className="text-center space-y-3">
                        <div className="w-12 h-12 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto" />
                        <p className="text-slate-400 font-black text-sm">Cargando guía...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Navbar />

            <div className="w-[70%] mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
                <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden flex flex-col min-h-[85vh]">

                    {/* Header */}
                    <div className="px-10 py-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
                        <div className="flex items-center gap-5">
                            <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-lg">
                                <FileText size={24} />
                            </div>
                            <div>
                                <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                                    {mode === 'edit' ? 'Editor de Guías' : 'Forjador de Guías'}
                                </h1>
                                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">
                                    Documento ID: #GU-{guideId || '0042'}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="flex items-center gap-2 px-4 py-2 text-slate-400 font-bold hover:text-slate-900 transition-colors"
                        >
                            <ArrowLeft size={18} strokeWidth={2.5} /> Volver al tablero
                        </button>
                    </div>

                    {/* Body */}
                    <div className="flex flex-col lg:flex-row flex-grow">

                        {/* Left — Edición */}
                        <div className="lg:w-2/3 p-10 space-y-12 border-r border-slate-100">

                            <section className="space-y-6">
                                <div className="flex items-center gap-2 text-rose-500">
                                    <Type size={18} strokeWidth={2.5} />
                                    <h2 className="text-sm font-black uppercase tracking-widest">Configuración General</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-400 ml-1">Título de la Guía *</label>
                                        <input
                                            type="text"
                                            value={guideTitle}
                                            onChange={(e) => setGuideTitle(e.target.value)}
                                            placeholder="Ej: Guía #4 - Cinemática"
                                            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-rose-100 focus:border-rose-400 transition-all font-bold text-slate-700"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-400 ml-1">Autor / Institución</label>
                                        <input
                                            type="text"
                                            value={guideAuthor}
                                            onChange={(e) => setGuideAuthor(e.target.value)}
                                            placeholder="Ej: Facultad de Ciencias"
                                            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-rose-100 focus:border-rose-400 transition-all font-bold text-slate-700"
                                        />
                                    </div>
                                </div>
                            </section>

                            <section className="space-y-6 pt-4">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2 text-amber-500">
                                        <GripVertical size={18} strokeWidth={2.5} />
                                        <h2 className="text-sm font-black uppercase tracking-widest">Orden de los Ejercicios</h2>
                                    </div>
                                    <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-black rounded-lg uppercase tracking-widest">
                                        {guideExercises.length} Ejercicios
                                    </span>
                                </div>

                                <div className="space-y-3" onDrop={(e) => handleDrop(e, -1)} onDragOver={handleDragOver}>
                                    {guideExercises.length === 0 ? (
                                        <div className="py-20 text-center border-2 border-dashed border-slate-100 rounded-3xl bg-slate-50/30">
                                            <p className="text-slate-300 font-bold">No hay retos seleccionados aún.</p>
                                        </div>
                                    ) : (
                                        guideExercises.map((item, idx) => (
                                            <div
                                                key={item.id}
                                                draggable
                                                onDragStart={(e) => handleDragStart(e, item.id)}
                                                onDrop={(e) => handleDrop(e, idx)}
                                                onDragOver={handleDragOver}
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
                                                    onClick={() => handleRemoveFromGuide(item.id)}
                                                    className="p-2.5 text-slate-300 hover:text-rose-500 transition-colors"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </section>
                        </div>

                        {/* Right — Biblioteca */}
                        <div className="lg:w-1/3 bg-slate-50/50 flex flex-col overflow-hidden">
                            <div className="p-8 flex-grow flex flex-col gap-6">
                                <div className="flex items-center gap-2 text-slate-900">
                                    <BookOpen size={18} strokeWidth={2.5} />
                                    <h3 className="text-sm font-black uppercase tracking-widest">Biblioteca de Ejercicios</h3>
                                </div>

                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                                    <input
                                        type="text"
                                        placeholder="Buscar retos..."
                                        value={searchQuery}
                                        onChange={(e) => handleSearch(e.target.value)}
                                        className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-rose-100 text-sm font-bold"
                                    />
                                </div>

                                <div className="flex-grow overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                                    {filteredExercises.map(exercise => (
                                        <div
                                            key={exercise.id}
                                            draggable
                                            onDragStart={(e) => handleDragStart(e, exercise.id)}
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
                                                onClick={() => handleAddToGuide(exercise)}
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
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="px-10 py-8 border-t border-slate-100 bg-slate-50/50 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex gap-10">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tiempo de Resolución</span>
                                <span className="text-slate-900 font-black">
                                    {calculateTotalTime() > 0 ? `~ ${calculateTotalTime()} min` : '—'}
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nivel Promedio</span>
                                <div className="flex gap-1 mt-1">
                                    {[...Array(5)].map((_, i) => (
                                        <div key={i} className={`w-2 h-2 rounded-full ${i < calculateAvgDifficulty() ? 'bg-amber-400' : 'bg-slate-200'}`} />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 w-full md:w-auto">
                            <button
                                onClick={() => { setPreviewTab('render'); setShowPreview(true); }}
                                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-black hover:bg-slate-50 transition-all shadow-sm text-sm"
                            >
                                <Eye size={18} /> Vista Previa
                            </button>
                            <button
                                onClick={handleSave}
                                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-10 py-4 bg-rose-500 text-white rounded-2xl font-black shadow-xl shadow-rose-200 hover:bg-rose-600 transition-all active:scale-95 text-sm"
                            >
                                <Download size={18} strokeWidth={3} /> {mode === 'edit' ? 'Actualizar y Exportar' : 'Guardar y Exportar'}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex items-center gap-4 text-slate-400 font-bold text-sm bg-white/50 p-6 rounded-3xl border border-slate-100">
                    <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
                        <BookOpen size={16} />
                    </div>
                    <p>Puedes reordenar los ejercicios arrastrándolos desde el icono de rejilla lateral.</p>
                </div>
            </div>

            <Footer />

            {/* Export Modal */}
            {showExportModal && (
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
                                onClick={() => setShowExportModal(false)}
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
                                onClick={() => { setShowExportModal(false); handleSaveAndClose(); }}
                                className="flex-1 px-6 py-3 bg-white border-2 border-slate-200 text-slate-600 rounded-xl font-black text-sm hover:bg-slate-50 transition-all"
                            >
                                Guardar sin exportar
                            </button>
                            <button
                                onClick={handleExport}
                                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-rose-500 text-white rounded-xl font-black text-sm hover:bg-rose-600 transition-all shadow-lg shadow-rose-200"
                            >
                                <Download size={18} /> Exportar y Guardar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Vista Previa Modal */}
            {showPreview && (
                <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex flex-col">
                    {/* Modal Header */}
                    <div className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between shrink-0">
                        <div className="flex gap-2">
                            <button
                                onClick={() => setPreviewTab('render')}
                                className={`flex items-center gap-2 px-5 py-2 rounded-xl font-black text-sm transition-all ${previewTab === 'render' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}
                            >
                                <Eye size={16} /> Previsualización
                            </button>
                            <button
                                onClick={() => setPreviewTab('latex')}
                                className={`flex items-center gap-2 px-5 py-2 rounded-xl font-black text-sm transition-all ${previewTab === 'latex' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}
                            >
                                <Code size={16} /> Código LaTeX
                            </button>
                        </div>
                        <button
                            onClick={() => setShowPreview(false)}
                            className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all"
                        >
                            <X size={22} strokeWidth={2.5} />
                        </button>
                    </div>

                    {/* Modal Content */}
                    <div className="flex-1 overflow-y-auto">
                        {previewTab === 'render' ? (
                            <div className="max-w-3xl mx-auto py-12 px-6">
                                <div className="bg-white rounded-[2rem] shadow-2xl p-12 md:p-16">
                                    {/* Cover */}
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
                                            {calculateTotalTime() > 0 && <><span>·</span><span>~ {calculateTotalTime()} min</span></>}
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
            )}

            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
            `}</style>
        </div>
    );
};

export default GuideForm;
