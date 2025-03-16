import React, { useState, useEffect } from "react";
import SearchBar from "../../components/Dashboard/SearchBar";
import ExercisesPanel from "../../components/Exercises/ExercisesPanel";
import CategoriesPanel from "../../components/Categories/CategoriesPanel";

import { getExercises } from "../../services/ExerciseService";
import { getCategories } from "../../services/CategoryService";

function Library() {
    const [exercises, setExercises] = useState([]);
    const [categories, setCategories] = useState([]);
    //const [guides, setGuides] = useState([]);
    const [filteredData, setFilteredData] = useState({
        exercises: [],
        categories: []
        //guides: [],
    });

    // Fetch global de todos los datos
    useEffect(() => {
        const fetchData = async () => {
            const exercisesData = await getExercises();
            const categoriesData = await getCategories();
            //const guidesData = await getGuides();

            setExercises(exercisesData);
            setCategories(categoriesData);
            //setGuides(guidesData);

            setFilteredData({
                exercises: exercisesData,
                categories: categoriesData
                //guides: guidesData,
            });
        };
        fetchData();
    }, []);

    // Manejo de búsqueda general
    const handleSearch = (query) => {
        if (!query.trim()) {
            setFilteredData({ exercises, categories });
            return;
        }

        setFilteredData({
            exercises: exercises.filter(exercise =>
                exercise.title.toLowerCase().includes(query.toLowerCase()) ||
                exercise.description.toLowerCase().includes(query.toLowerCase())
            ),
            categories: categories.filter(category =>
                category.name.toLowerCase().includes(query.toLowerCase())
            )
            /*guides: guides.filter(guide =>
                guide.title.toLowerCase().includes(query.toLowerCase()) ||
                guide.content.toLowerCase().includes(query.toLowerCase())
            ),*/
        });
    };

    return (
        <div>
            <h1>Biblioteca General</h1>
            <SearchBar onSearch={handleSearch} />

            <h2>Ejercicios</h2>
            <ExercisesPanel exercises={filteredData.exercises} />

            <h2>Categorías</h2>
            <CategoriesPanel categories={filteredData.categories} />

            <h2>Guías</h2>
     
        </div>
    );
}

export default Library;
