import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit3, Eye, Code, Download, FileText, BookOpen, Clock, Package } from 'lucide-react';
import { getGuideById } from '../../services/GuideService';
import Navbar from '../../components/Dashboard/Navbar';
import Footer from '../../components/UI/Footer';
import { useNotification } from '../../contexts/NotificationContext';
import ExportGuideModal from '../../components/Guides/ExportGuideModal';
import katex from 'katex';
import 'katex/dist/katex.min.css';

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
    duration?: string;
}

interface Guide {
    id: number;
    title: string;
    author?: string;
    exercises?: Exercise[];
    exercise_count?: number;
    categories?: Array<{ id: number; name: string }>;
}

const GuideView: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { showSuccess, showError } = useNotification();
    const [guide, setGuide] = useState<Guide | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'render' | 'latex'>('render');
    const [showExportModal, setShowExportModal] = useState(false);

    useEffect(() => {
        if (!id) return;
        getGuideById(id)
            .then((data: Guide) => setGuide(data))
            .catch(() => { showError('Error al cargar la guía'); setGuide(null); })
            .finally(() => setLoading(false));
    }, [id]);

    const exercises = guide?.exercises ?? [];

    const calculateTotalTime = () =>
        exercises.reduce((acc, ex) => acc + (parseInt(ex.duration || '0', 10) || 0), 0);

    const calculateAvgDifficulty = () => {
        if (exercises.length === 0) return 0;
        return Math.round(exercises.reduce((acc, ex) => acc + (ex.difficulty || 0), 0) / exercises.length);
    };

    const generateLatex = () => {
        const imgName = (url: string) => url.split('/').pop() || 'image.png';
        return `\\documentclass{article}
\\usepackage{amsmath}
\\usepackage{graphicx}
\\usepackage[utf8]{inputenc}
\\usepackage[T1]{fontenc}
\\usepackage[spanish]{babel}

\\title{${guide?.title || 'Guía de Ejercicios'}}
\\author{${guide?.author || 'Autor'}}
\\date{\\today}

\\begin{document}

\\maketitle

${exercises.map((ex, idx) => {
    const imgUrl = ex.image_url || ex.imageUrl;
    return `\\section*{${idx + 1}. ${ex.title}}

${ex.description || ''}
${imgUrl ? `\n\\begin{figure}[h]\n\\centering\n\\includegraphics[width=0.8\\textwidth]{images/${imgName(imgUrl)}}\n\\end{figure}\n` : ''}
${ex.answer ? `\n\\subsection*{Resolución}\n\n${ex.answer}` : ''}`;
}).join('\n\n')}

\\end{document}`;
    };

    const handleExportComplete = async () => {
        // No need to do anything after export in GuideView
        // The modal handles everything
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex flex-col">
                <Navbar />
                <div className="flex items-center justify-center flex-1 mt-16 lg:mt-20">
                    <div className="text-center space-y-3">
                        <div className="w-12 h-12 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto" />
                        <p className="text-slate-400 font-black text-sm">Cargando guía...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!guide) {
        return (
            <div className="min-h-screen bg-white flex flex-col">
                <Navbar />
                <div className="flex items-center justify-center flex-1 mt-16 lg:mt-20">
                    <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto">
                            <FileText size={28} className="text-slate-200" />
                        </div>
                        <p className="text-slate-400 font-black">Guía no encontrada</p>
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="px-5 py-2.5 bg-slate-900 text-white rounded-xl font-black text-sm hover:bg-rose-500 transition-all"
                        >
                            Volver al inicio
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const totalTime = calculateTotalTime();
    const avgDiff = calculateAvgDifficulty();

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Navbar />

            {/* Offset para la Navbar fija: h-16 móvil, h-20 desktop */}
            <div className="mt-16 lg:mt-20 flex flex-col flex-1">

                {/* Sticky Action Bar — se pega justo bajo la Navbar */}
                <div className="sticky top-16 lg:top-20 z-40 bg-white border-b border-slate-100 shadow-sm">
                    <div className="w-[70%] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 min-w-0">
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="flex items-center gap-1.5 text-slate-400 hover:text-slate-900 font-bold text-sm transition-colors shrink-0"
                            >
                                <ArrowLeft size={16} strokeWidth={2.5} /> Inicio
                            </button>
                            <span className="text-slate-200 shrink-0">/</span>
                            <h1 className="font-black text-slate-900 text-sm truncate">{guide.title}</h1>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                            <button
                                onClick={() => setShowExportModal(true)}
                                className="flex items-center gap-1.5 px-4 py-2 bg-amber-500 text-white rounded-xl font-black text-xs hover:bg-amber-600 transition-all"
                            >
                                <Package size={13} />
                                Exportar ZIP
                            </button>
                            <button
                                onClick={() => navigate(`/edit-guide/${id}`)}
                                className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white rounded-xl font-black text-xs hover:bg-rose-500 transition-all"
                            >
                                <Edit3 size={13} /> Editar
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats + Tabs */}
                <div className="w-[70%] mx-auto px-4 sm:px-6 lg:px-8 py-5">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex flex-col gap-3 flex-1">
                            <div className="flex items-center gap-5 flex-wrap">
                                <div className="flex items-center gap-1.5 text-slate-500 text-sm font-bold">
                                    <BookOpen size={14} className="text-slate-400" />
                                    {exercises.length} ejercicio{exercises.length !== 1 ? 's' : ''}
                                </div>
                                {totalTime > 0 && (
                                    <div className="flex items-center gap-1.5 text-slate-500 text-sm font-bold">
                                        <Clock size={14} className="text-slate-400" />
                                        ~ {totalTime} min
                                    </div>
                                )}
                                {avgDiff > 0 && (
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <div key={i} className={`w-2 h-2 rounded-full ${i < avgDiff ? 'bg-amber-400' : 'bg-slate-200'}`} />
                                        ))}
                                    </div>
                                )}
                            </div>
                            {guide.categories && guide.categories.length > 0 && (
                                <div className="flex items-center gap-2 flex-wrap">
                                    {guide.categories.map(cat => (
                                        <span key={cat.id} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-bold">
                                            {cat.name}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="flex gap-1 bg-slate-50 p-1 rounded-xl border border-slate-100">
                            <button
                                onClick={() => setActiveTab('render')}
                                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-black text-xs transition-all ${activeTab === 'render' ? 'bg-white text-slate-900 shadow-sm border border-slate-100' : 'text-slate-400 hover:text-slate-700'}`}
                            >
                                <Eye size={13} /> Previsualización
                            </button>
                            <button
                                onClick={() => setActiveTab('latex')}
                                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-black text-xs transition-all ${activeTab === 'latex' ? 'bg-white text-slate-900 shadow-sm border border-slate-100' : 'text-slate-400 hover:text-slate-700'}`}
                            >
                                <Code size={13} /> Código LaTeX
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 pb-16">
                    {activeTab === 'render' ? (
                        <div className="w-[70%] mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 p-12 md:p-16">
                                {/* Cover */}
                                <div className="text-center border-b border-slate-100 pb-8 mb-10 space-y-2">
                                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-500">Note Forge</p>
                                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">{guide.title}</h1>
                                    {guide.author && (
                                        <p className="text-slate-500 font-semibold text-sm">{guide.author}</p>
                                    )}
                                    <div className="flex items-center justify-center gap-4 pt-2 text-xs text-slate-400 font-bold">
                                        <span>{exercises.length} ejercicio{exercises.length !== 1 ? 's' : ''}</span>
                                        {totalTime > 0 && <><span>·</span><span>~ {totalTime} min</span></>}
                                    </div>
                                </div>

                                {exercises.length === 0 ? (
                                    <p className="text-center text-slate-300 font-semibold italic py-12">
                                        Esta guía no tiene ejercicios aún.
                                    </p>
                                ) : (
                                    <div className="space-y-12">
                                        {exercises.map((ex, idx) => {
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
                        <div className="w-[70%] mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="bg-slate-900 rounded-[2rem] p-8 font-mono text-sm text-slate-300 shadow-2xl border border-slate-800 overflow-x-auto">
                                <pre className="whitespace-pre-wrap leading-relaxed">{generateLatex()}</pre>
                            </div>
                        </div>
                    )}
                </div>

            </div>

            {/* Export Modal */}
            <ExportGuideModal
                isOpen={showExportModal}
                onClose={() => setShowExportModal(false)}
                onExportComplete={handleExportComplete}
                guideTitle={guide?.title || 'Guía'}
                guideAuthor={guide?.author}
                exercises={exercises}
            />

            <Footer />
        </div>
    );
};

export default GuideView;
