import React from "react";

interface DurationInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function DurationInput({ value, onChange }: DurationInputProps) {
    return (
        <div className="space-y-3">
            <input
                type="number"
                name="duration"
                value={value}
                onChange={onChange}
                min="1"
                step="1"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                placeholder="Escribe los minutos"
            />
            <div className="flex flex-wrap gap-2">
                {[5, 10, 15, 20, 30, 60].map((time) => (
                    <button
                        key={time}
                        type="button"
                        onClick={() =>
                            onChange({
                                target: { name: "duration", value: time.toString() },
                            } as React.ChangeEvent<HTMLInputElement>)
                        }
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            value === time.toString()
                                ? "bg-purple-600 text-white"
                                : "bg-purple-100 text-purple-700 hover:bg-purple-200"
                        }`}
                    >
                        {time} min
                    </button>
                ))}
            </div>
        </div>
    );
}

export default DurationInput;