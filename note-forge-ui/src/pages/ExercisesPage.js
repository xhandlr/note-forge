import React from "react";
import Navbar from "../components/Navbar";
import UserPanel from "../components/UserPanel";
import ExercisesPanel from "../components/ExercisesPanel";
import "../styles/Exercises.css";

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