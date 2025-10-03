import React from 'react';

interface SelectProps {
    name: string;
    required?: boolean;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    value: string;
    className?: string;
    options: { value: string; label: string }[];
    error?: string;
}

function Select({ 
    name, 
    required = false, 
    onChange, 
    value, 
    className = "border-2 border-gray-300 rounded-lg p-2 w-4/5 focus:border-gray-500 focus:outline-none transition-colors", 
    options = [], 
    error = '' 
}: SelectProps ) {
   return (
        <div className="w-full flex flex-col items-center gap-y-2">
            <select 
                name={name} 
                required={required} 
                onChange={onChange}
                value={value}
                className={className}
            >
                <option value="" disabled>Selecciona una opción</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <p className="error text-red-500 text-sm w-4/5 text-left">{error}</p>}
        </div>
    );
}

export default Select;