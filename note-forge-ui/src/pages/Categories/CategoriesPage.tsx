import React from "react";
import Navbar from '../../components/Dashboard/Navbar';
import UserPanel from "../../components/Dashboard/UserPanel";
import CategoriesPanel from "../../components/Categories/CategoriesPanel";

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