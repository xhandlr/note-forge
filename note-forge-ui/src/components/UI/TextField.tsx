import React from "react";

interface TextFieldProps {
    type?: string;
    name: string;
    placeholder?: string;
    required?: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    error?: string;
    [key: string]: any; 
}

function TextField({
    type = "text",
    name,
    placeholder,
    required = false,
    onChange, 
    className = "border-2 border-gray-300 rounded-lg p-2 w-4/5 focus:border-gray-500 focus:outline-none transition-colors",
    error,
    ... props
}: TextFieldProps) {
    return (
        <div className='w-full flex flex-col items-center gap-y-2 transition-colors'>
            <input 
                id={name}
                type={type}
                name={name}
                placeholder={placeholder}
                onChange={onChange}
                required={required}
                className={className}
                {...props}
            />
            {error && <p className="text-red-500 text-sm w-4/5 text-left">{error}</p>}
        </div>
    );

}

export default TextField;