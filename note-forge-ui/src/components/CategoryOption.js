import React from "react";
import "../styles/Categories.css";

function CategoryOption({ name, description }) {
    return (
        <div className='category-option'>
            <h1>{name}</h1>
            <h2>{description}</h2>
        </div>
    );
}

export default CategoryOption;