import React, { useState } from "react";
import { useTranslation} from "react-i18next";
import { Link } from "react-router-dom";

// UI components
import Navbar from "../../components/Dashboard/Navbar";
import imageTutorial from "/src/assets/cloudy-night.png";
import plus from "/src/assets/plus.png";
import Footer from "../../components/UI/Footer";

// Dashboard components
import ExerciseCounter from "../../components/Dashboard/ExerciseCounter";
import ProfilePicture from "../../components/Dashboard/ProfilePicture";
import CategoryCard from "../../components/Dashboard/CategoryCard";

function Dashboard() {
    const { t } = useTranslation();
    const options = [t('dashboard.my-subjects'), t('dashboard.my-exercises'), t('dashboard.study-material')];
    const [selected, setSelected] = useState(options[0]);

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 w-full mt-16">
                {/* Hero Section */}
                <div className="bg-white p-8 rounded-[3rem] shadow-2xl border border-slate-200 flex flex-col lg:flex-row justify-between gap-6 mb-8 transition-all hover:shadow-xl">
                    <div className="flex flex-col justify-center gap-4 flex-1">
                        <h1 className="text-slate-900 text-3xl lg:text-4xl font-black tracking-tight">
                            {t('dashboard.title')}
                        </h1>
                        <p className="text-slate-600 text-base font-bold max-w-2xl leading-relaxed">
                            {t('dashboard.description')}
                        </p>
                        <Link
                            to="/create-exercise"
                            className="inline-block bg-slate-900 text-white text-base px-8 py-3 rounded-[2rem] font-black hover:bg-rose-500 transition-all shadow-xl transform active:scale-95 max-w-xs text-center"
                        >
                            {t('dashboard.create-exercise')}
                        </Link>
                    </div>
                    <div className="flex flex-col lg:flex-row items-center gap-8">
                        <ExerciseCounter count={0} />
                        <ProfilePicture />
                    </div>
                </div>

                {/* Tabs Section */}
                <div className="bg-white border border-slate-200 rounded-[2rem] shadow-xl p-6 mb-8">
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
                        {options.map((text) => (
                            <button
                                key={text}
                                onClick={() => setSelected(text)}
                                className={`rounded-[1.5rem] px-6 py-3 text-sm font-black transition-all outline-none border-none shadow-lg transform active:scale-95
                                    ${selected === text
                                        ? "bg-rose-500 text-white shadow-xl scale-105"
                                        : "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:-translate-y-1"}`}
                            >
                                {text}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Categories Grid */}
                <div className="bg-white border border-slate-200 rounded-[3rem] shadow-2xl p-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        <CategoryCard
                            imageSrc={imageTutorial}
                            alt="Tutorial"
                            bgColor="bg-slate-900"
                            title="Tutorial"
                            description={t('dashboard.add-exercise-choice')}
                            exercisesCount={0}
                            guidesCount={0}
                        />
                        <button
                            className="flex flex-col items-center justify-center rounded-[2rem] w-full aspect-square bg-slate-50 hover:bg-rose-50 transition-all shadow-lg hover:shadow-2xl hover:-translate-y-2 cursor-pointer border border-slate-200 group"
                            title="Crear nueva categoría"
                            onClick={() => {/* nueva categoría */}}
                        >
                            <div className="w-16 h-16 bg-slate-100 rounded-[1.5rem] flex items-center justify-center group-hover:bg-rose-500 transition-all">
                                <img src={plus} alt="Crear categoría" className="w-8 h-8 opacity-60 group-hover:opacity-100" />
                            </div>
                            <p className="mt-4 text-slate-600 font-black text-sm group-hover:text-rose-500 transition-colors">Nueva Categoría</p>
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Dashboard;
