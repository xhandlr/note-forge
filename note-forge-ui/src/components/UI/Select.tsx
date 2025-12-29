import React from 'react';
import { useTranslation } from 'react-i18next';

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
    className = "w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-slate-900 transition-all appearance-none cursor-pointer",
    options = [],
    error = ''
}: SelectProps ) {
    const { t } = useTranslation();

   return (
        <div className="w-full space-y-2">
            <select
                name={name}
                required={required}
                onChange={onChange}
                value={value}
                className={className}
            >
                <option value="" disabled>{t('select.description')}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <p className="text-red-500 text-sm font-semibold pl-2">{error}</p>}
        </div>
    );
}

export default Select;