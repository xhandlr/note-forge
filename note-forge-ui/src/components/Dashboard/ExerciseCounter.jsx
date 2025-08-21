import React from "react";
import coffee from "/src/assets/latte-art.png";

function ExerciseCounter({ 
    imageSrc = coffee, 
    alt = "Latte Art", 
    className = "w-20 h-20 object-cover",
    count = 0
}){
    return (
        <div className="flex flex-row justify-center items-end">
            <div className="flex justify-center items-center gap-4">
                <img src={imageSrc} alt={alt} className={className} />
                <p className="text-gray-800 font-bold text-xl">{count} ejercicios</p>
            </div>
        </div>
    );
}

export default ExerciseCounter;