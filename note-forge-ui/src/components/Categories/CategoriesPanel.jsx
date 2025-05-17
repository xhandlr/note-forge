import React, { useEffect, useState } from "react";
import CategoryOption from "./CategoryOption";
import { getCategories } from "../../services/CategoryService";
import { useNavigate } from 'react-router-dom';
import "../../styles/Categories/Categories.css";
import SearchBar from "../Dashboard/SearchBar";

function CategoriesPanel() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);  // Estado para las categorías filtradas

    useEffect(() => {
        const fetchCategories = async () => {
            const data = await getCategories();
            setCategories(data);
            setFilteredCategories(data);  // Inicialmente, mostrar todas las categorías
        };
        fetchCategories();
    }, []);

    const handleDeleteCategory = (id) => {
        setCategories(categories.filter(category => category.id !== id));
        setFilteredCategories(filteredCategories.filter(category => category.id !== id));  // Filtrar también las categorías visibles
    };

    const handleSearch = (query) => {
        if (query === "") {
            setFilteredCategories(categories);  // Si no hay texto, mostrar todas las categorías
        } else {
            setFilteredCategories(
                categories.filter(category =>
                    category.name.toLowerCase().includes(query.toLowerCase()) ||  // Filtrar por nombre
                    category.description.toLowerCase().includes(query.toLowerCase())  // Filtrar por descripción
                )
            );
        }
    };

    return (
        <div className="categories-wrapper">
            <div className="categories-title">
                <h1>Mis categorías</h1>
                <SearchBar onSearch={handleSearch} />  {/* Pasar la función handleSearch */}
            </div>
            {filteredCategories.map(category => (
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
                <h1>Nueva categoría</h1>
            </div>
        </div>
    );
}

export default CategoriesPanel;
