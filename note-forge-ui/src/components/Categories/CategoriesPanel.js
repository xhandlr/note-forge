import React, { useEffect, useState } from "react";
import CategoryOption from "./CategoryOption";
import { getCategories } from "../../services/CategoryService";
import { useNavigate } from 'react-router-dom';
import "../../styles/Categories/Categories.css";
import SearchBar from "../Dashboard/SearchBar";

function CategoriesPanel() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const data = await getCategories();
            setCategories(data);
        };
        fetchCategories();
    }, []);

    const handleDeleteCategory = (id) => {
        setCategories(categories.filter(category => category.id !== id));
    };

    return (
        <div className="categories-wrapper">
            <div className="categories-title">
                <h1>Mis categorías</h1>
                <SearchBar />
            </div>
            {categories.map(category => (
                <CategoryOption 
                    key={category.id} 
                    id={category.id}
                    name={category.name} 
                    description={category.description} 
                    imageUrl={category.image_url} 
                    onDelete={handleDeleteCategory}
                />
            ))}
            <div className="new-category" onClick={() => { navigate("/create-category"); }}>
                <h1 >Nueva categoría</h1>
            </div>
        </div>
    );
}

export default CategoriesPanel;
