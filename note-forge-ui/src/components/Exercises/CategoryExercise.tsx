import React, { useEffect, useState } from "react";
import { getCategories } from "../../services/CategoryService";

interface CategoryExerciseProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

interface Category {
    id: number; // depende de tu API: ¿es string o número?
    name: string;
}

function CategoryExercise({ value, onChange }: CategoryExerciseProps) {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                setCategories(data);
            } catch (error) {
                console.error("Error al obtener categorías:", error);
            }
        };
        fetchCategories();
    }, []);

    return (
        <select
            name="categoryId"
            value={value}
            onChange={onChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all bg-white"
        >
            <option value="">Selecciona una categoría</option>
            {categories.map((category) => (
                <option key={category.id} value={category.id}>
                    {category.name}
                </option>
            ))}
        </select>
    );
}

export default CategoryExercise;