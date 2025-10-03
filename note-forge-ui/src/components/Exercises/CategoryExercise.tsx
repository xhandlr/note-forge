import React, { useEffect, useState } from "react";
import { getCategories } from "../../services/CategoryService";

function CategoryExercise({ value, onChange }) {
    const [categories, setCategories] = useState([]);

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
        <div>
            <label>Categoría</label>
            <select
                className="category-exercise"
                name="categoryId" 
                value={value} 
                onChange={onChange} 
                required
            >
                <option value="">Selecciona una categoría</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default CategoryExercise;
