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
    className = "w-5 h-5 rounded accent-slate-900",
    strokeWidth = 2.5,
    stroke = "white",
    size = "w-5 h-5",
    label
}: CheckboxProps) {
    return (
        <div className="flex items-center gap-3 pl-2">
            <input
                type="checkbox"
                id={name}
                name={name}
                checked={checked}
                onChange={onChange}
                className={className}
            />
            <label htmlFor={name} className="text-gray-600 font-semibold cursor-pointer">
                {label}
            </label>
        </div>
    );
}

export default Checkbox;