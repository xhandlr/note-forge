import React from "react";
import PropTypes from "prop-types";

interface CategoryCardProps {
    imageSrc?: string | null;
    alt: string;
    bgColor: string;
    title: string;
    description: string;
    exercisesCount?: number;
    guidesCount?: number;
}

function CategoryCard({ imageSrc = null, alt, bgColor, title, description, exercisesCount = 0, guidesCount = 0 }: CategoryCardProps) {

    const src = imageSrc as string;

    return (
        <div className="aspect-square bg-white p-6 rounded-[2rem] shadow-2xl border border-slate-200 flex flex-col gap-3 relative transition-all hover:-translate-y-2 hover:shadow-xl hover:border-rose-300 group cursor-pointer">
            <div className={`w-full h-2/5 flex items-center justify-center ${bgColor} rounded-[1.5rem] shadow-inner`}>
                <img src={src} alt={alt} className="object-contain w-4/5 h-4/5 rounded-xl" />
            </div>
            <h1 className="text-slate-900 text-lg font-black tracking-tight mt-2">{title}</h1>
            <p className="text-slate-600 text-xs font-bold leading-relaxed">{description}</p>
            <div className="flex flex-row text-xs font-black justify-between mt-auto pt-3 border-t border-slate-200">
                <p className="text-rose-500">{exercisesCount} ejercicios</p>
                <p className="text-amber-500">{guidesCount} guías</p>
            </div>
        </div>
    );
}

export default CategoryCard;