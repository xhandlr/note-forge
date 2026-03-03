import React from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen } from "lucide-react";
import PDFPreview from "../Guides/PDFPreview";

interface GuideCardProps {
    id: number;
    title: string;
    status?: string;
    subject?: string;
    exerciseCount?: number;
    exercises?: any[];
}

const GuideCard: React.FC<GuideCardProps> = ({ id, title, subject, exerciseCount, exercises }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/guide/${id}`)}
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
                        {exerciseCount ?? 0} ejercicio{(exerciseCount ?? 0) !== 1 ? 's' : ''}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GuideCard;
