import React from "react";
import "../../styles/Categories/Categories.css";

function CategoryOption({ name, description, imageUrl }) {
    return (
        <div className='category-option'>
            <img src={imageUrl} alt={name} className="category-image" />
            <div className="category-text">
                <h1>{name}</h1>
                <h2>{description}</h2>
            </div>
        </div>
    );
}

export default CategoryOption;
