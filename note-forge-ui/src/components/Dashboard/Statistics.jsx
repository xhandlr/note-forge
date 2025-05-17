import React, { useEffect, useState } from "react";
import '../../styles/Dashboard/Statistics.css';
import { getCategories } from "../../services/CategoryService";
import { getExercises } from "../../services/ExerciseService";

function Statistics() {
    const [categories, setCategories] = useState([]);
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
            const fetchCategories = async () => {
                const data = await getCategories();
                setCategories(data);
            };
            const fetchExercises = async () => {
                const data = await getExercises();
                setExercises(data);
            };
            fetchCategories();
            fetchExercises();
    }, []);


    return (
        <div className='statistics-background'>
            <h1>Categorías</h1>
            <div className='category-circle'>
                <h1>{categories.length}</h1>
            </div>
            <h1>Ejercicios</h1>
            <div className='exercises-circle'>
                <h1>{exercises.length}</h1>
            </div>
            <h1>Guías</h1>
            <div className='worksheets-circle'>
                <h1>0</h1>
            </div>
        </div>
    );
}

export default Statistics;