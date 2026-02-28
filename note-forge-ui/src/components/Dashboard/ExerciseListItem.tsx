import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Coffee, MoreVertical, Layers, Edit3, Eye } from "lucide-react";
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

interface Tag {
    text: string;
    color: string;
}

interface ExerciseListItemProps {
    id?: number;
    title: string;
    subject: string;
    difficulty: number;
    desc: string;
    img: string;
    duration?: string;
    tags?: Tag[];
    onDelete?: () => void;
}

const ExerciseListItem: React.FC<ExerciseListItemProps> = ({ id, title, subject, difficulty, desc, img, duration, tags = [], onDelete }) => {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showAllTags, setShowAllTags] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const displayedTags = showAllTags ? tags : tags.slice(0, 2);
    const hasMoreTags = tags.length > 2;

    const getTagBgColor = (color: string) => {
        const colorMap: { [key: string]: string } = {
            'rose': 'bg-rose-50',
            'amber': 'bg-amber-50',
            'slate': 'bg-slate-50',
            'blue': 'bg-blue-50',
            'green': 'bg-green-50',
            'violet': 'bg-violet-50',
            'pink': 'bg-pink-50',
        };
        return colorMap[color] || 'bg-slate-50';
    };

    const getTagTextColor = (color: string) => {
        const colorMap: { [key: string]: string } = {
            'rose': 'text-rose-700',
            'amber': 'text-amber-700',
            'slate': 'text-slate-700',
            'blue': 'text-blue-700',
            'green': 'text-green-700',
            'violet': 'text-violet-700',
            'pink': 'text-pink-700',
        };
        return colorMap[color] || 'text-slate-700';
    };

    useEffect(() => {
        if (!showMenu) return;
        const handler = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setShowMenu(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [showMenu]);

    return (
        <>
            <div
                className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden flex flex-col md:flex-row group hover:border-rose-300 transition-all text-left cursor-pointer"
                onClick={() => id && navigate(`/exercise/${id}`)}
            >
                <div className="md:w-1/3 lg:w-1/4 h-48 md:h-auto relative overflow-hidden">
                    {img ? (
                        <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    ) : (
                        <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                            <Coffee size={40} className="text-white/20" strokeWidth={1.5} />
                        </div>
                    )}
                    <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors" />
                    <div className="absolute top-4 left-4">
                        <span className="px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-900 border border-white/20 shadow-lg">
                            {subject}
                        </span>
                    </div>
                </div>
                <div className="flex-grow p-6 lg:p-7 flex flex-col justify-between">
                    <div className="space-y-3">
                        <div className="flex justify-between items-start">
                            <h3 className="text-lg font-black text-slate-900 tracking-tight group-hover:text-rose-600 transition-colors">{title}</h3>
                            <div className="flex gap-1.5">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < difficulty ? 'bg-amber-400' : 'bg-slate-100'}`} />
                                ))}
                            </div>
                        </div>
                        <div
                            className="text-slate-500 font-medium text-sm leading-relaxed line-clamp-2 max-w-2xl"
                            dangerouslySetInnerHTML={{ __html: renderLatex(desc) }}
                        />
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 mt-5 pt-5 border-t border-slate-50">
                        <div className="flex flex-wrap items-center gap-2">
                            {duration && (
                                <span className="flex items-center gap-1.5 text-slate-500 text-xs font-bold bg-slate-50 px-3 py-1.5 rounded-xl">
                                    <Coffee size={12} /> {duration} min
                                </span>
                            )}
                            {displayedTags.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 items-center">
                                    {displayedTags.map((tag, idx) => (
                                        <span
                                            key={idx}
                                            className={`px-2.5 py-1 rounded-lg text-xs font-black ${getTagBgColor(tag.color)} ${getTagTextColor(tag.color)}`}
                                        >
                                            {tag.text}
                                        </span>
                                    ))}
                                    {hasMoreTags && !showAllTags && (
                                        <button
                                            onClick={() => setShowAllTags(true)}
                                            className="text-xs font-black text-slate-400 hover:text-slate-600 transition-colors px-2 py-1"
                                        >
                                            +{tags.length - 2} más
                                        </button>
                                    )}
                                    {showAllTags && hasMoreTags && (
                                        <button
                                            onClick={() => setShowAllTags(false)}
                                            className="text-xs font-black text-slate-400 hover:text-slate-600 transition-colors px-2 py-1"
                                        >
                                            Ver menos
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="flex items-center gap-2">
                            <Link
                                to={id ? `/exercise/${id}` : '#'}
                                onClick={e => e.stopPropagation()}
                                className="flex items-center gap-1.5 px-4 py-2 bg-slate-50 text-slate-500 rounded-xl font-black text-xs hover:bg-slate-900 hover:text-white transition-all"
                            >
                                <Eye size={14} /> Ver
                            </Link>
                            <Link
                                to={id ? `/edit-exercise/${id}` : '#'}
                                onClick={e => e.stopPropagation()}
                                className="flex items-center gap-1.5 px-4 py-2 bg-rose-50 text-rose-600 rounded-xl font-black text-xs hover:bg-rose-500 hover:text-white transition-all"
                            >
                                <Edit3 size={14} /> Editar
                            </Link>
                            {/* 3-dots + dropdown */}
                            <div className="relative" ref={menuRef}>
                                <button
                                    className="p-2 text-slate-300 hover:text-rose-500 transition-colors"
                                    onClick={e => { e.stopPropagation(); setShowMenu(v => !v); }}
                                >
                                    <MoreVertical size={16} />
                                </button>
                                {showMenu && (
                                    <div className="absolute bottom-full right-0 mb-2 z-50 bg-white rounded-xl shadow-2xl border border-slate-100 py-1 min-w-[120px] overflow-hidden">
                                        <button
                                            className="w-full text-left px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 font-black transition-colors"
                                            onClick={e => { e.stopPropagation(); setShowMenu(false); setShowConfirm(true); }}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showConfirm && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100]"
                    onClick={() => setShowConfirm(false)}
                >
                    <div
                        className="bg-white rounded-[2rem] p-8 max-w-sm w-full mx-4 shadow-2xl"
                        onClick={e => e.stopPropagation()}
                    >
                        <h2 className="text-xl font-black text-slate-900 mb-2">¿Estás seguro?</h2>
                        <p className="text-slate-500 text-sm font-medium mb-8">Esta acción eliminará el ejercicio permanentemente.</p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="flex-1 py-3 rounded-[1.5rem] border-2 border-slate-200 text-slate-600 font-black text-sm hover:bg-slate-50 transition-all"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => { setShowConfirm(false); onDelete?.(); }}
                                className="flex-1 py-3 rounded-[1.5rem] bg-rose-500 text-white font-black text-sm hover:bg-rose-600 transition-all shadow-xl shadow-rose-200"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ExerciseListItem;
