import React, { useState } from 'react';

interface TagsInputProps {
    value?: string[];
    onChange: (tags: string[]) => void;
}

function TagsInput({ value = [], onChange }: TagsInputProps) {
    const [currentTag, setCurrentTag] = useState('');

    const addTag = () => {
        const newTag = currentTag.trim();

        if (newTag && !value.includes(newTag)) {
            onChange([...value, newTag]);
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
                <button
                    type="button"
                    onClick={addTag}
                    className="px-6 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-700 hover:text-white transition-colors font-medium flex items-center gap-2"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Agregar
                </button>
            </div>

            {value.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {value.map((tag, index) => (
                        <span
                            key={index}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                        >
                            {tag}
                            <button
                                type="button"
                                onClick={() => removeTag(index)}
                                className="hover:bg-purple-200 rounded-full p-0.5 transition-colors"
                            >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </span>
                    ))}
                </div>
            )}

            <p className="text-xs text-gray-500">Presiona Enter o haz clic en Agregar para añadir etiquetas</p>
        </div>
    );
}

export default TagsInput;