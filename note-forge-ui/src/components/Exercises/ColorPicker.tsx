import React, { useState, useRef, useEffect } from 'react';

export const colorOptions = {
    purple: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-200', solid: 'bg-purple-500' },
    blue: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200', solid: 'bg-blue-500' },
    green: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200', solid: 'bg-green-500' },
    yellow: { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-200', solid: 'bg-yellow-500' },
    red: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200', solid: 'bg-red-500' },
    indigo: { bg: 'bg-indigo-100', text: 'text-indigo-700', border: 'border-indigo-200', solid: 'bg-indigo-500' },
    pink: { bg: 'bg-pink-100', text: 'text-pink-700', border: 'border-pink-200', solid: 'bg-pink-500' },
};

export type ColorName = keyof typeof colorOptions;

interface ColorPickerProps {
    selectedColor: ColorName;
    onColorSelect: (color: ColorName) => void;
}

function ColorPicker({ selectedColor, onColorSelect }: ColorPickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const pickerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleColorSelect = (color: ColorName) => {
        onColorSelect(color);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={pickerRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center transition-all hover:border-gray-400"
                title="Seleccionar color"
            >
                <div className={`w-6 h-6 rounded ${colorOptions[selectedColor].solid}`}></div>
            </button>

            {isOpen && (
                <div className="absolute top-12 left-0 bg-white rounded-lg shadow-xl border border-gray-200 p-3 z-20 w-40">
                    <div className="grid grid-cols-3 gap-3">
                        {Object.entries(colorOptions).map(([colorName, colors]) => (
                            <button
                                key={colorName}
                                type="button"
                                onClick={() => handleColorSelect(colorName as ColorName)}
                                className={`w-10 h-10 rounded-lg ${colors.solid} transition-all hover:scale-110 ${
                                    selectedColor === colorName ? 'ring-2 ring-gray-700 ring-offset-2' : ''
                                }`}
                                title={colorName}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ColorPicker;