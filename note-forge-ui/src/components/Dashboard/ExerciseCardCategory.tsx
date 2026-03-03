import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Coffee, Clock, Zap } from 'lucide-react';
import { renderLatex } from '../../utils/latexRenderer';

interface Exercise {
  id: number;
  title: string;
  description: string;
  difficulty?: number;
  duration?: string;
  image_url?: string;
  created_at?: string;
}

interface ExerciseCardCategoryProps {
  exercise: Exercise;
}

const ExerciseCardCategory: React.FC<ExerciseCardCategoryProps> = ({ exercise }) => {
  // Truncate description for preview
  const truncateDescription = (text: string, maxLength: number = 150) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <Link
      to={`/exercise/${exercise.id}`}
      className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden group hover:border-rose-400 hover:shadow-2xl transition-all"
    >
      {/* Image Section */}
      <div className="relative h-48 bg-gradient-to-br from-slate-100 to-slate-50 overflow-hidden">
        {exercise.image_url ? (
          <img
            src={exercise.image_url}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            alt={exercise.title}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-900">
            <Coffee size={48} className="text-white/20" strokeWidth={1.5} />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-4">
        {/* Stats Row */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-slate-900 text-white text-[9px] font-black rounded-lg uppercase tracking-widest">
              Nivel {exercise.difficulty || 'N/A'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {exercise.duration && (
              <span className="flex items-center gap-1 text-slate-500 text-[9px] font-black uppercase tracking-widest">
                <Clock size={12} /> {exercise.duration} min
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-black text-slate-900 group-hover:text-rose-600 transition-colors line-clamp-2">
          {exercise.title}
        </h3>

        {/* Description with LaTeX Rendering */}
        <div
          className="text-slate-600 text-sm leading-relaxed line-clamp-3 prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{
            __html: renderLatex(truncateDescription(exercise.description))
          }}
        />

        {/* Footer with Arrow */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <div className="flex items-center gap-1 text-slate-400 text-[10px] font-black uppercase tracking-widest">
            <Zap size={12} className="text-amber-500" /> Ver Detalles
          </div>
          <div className="p-2 bg-slate-50 rounded-lg text-slate-300 group-hover:text-rose-500 group-hover:bg-rose-50 transition-all">
            <ArrowLeft className="rotate-180" size={18} strokeWidth={3} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ExerciseCardCategory;
