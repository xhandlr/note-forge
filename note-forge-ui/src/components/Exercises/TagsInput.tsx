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
    const [selectedColor, setSelectedColor] = useState<ColorName>('purple');

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
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                />

                <ColorPicker
                    selectedColor={selectedColor}
                    onColorSelect={setSelectedColor}
                />

                <button
                    type="button"
                    onClick={addTag}
                    className="px-6 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 hover:cursor-pointer transition-colors font-medium flex items-center gap-2"
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

            <p className="text-xs text-gray-500">Presiona Enter o haz clic en Agregar para añadir etiquetas</p>
        </div>
    );
}

export default TagsInput;