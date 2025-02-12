import React from "react";
import "../styles/Categories.css"
import Navbar from "../components/Navbar";
import UserPanel from "../components/UserPanel";
import CategoriesPanel from "../components/CategoriesPanel";

function Categories() {
    return(
        <div>
            <Navbar />
            <div className="categories-page">
                <div className="feature-wrapper">
                    <CategoriesPanel />
                    <UserPanel />
                </div>
            </div>
        </div>
    );
}

export default Categories;