import React from 'react';

interface Category {
    id: number;
    name: string;
}

interface GuideMetadataProps {
    title: string;
    onTitleChange: (title: string) => void;
    author: string;
    onAuthorChange: (author: string) => void;
    categories: Category[];
    selectedCategories: number[];
    onCategoriesChange: (ids: number[]) => void;
}

const GuideMetadata: React.FC<GuideMetadataProps> = ({
    title,
    onTitleChange,
    author,
    onAuthorChange,
    categories,
    selectedCategories,
    onCategoriesChange
}) => {
    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">Título de la guía</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => onTitleChange(e.target.value)}
                    placeholder="Ej: Guía de Física Cuántica"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
            </div>

            <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">Autor</label>
                <input
                    type="text"
                    value={author}
                    onChange={(e) => onAuthorChange(e.target.value)}
                    placeholder="Tu nombre"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
            </div>

            <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">Asignaturas</label>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                    {categories.map(category => (
                        <label key={category.id} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={selectedCategories.includes(category.id)}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        onCategoriesChange([...selectedCategories, category.id]);
                                    } else {
                                        onCategoriesChange(selectedCategories.filter(id => id !== category.id));
                                    }
                                }}
                                className="w-4 h-4 text-rose-500 rounded"
                            />
                            <span className="text-sm text-slate-700">{category.name}</span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GuideMetadata;
