import React from "react";
import "../styles/Categories.css";

function CategoryOption({ name }) {
    return (
        <div className='category-option'>
            <h1>{name}</h1>
        </div>
    );
}

export default CategoryOption;