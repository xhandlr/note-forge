import React from 'react';

interface Category {
    id: number;
    name: string;
}

interface ExerciseCategorySelectProps {
    categories: Category[];
    selectedCategories: number[];
    onCategoriesChange: (ids: number[]) => void;
}

const ExerciseCategorySelect: React.FC<ExerciseCategorySelectProps> = ({
    categories,
    selectedCategories,
    onCategoriesChange
}) => {
    const handleToggle = (id: number) => {
        if (selectedCategories.includes(id)) {
            onCategoriesChange(selectedCategories.filter(c => c !== id));
        } else {
            onCategoriesChange([...selectedCategories, id]);
        }
    };

    return (
        <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-900">Asignaturas / Categorías</label>
            <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                {categories.map(category => (
                    <label key={category.id} className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={selectedCategories.includes(category.id)}
                            onChange={() => handleToggle(category.id)}
                            className="w-4 h-4 text-rose-500 rounded"
                        />
                        <span className="text-sm text-slate-700">{category.name}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default ExerciseCategorySelect;
