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
    className = "w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-slate-900 transition-all",
    error,
    ... props
}: TextFieldProps) {
    return (
        <div className='w-full space-y-2'>
            <input
                id={name}
                type={type}
                name={name}
                placeholder={placeholder}
                onChange={onChange}
                required={required}
                className={error ? className.replace('border-gray-200', 'border-red-500') : className}
                {...props}
            />
            {error && <p className="text-red-500 text-sm font-semibold pl-2">{error}</p>}
        </div>
    );

}

export default TextField;