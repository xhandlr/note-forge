import React from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Edit3, Trash2 } from "lucide-react";
import PDFPreview from "../Guides/PDFPreview";
import { useTranslation } from "react-i18next";

interface GuideCardProps {
    id: number;
    title: string;
    status?: string;
    subject?: string;
    exerciseCount?: number;
    exercises?: any[];
    navigateState?: Record<string, any>;
    onEdit?: () => void;
    onDelete?: () => void;
}

const GuideCard: React.FC<GuideCardProps> = ({ id, title, subject, exerciseCount, exercises, navigateState, onEdit, onDelete }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div
            onClick={() => navigate(`/guide/${id}`, navigateState ? { state: navigateState } : undefined)}
            className="bg-white rounded-[2rem] p-6 border border-slate-200 shadow-2xl flex flex-col gap-5 group hover:border-rose-300 transition-all cursor-pointer"
        >
            <div className="aspect-[3/4] bg-white rounded-2xl relative overflow-hidden border border-slate-200 shadow-inner">
                <div className="w-full h-full overflow-hidden bg-slate-50" style={{transform: 'scale(0.38)', transformOrigin: 'top left', width: '263%', height: '263%'}}>
                    <PDFPreview
                        title={title}
                        author={subject}
                        exercises={exercises && exercises.length > 0 ? exercises.slice(0, 3) : []}
                        showAnswers={false}
                        showDifficulty={false}
                        showDuration={false}
                        showImages={false}
                    />
                </div>
            </div>
            <div className="space-y-3">
                <h4 className="font-extrabold text-slate-900 text-lg leading-tight line-clamp-2 group-hover:text-rose-600 transition-colors">{title}</h4>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-slate-400 text-sm font-bold">
                        <BookOpen size={11} />
                        {exerciseCount ?? 0} {t('guide-card.exercise', { count: exerciseCount ?? 0 })}
                    </div>
                    {(onEdit || onDelete) && (
                        <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                            {onEdit && (
                                <button
                                    onClick={e => { e.stopPropagation(); onEdit(); }}
                                    className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
                                    title={t('common.edit')}
                                >
                                    <Edit3 size={16} />
                                </button>
                            )}
                            {onDelete && (
                                <button
                                    onClick={e => { e.stopPropagation(); onDelete(); }}
                                    className="p-2 rounded-xl hover:bg-rose-50 text-slate-400 hover:text-rose-500 transition-colors"
                                    title={t('common.delete')}
                                >
                                    <Trash2 size={16} />
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GuideCard;
