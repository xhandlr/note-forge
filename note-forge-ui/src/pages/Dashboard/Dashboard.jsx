import React from "react"; 
import Navbar from "../../components/UI/Navbar";
import Statistics from "../../components/Dashboard/Statistics";
import UserPanel from "../../components/Dashboard/UserPanel";
import FeaturePanel from "../../components/Dashboard/FeaturePanel";

function Dashboard() { 

    return (
        <div>
            <Navbar />
            <div className="dashboard">
                <div className="feature-wrapper">
                    <Statistics />
                    <FeaturePanel />
                    <UserPanel />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
