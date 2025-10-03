import React from 'react';

interface CheckboxProps {
    name?: string;
    checked?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    strokeWidth?: number;
    stroke?: string;
    size?: string;
    label: string;
}

function Checkbox({
    name = "keepLoggedIn",
    checked = false,
    onChange,
    className = "peer sr-only",
    strokeWidth = 2.5,
    stroke = "white",
    size = "w-5 h-5",
    label
}: CheckboxProps) {
    return (
        <div className="w-full flex flex-col items-center">
            <label className="flex items-center gap-2 cursor-pointer">
                <input 
                    type="checkbox"
                    name={name}
                    checked={checked}
                    onChange={onChange}
                    className={className}
                />
                <span className={`w-7 h-7 flex items-center justify-center rounded border border-gray-400 transition 
                    ${checked ? "bg-pink-600 border-pink-600" : "bg-white"}`}>
                    {checked && (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={strokeWidth}
                            stroke={stroke}
                            className={size}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                    )}
                </span>
                <span className="text-gray-700">{label}</span>
            </label>
        </div>
    );
}

export default Checkbox;