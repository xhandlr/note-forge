import React from "react";

function CategoryCard({ imageSrc = null, alt, bgColor, title, description, exercisesCount, guidesCount}) {
    return (
        <div className="aspect-square min-h-40 min-w-40 bg-white border border-gray-300 flex flex-col shadow-lg gap-2 relative transition-transform duration-200 hover:scale-105">
            <div className={`w-full h-3/5 flex items-center justify-center ${bgColor}`}>
                <img src={imageSrc} alt={alt} className="object-contain w-4/5 h-4/5" />
            </div>
            <h1 className="text-gray-800 text-lg font-semibold ml-4">{title}</h1>
            <p className="text-gray-600 text-sm ml-4">{description}</p>
            {exercisesCount !== undefined && guidesCount !== undefined && (
                <div className="flex flex-row text-sm text-purple-600 justify-between mx-4 absolute bottom-2 left-0 right-0">
                    <p>{exercisesCount} ejercicios</p>
                    <p>{guidesCount} guías</p>
                </div>
            )}
        </div>
    );
}
export default CategoryCard;
