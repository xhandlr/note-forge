import React from "react"; 

// UI components
import Navbar from "../../components/UI/Navbar";
import Button from "../../components/UI/Button";
import BgDecoration from "../../components/UI/BgDecoration";
import coffee from "/src/assets/latte-art.png";

function Dashboard() { 

    return (
        <div className="w-screen flex justify-center items-center flex flex-col">
            <BgDecoration 
                file="orange.png"
                position='top-0 left-0'
            />
            <BgDecoration 
                file="yellow.png"
                position='top-0 right-0'
            />
            <Navbar />
            <div className="m-10 w-4/5 bg-white rounded-md mt-35 border border-gray-300 flex flex-row justify-between gap-5 p-6">
                <div className="flex flex-col justify-center gap-4">
                    <h1 className="text-black text-2xl font-bold">Organiza tu aprendizaje</h1>
                    <p className="max-w-300">Define tus asignaturas, crea ejercicios y diseña guías de aprendizaje.</p>
                    <Button 
                        children={"Crear un ejercicio"}
                        variant="primary"
                        className="max-w-xs"
                    />
                </div>
                <div className="flex flex-row justify-center items-end">
                    <div className="flex justify-center items-center gap-4">
                        <img src={coffee} alt="Latte Art" className="w-20 h-20 object-cover" />
                        <p className="text-gray-800 font-bold text-xl">0 ejercicios</p>
                    </div>
                </div>
                <div className="bg-gray-100 rounded-full p-4 w-40 h-40 flex items-center justify-center">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" viewBox="0 0 24 24" 
                        strokeWidth={1.5} 
                        stroke="currentColor" 
                        className="w-15 h-15 text-gray-500"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                </div>
            </div>
            <div className="flex flex-row w-4/5 bg-white border border-gray-200 justify-evenly items-center p-4 font-semibold">
                <h1>Mis asignaturas</h1>
                <h1>Mis ejercicios</h1>
                <h1>Material de estudio</h1>
            </div>
            <div className="flex flex-row w-4/5 h-1/2 bg-white border border-gray-200 justify-evenly items-center p-4 font-semibold">
                <div className="grid grid-cols-3 gap-4 w-4/5">
                    <div className="aspect-square min-h-48 min-w-48 bg-white border border-gray-200 flex flex-col justify-center items-center">
                        <h1>Tutorial</h1>
                        <h3>Aprende a crear tu primera asignatura</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
