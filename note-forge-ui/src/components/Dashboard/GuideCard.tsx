import React from "react";

interface GuideCardProps {
    title: string;
    status: string;
    subject: string;
}

const GuideCard: React.FC<GuideCardProps> = ({ title, status, subject }) => (
    <div className="bg-white rounded-[2rem] p-6 border border-slate-200 shadow-2xl flex flex-col gap-5 group hover:border-rose-300 transition-all">
        <div className="aspect-[3/4] bg-slate-50 rounded-2xl relative overflow-hidden flex flex-col items-center justify-center p-8 border border-slate-100">
            <div className="w-full space-y-4">
                <div className="h-4 bg-amber-200/40 rounded-full w-4/5" />
                <div className="flex gap-2">
                    <div className="h-10 bg-rose-100/30 rounded-xl w-1/2" />
                    <div className="h-10 bg-rose-100/30 rounded-xl w-1/2" />
                </div>
                <div className="space-y-2">
                    <div className="h-2 bg-slate-100 rounded-full w-full" />
                    <div className="h-2 bg-slate-100 rounded-full w-full" />
                    <div className="h-2 bg-slate-100 rounded-full w-3/4" />
                </div>
                <div className="pt-4 space-y-2">
                    <div className="h-2 bg-amber-100/40 rounded-full w-full" />
                    <div className="h-2 bg-amber-100/40 rounded-full w-5/6" />
                </div>
            </div>
            <div className="absolute inset-0 bg-rose-500/0 group-hover:bg-rose-500/5 transition-colors" />
        </div>
        <div className="space-y-4">
            <h4 className="font-extrabold text-slate-900 text-lg leading-tight line-clamp-2 group-hover:text-rose-600 transition-colors">{title}</h4>
            <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-amber-100 text-amber-700 text-[9px] font-black rounded-lg uppercase tracking-wider border border-amber-200">{status}</span>
                <span className="text-slate-400 text-[10px] font-bold">{subject}</span>
            </div>
        </div>
    </div>
);

export default GuideCard;
