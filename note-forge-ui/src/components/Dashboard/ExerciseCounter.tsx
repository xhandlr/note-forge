import React from "react";
import coffee from "/src/assets/latte-art.png";
import {t} from "i18next";

function ExerciseCounter({
    imageSrc = coffee,
    alt = "Latte Art",
    className = "w-24 h-24 object-cover",
    count = 0
}){
    return (
        <div className="bg-slate-50 p-6 rounded-[2rem] shadow-xl border border-slate-200 flex flex-col items-center gap-3 transition-all hover:shadow-2xl hover:-translate-y-2 group">
            <div className="w-16 h-16 bg-white rounded-[1.5rem] flex items-center justify-center shadow-inner border border-slate-100 group-hover:border-rose-200 transition-all">
                <img src={imageSrc} alt={alt} className="w-12 h-12 object-cover rounded-xl" />
            </div>
            <div className="text-center">
                <p className="text-slate-900 font-black text-2xl tracking-tight">
                    {count}
                </p>
                <p className="text-slate-600 font-bold text-xs">
                    {count !== 1 ? t('counter.exercises') : t('counter.exercise')}
                </p>
            </div>
        </div>
    );
}

export default ExerciseCounter;