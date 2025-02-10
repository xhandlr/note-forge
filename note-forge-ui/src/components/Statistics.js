import React from "react";
import '../styles/Statistics.css';

function Statistics() {
    return (
        <div className='statistics-background'>
            <h1>Categorías</h1>
            <div className='category-circle'>
                <h1>1</h1>
            </div>
            <h1>Ejercicios</h1>
            <div className='exercises-circle'>
                <h1>5</h1>
            </div>
            <h1>Guías</h1>
            <div className='worksheets-circle'>
                <h1>2</h1>
            </div>
        </div>
    );
}

export default Statistics;