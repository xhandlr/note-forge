import React, { useState } from 'react';
import ColorPicker, { colorOptions, ColorName } from './ColorPicker';

interface TagsInputProps {
    value?: Tag[];
    onChange: (tags: Tag[]) => void;
}

interface Tag {
    text: string;
    color: string;
}

function TagsInput({ value = [], onChange }: TagsInputProps) {
    const [currentTag, setCurrentTag] = useState('');
    const [selectedColor, setSelectedColor] = useState<ColorName>('rose');

    const addTag = () => {
        const newTag = currentTag.trim();

        if (newTag && !value.some(tag => tag.text === newTag)) {
            const tagWithColor: Tag = {
                text: newTag,
                color: selectedColor
            };
            onChange([...value, tagWithColor]);
            setCurrentTag('');
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            addTag();
        }
    };

    const removeTag = (index: number) => {
        onChange(value.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-3">
            <div className="flex gap-2">
                <input
                    type="text"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Agregar etiqueta"
                    className="flex-1 px-5 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl outline-none focus:ring-4 focus:ring-rose-100 focus:border-rose-400 transition-all font-semibold text-slate-700"
                />

                <ColorPicker
                    selectedColor={selectedColor}
                    onColorSelect={setSelectedColor}
                />

                <button
                    type="button"
                    onClick={addTag}
                    className="px-6 py-3 bg-slate-900 text-white rounded-xl hover:bg-rose-500 cursor-pointer transition-all font-black text-sm flex items-center gap-2 shadow-md"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Agregar
                </button>
            </div>

            {value.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {value.map((tag, index) => {
                        const colors = colorOptions[tag.color as ColorName];
                        return (
                            <span
                                key={index}
                                className={`inline-flex items-center gap-1 px-3 py-1 ${colors.bg} ${colors.text} rounded-full text-sm font-medium border ${colors.border}`}
                            >
                                {tag.text}
                                <button
                                    type="button"
                                    onClick={() => removeTag(index)}
                                    className="hover:opacity-70 rounded-full p-0.5 transition-opacity"
                                >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </span>
                        );
                    })}
                </div>
            )}

            <p className="text-xs text-slate-400 font-semibold ml-1">Presiona Enter o clic en Agregar para añadir etiquetas</p>
        </div>
    );
}

export default TagsInput;