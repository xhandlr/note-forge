import React, { useEffect, useState } from "react";
import CategoryOption from "./CategoryOption";
import { getCategories } from "../services/CategoryService";
import "../styles/Categories.css";

function Categories() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const data = await getCategories();
            setCategories(data);
        };
        fetchCategories();
    }, []);

    return (
        <div className="categories-wrapper">
            {categories.map(category => (
                <CategoryOption key={category.id} name={category.name} />
            ))}
            <div className="option-buttons">
                <button>Crear</button>
                <button>Editar</button>
                <button>Ver</button>
                <button>Eliminar</button>
            </div>
        </div>
    );
}

export default Categories;
