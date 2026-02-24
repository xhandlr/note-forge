import React, { useState, useRef, useEffect } from 'react';

export const colorOptions = {
    rose:   { bg: 'bg-rose-100',   text: 'text-rose-700',   border: 'border-rose-200',   solid: 'bg-rose-500' },
    amber:  { bg: 'bg-amber-100',  text: 'text-amber-700',  border: 'border-amber-200',  solid: 'bg-amber-500' },
    slate:  { bg: 'bg-slate-100',  text: 'text-slate-700',  border: 'border-slate-200',  solid: 'bg-slate-500' },
    blue:   { bg: 'bg-blue-100',   text: 'text-blue-700',   border: 'border-blue-200',   solid: 'bg-blue-500' },
    green:  { bg: 'bg-green-100',  text: 'text-green-700',  border: 'border-green-200',  solid: 'bg-green-500' },
    violet: { bg: 'bg-violet-100', text: 'text-violet-700', border: 'border-violet-200', solid: 'bg-violet-500' },
    pink:   { bg: 'bg-pink-100',   text: 'text-pink-700',   border: 'border-pink-200',   solid: 'bg-pink-500' },
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
        <div className="relative self-stretch" ref={pickerRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="h-full px-4 rounded-xl border-2 border-slate-100 bg-slate-50 flex items-center justify-center transition-all hover:border-rose-300"
                title="Seleccionar color"
            >
                <div className={`w-5 h-5 rounded-lg ${colorOptions[selectedColor].solid}`}></div>
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