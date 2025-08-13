import React from "react"; 

// UI components
import Navbar from "../../components/UI/Navbar";
import Button from "../../components/UI/Button";


function Dashboard() { 

    return (
        <div className="w-screen flex justify-center items-center flex flex-col">
            <Navbar />
            <div className="m-10 w-4/5 bg-white rounded-md mt-35 border border-gray-300 flex flex-col justify-center gap-10 p-6">
                <h1 className="text-black text-2xl font-bold">Organiza tu aprendizaje</h1>
                <Button 
                    children={"Crear un ejercicio"}
                    variant="primary"
                    className="max-w-xs"
                />
            </div>
            <div className="flex flex-row w-4/5 bg-white border border-gray-200 justify-evenly items-center p-4 font-semibold">
                <h1>Mis asignaturas</h1>
                <h1>Mis ejercicios</h1>
                <h1>Material de estudio</h1>
            </div>
        </div>
    );
}

export default Dashboard;
