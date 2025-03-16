import React, { useState } from "react";
import "../../styles/Dashboard/SearchBar.css";

function SearchBar({ onSearch }) {
    const [query, setQuery] = useState("");  // Estado para el texto de búsqueda

    const handleChange = (e) => {
        setQuery(e.target.value);  // Actualiza el texto a medida que el usuario escribe
        onSearch(e.target.value);  // Llama a la función onSearch que se pasa como prop
    };

    return (
        <div className="search-bar">
            <box-icon name="search"></box-icon>
            <input  
                type="text" 
                value={query}
                onChange={handleChange}
                placeholder="Buscar..." 
                className="query"
            />
        </div>
    );
}

export default SearchBar;
