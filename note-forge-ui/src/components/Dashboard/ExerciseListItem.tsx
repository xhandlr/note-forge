import React from "react";
import { Link } from "react-router-dom";
import { Coffee, MoreVertical, Layers, Edit3, Eye } from "lucide-react";

interface ExerciseListItemProps {
    id?: number;
    title: string;
    subject: string;
    difficulty: number;
    desc: string;
    img: string;
}

const ExerciseListItem: React.FC<ExerciseListItemProps> = ({ id, title, subject, difficulty, desc, img }) => (
    <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden flex flex-col md:flex-row group hover:border-rose-300 transition-all text-left">
        <div className="md:w-1/3 lg:w-1/4 h-48 md:h-auto relative overflow-hidden">
            <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
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
                <p className="text-slate-500 font-medium text-sm leading-relaxed line-clamp-2 max-w-2xl">{desc}</p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 mt-5 pt-5 border-t border-slate-50">
                <div className="flex gap-3">
                    <span className="flex items-center gap-2 text-slate-400 text-[10px] font-bold bg-slate-50 px-3 py-1.5 rounded-xl">
                        <Layers size={12} /> ID: #FX-2023
                    </span>
                    <span className="flex items-center gap-2 text-slate-400 text-[10px] font-bold bg-slate-50 px-3 py-1.5 rounded-xl">
                        <Coffee size={12} /> 15 min
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <Link to={id ? `/exercise/${id}` : '#'} className="flex items-center gap-1.5 px-4 py-2 bg-slate-50 text-slate-500 rounded-xl font-black text-xs hover:bg-slate-900 hover:text-white transition-all">
                        <Eye size={14} /> Ver
                    </Link>
                    <Link to={id ? `/edit-exercise/${id}` : '#'} className="flex items-center gap-1.5 px-4 py-2 bg-rose-50 text-rose-600 rounded-xl font-black text-xs hover:bg-rose-500 hover:text-white transition-all">
                        <Edit3 size={14} /> Editar
                    </Link>
                    <button className="p-2 text-slate-300 hover:text-amber-600 transition-colors">
                        <MoreVertical size={16} />
                    </button>
                </div>
            </div>
        </div>
    </div>
);

export default ExerciseListItem;
