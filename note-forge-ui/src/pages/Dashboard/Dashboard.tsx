import React, { useState } from "react"; 

// UI components
import Navbar from "../../components/Dashboard/Navbar";
import Button from "../../components/UI/Button";
import BgDecoration from "../../components/UI/BgDecoration";
import imageTutorial from "/src/assets/cloudy-night.png";
import Footer from "../../components/UI/Footer";

// Dashboard components
import ExerciseCounter from "../../components/Dashboard/ExerciseCounter";
import ProfilePicture from "../../components/Dashboard/ProfilePicture";
import CategoryCard from "../../components/Dashboard/CategoryCard";

function Dashboard() { 
    const options = ["Mis asignaturas", "Mis ejercicios", "Material de estudio"];
    const [selected, setSelected] = useState(options[0]);

    return (
        <div className="min-h-screen flex justify-center items-center flex flex-col">
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
                <ExerciseCounter count={0} />
                <ProfilePicture />
            </div>
            <div className="flex flex-row w-4/5 bg-white border border-gray-200 justify-evenly items-center p-4 font-semibold gap-4">
                {options.map((text) => (
                    <button
                        key={text}
                        onClick={() => setSelected(text)}
                        className={`rounded-full px-6 py-2 transition-colors duration-200 outline-none border-none
                            ${selected === text 
                                ? "bg-purple-100 text-purple-700" 
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                    >
                        {text}
                    </button>
                ))}
            </div>
            <div className="flex flex-row w-4/5 h-1/2 bg-white border border-gray-200 justify-around items-center p-4 font-semibold">
                <div className="grid grid-cols-3 gap-4 w-4/5">
                    <CategoryCard
                        imageSrc={imageTutorial}
                        alt="Tutorial"
                        bgColor="bg-(--color-night-background)"
                        title="Tutorial"
                        description="Agrega un ejercicio de tu preferencia"
                        exercisesCount={0}
                        guidesCount={0}
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Dashboard;
