import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MoreVertical, Pin, Edit3 } from "lucide-react";

export interface SubjectCardProps {
    id?: number;
    title: string;
    exercises: number;
    guides: number;
    icon: React.ReactNode;
    pinned?: number | boolean;
    imageSrc?: string | null;
    onTogglePin?: (e: React.MouseEvent) => void;
    onDelete?: () => void;
}

const SubjectCard: React.FC<SubjectCardProps> = ({ id, title, exercises, guides, icon, pinned, imageSrc, onTogglePin, onDelete }) => {
    const navigate = useNavigate();
    const isPinned = !!pinned;
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

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
        <div className="relative group">
            <Link to={id ? `/category/${id}` : '#'} className="bg-white rounded-[2rem] overflow-hidden border border-slate-200 shadow-2xl transition-all hover:shadow-xl hover:-translate-y-1 block">
                <div
                    className="h-40 bg-slate-900 relative overflow-hidden flex items-center justify-center"
                    style={imageSrc ? { backgroundImage: `url(${imageSrc})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
                >
                    {!imageSrc && (
                        <div className="text-white/30 transform group-hover:scale-110 transition-transform duration-700">
                            {icon}
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />

                    {/* Pin button — oculto hasta hover */}
                    <button
                        className={`absolute top-3 left-3 z-20 p-2 rounded-xl transition-all shadow-lg opacity-0 group-hover:opacity-100 ${
                            isPinned
                                ? 'bg-amber-500 text-white hover:bg-amber-600'
                                : 'bg-white/20 backdrop-blur-md text-white hover:bg-amber-500'
                        }`}
                        title={isPinned ? 'Desfijar asignatura' : 'Fijar asignatura'}
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); onTogglePin?.(e); }}
                    >
                        <Pin size={14} fill={isPinned ? 'white' : 'none'} />
                    </button>

                    <div className="absolute top-3 right-3 z-20 flex gap-2">
                        <button
                            className="bg-white/20 backdrop-blur-md text-white p-2 hover:bg-rose-500 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                            title="Editar Asignatura"
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigate(id ? `/edit-category/${id}` : '#'); }}
                        >
                            <Edit3 size={16} />
                        </button>
                        <button
                            className="bg-white/20 backdrop-blur-md text-white p-2 hover:bg-white/40 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowMenu(v => !v); }}
                        >
                            <MoreVertical size={18} />
                        </button>
                    </div>
                    <div className="absolute bottom-4 left-4 text-white z-10">
                        <h3 className="text-xl font-extrabold tracking-tight">{title}</h3>
                    </div>
                </div>
                <div className="p-6 flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Contenido disponible</span>
                        <div className="flex gap-3">
                            <span className="text-amber-600 font-bold text-sm">{exercises} Ejercicios</span>
                            <span className="text-rose-600 font-bold text-sm">{guides} Guías</span>
                        </div>
                    </div>
                </div>
            </Link>

            {/* Dropdown menu — fuera del overflow-hidden de la card */}
            {showMenu && (
                <div
                    ref={menuRef}
                    className="absolute top-12 right-3 z-50 bg-white rounded-xl shadow-2xl border border-slate-100 py-1 min-w-[140px] overflow-hidden"
                >
                    <button
                        className="w-full text-left px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 font-black transition-colors"
                        onClick={(e) => { e.stopPropagation(); setShowMenu(false); onDelete?.(); }}
                    >
                        Eliminar
                    </button>
                </div>
            )}
        </div>
    );
};

export default SubjectCard;
