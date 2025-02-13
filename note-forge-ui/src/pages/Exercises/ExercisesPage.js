import React from "react";
import Navbar from "../../components/Dashboard/Navbar";
import UserPanel from "../../components/Dashboard/UserPanel";
import ExercisesPanel from "../../components/Exercises/ExercisesPanel";
import "../../styles/Exercises/Exercises.css";

function Exercises() {
    return(
        <div>
            <Navbar />
            <div className="exercises-page">
                <div className="feature-wrapper">
                    <ExercisesPanel />
                    <UserPanel />
                </div>
            </div>
        </div>
    );
}

export default Exercises;