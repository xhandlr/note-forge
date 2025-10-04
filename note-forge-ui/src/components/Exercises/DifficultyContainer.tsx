import React from "react";

interface DifficultyContainerProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function DifficultyContainer({ value, onChange }: DifficultyContainerProps) {
    return (
        <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((num) => (
                <label
                    key={num}
                    className={`
                        flex items-center justify-center w-12 h-12 border-2 rounded-lg cursor-pointer transition-all
                        ${value === num.toString()
                        ? 'border-purple-600 bg-purple-100 text-purple-700 font-bold'
                        : 'border-gray-300 bg-white text-gray-600 hover:border-purple-400 hover:bg-purple-50'
                    }
                    `}
                >
                    <input
                        type="radio"
                        name="difficulty"
                        value={num}
                        onChange={onChange}
                        required
                        checked={value === num.toString()}
                        className="hidden"
                    />
                    <span className="text-lg">{num}</span>
                </label>
            ))}
        </div>
    );
}

export default DifficultyContainer;