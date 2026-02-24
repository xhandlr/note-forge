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
                className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] outline-none focus:ring-4 focus:ring-rose-100 focus:border-rose-400 transition-all font-semibold text-slate-700"
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
                        className={`px-4 py-2 rounded-xl font-black text-sm transition-all border-2 ${
                            value === time.toString()
                                ? "bg-rose-500 text-white border-rose-500 shadow-lg shadow-rose-200"
                                : "bg-white text-slate-900 border-slate-200 hover:border-rose-300"
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