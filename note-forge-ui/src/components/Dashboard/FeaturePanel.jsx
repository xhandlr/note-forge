import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../services/CategoryService"; 
import "../../styles/Dashboard/Dashboard.css";

function FeaturePanel({ user }) {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [pinnedCategories, setPinnedCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const allCategories = await getCategories(); // Obtenemos todas las categorías
                setCategories(allCategories);
                
                // Filtramos las categorías fijadas (isPinned === true o 1)
                const pinned = allCategories.filter(category => category.is_pinned === 1 || category.is_pinned === true);
                setPinnedCategories(pinned);
            } catch (error) {
                console.error("Error al obtener categorías:", error);
            }
        };
        fetchCategories();
    }, []);

    return (
        <div className='feature-menu'>
            <h1>Bienvenido, {user}</h1>
            <div className="feature-buttons">
                <div className="button-container">
                    <button className="categories-button" onClick={() => navigate("/categories")}>
                        Categorías
                    </button>
                </div>
                <div className="button-container">
                    <button className="exercises-button" onClick={() => navigate("/exercises")}>
                        Mis ejercicios
                    </button>
                </div>
                <div className="button-container">
                    <button className="guides-button" onClick={() => navigate("/guides")}>
                        Guías
                    </button>
                </div>
            </div>

            {/* Mostrar categorías fijadas */}
            <h1>Categorías fijadas</h1>
            <div className="pinned-categories">
                {pinnedCategories.length > 0 ? (
                    pinnedCategories.map((category) => (
                        <div key={category.id} className="pinned-category-card">
                            {category.image_url && (
                                <img 
                                    src={category.image_url} 
                                    alt={category.name}
                                    className="pinned-category-image"
                                />
                            )}
                            <p className="pinned-category-name">{category.name}</p>
                        </div>
                    ))
                ) : (
                    <p>No hay categorías fijadas</p>
                )}
            </div>
        </div>
    );
}

export default FeaturePanel;