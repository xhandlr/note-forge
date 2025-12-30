import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Coffee, Plus, MoreVertical, Pin, Search, Filter, BookOpen, Layers, Edit3, Eye } from "lucide-react";

// UI components
import Navbar from "../../components/Dashboard/Navbar";
import Footer from "../../components/UI/Footer";

interface SubjectCardProps {
    title: string;
    exercises: number;
    guides: number;
    icon: React.ReactNode;
    pinned?: boolean;
}

const SubjectCard: React.FC<SubjectCardProps> = ({ title, exercises, guides, icon, pinned }) => (
    <div className="bg-white rounded-[2rem] overflow-hidden border border-slate-200 shadow-2xl transition-all hover:shadow-xl hover:-translate-y-1 group relative">
        {pinned && (
            <div className="absolute top-3 left-3 z-20 bg-amber-500 text-white p-2 rounded-xl shadow-lg">
                <Pin size={14} fill="white" />
            </div>
        )}
        <div className="h-40 bg-slate-900 relative overflow-hidden flex items-center justify-center">
            <div className="text-white transform group-hover:scale-110 transition-transform duration-700">
                {icon}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
            <div className="absolute top-3 right-3 z-20 flex gap-2">
                <Link to={`/edit-category/${title}`} className="bg-white/20 backdrop-blur-md text-white p-2 hover:bg-rose-500 rounded-xl transition-all" title="Editar Asignatura">
                    <Edit3 size={16} />
                </Link>
                <button className="bg-white/20 backdrop-blur-md text-white p-2 hover:bg-white/40 rounded-xl transition-all">
                    <MoreVertical size={18} />
                </button>
            </div>
            <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-extrabold tracking-tight">{title}</h3>
            </div>
        </div>
        <div className="p-6 flex items-center justify-between">
            <div className="flex flex-col gap-1">
                <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Contenido disponible</span>
                <div className="flex gap-3">
                    <span className="text-amber-600 font-bold text-sm">{exercises} Ejercicios</span>
                    <span className="text-rose-600 font-bold text-sm">{guides} Guías</span>
                </div>
            </div>
            <Link to={`/subject/${title}`} className="p-3 bg-slate-900 text-white rounded-xl hover:bg-rose-600 transition-all shadow-lg active:scale-95">
                <Plus size={18} strokeWidth={3} />
            </Link>
        </div>
    </div>
);

interface GuideCardProps {
    title: string;
    status: string;
    subject: string;
}

const GuideCard: React.FC<GuideCardProps> = ({ title, status, subject }) => (
    <div className="bg-white rounded-[2rem] p-6 border border-slate-200 shadow-2xl flex flex-col gap-5 group hover:border-rose-300 transition-all">
        <div className="aspect-[3/4] bg-slate-50 rounded-2xl relative overflow-hidden flex flex-col items-center justify-center p-8 border border-slate-100">
            <div className="w-full space-y-4">
                <div className="h-4 bg-amber-200/40 rounded-full w-4/5" />
                <div className="flex gap-2">
                    <div className="h-10 bg-rose-100/30 rounded-xl w-1/2" />
                    <div className="h-10 bg-rose-100/30 rounded-xl w-1/2" />
                </div>
                <div className="space-y-2">
                    <div className="h-2 bg-slate-100 rounded-full w-full" />
                    <div className="h-2 bg-slate-100 rounded-full w-full" />
                    <div className="h-2 bg-slate-100 rounded-full w-3/4" />
                </div>
                <div className="pt-4 space-y-2">
                    <div className="h-2 bg-amber-100/40 rounded-full w-full" />
                    <div className="h-2 bg-amber-100/40 rounded-full w-5/6" />
                </div>
            </div>
            <div className="absolute inset-0 bg-rose-500/0 group-hover:bg-rose-500/5 transition-colors" />
        </div>
        <div className="space-y-4">
            <h4 className="font-extrabold text-slate-900 text-lg leading-tight line-clamp-2 group-hover:text-rose-600 transition-colors">{title}</h4>
            <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-amber-100 text-amber-700 text-[9px] font-black rounded-lg uppercase tracking-wider border border-amber-200">{status}</span>
                <span className="text-slate-400 text-[10px] font-bold">{subject}</span>
            </div>
        </div>
    </div>
);

interface ExerciseListItemProps {
    title: string;
    subject: string;
    difficulty: number;
    desc: string;
    img: string;
}

const ExerciseListItem: React.FC<ExerciseListItemProps> = ({ title, subject, difficulty, desc, img }) => (
    <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden flex flex-col md:flex-row group hover:border-rose-300 transition-all text-left">
        <div className="md:w-1/3 lg:w-1/4 h-48 md:h-auto relative overflow-hidden">
            <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors" />
            <div className="absolute top-4 left-4">
                <span className="px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-900 border border-white/20 shadow-lg">
                    {subject}
                </span>
            </div>
        </div>
        <div className="flex-grow p-6 lg:p-7 flex flex-col justify-between">
            <div className="space-y-3">
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-black text-slate-900 tracking-tight group-hover:text-rose-600 transition-colors">{title}</h3>
                    <div className="flex gap-1.5">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < difficulty ? 'bg-amber-400' : 'bg-slate-100'}`} />
                        ))}
                    </div>
                </div>
                <p className="text-slate-500 font-medium text-sm leading-relaxed line-clamp-2 max-w-2xl">{desc}</p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 mt-5 pt-5 border-t border-slate-50">
                <div className="flex gap-3">
                    <span className="flex items-center gap-2 text-slate-400 text-[10px] font-bold bg-slate-50 px-3 py-1.5 rounded-xl">
                        <Layers size={12} /> ID: #FX-2023
                    </span>
                    <span className="flex items-center gap-2 text-slate-400 text-[10px] font-bold bg-slate-50 px-3 py-1.5 rounded-xl">
                        <Coffee size={12} /> 15 min
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1.5 px-4 py-2 bg-slate-50 text-slate-500 rounded-xl font-black text-xs hover:bg-slate-900 hover:text-white transition-all">
                        <Eye size={14} /> Ver
                    </button>
                    <Link to={`/edit-exercise/${title}`} className="flex items-center gap-1.5 px-4 py-2 bg-rose-50 text-rose-600 rounded-xl font-black text-xs hover:bg-rose-500 hover:text-white transition-all">
                        <Edit3 size={14} /> Editar
                    </Link>
                    <button className="p-2 text-slate-300 hover:text-amber-600 transition-colors">
                        <MoreVertical size={16} />
                    </button>
                </div>
            </div>
        </div>
    </div>
);

function Dashboard() {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('asignaturas');

    const tabs = [
        { id: 'asignaturas', label: t('dashboard.my-subjects'), icon: <Layers size={18} /> },
        { id: 'ejercicios', label: t('dashboard.my-exercises'), icon: <Coffee size={18} /> },
        { id: 'guias', label: t('dashboard.study-material'), icon: <BookOpen size={18} /> },
    ];

    // Datos falsos para ejercicios
    const mockExercises = [
        {
            title: "Movimiento Parabólico: Reto del Cañón",
            subject: "Física I",
            difficulty: 4,
            desc: "Análisis cinemático completo de un proyectil lanzado con ángulo variable sobre un plano inclinado. Requiere descomposición vectorial avanzada.",
            img: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&q=80&w=800"
        },
        {
            title: "Integración por Partes: El Desafío Logarítmico",
            subject: "Cálculo II",
            difficulty: 3,
            desc: "Cálculo de la integral indefinida de funciones trascendentes combinadas. Aplicación práctica del método DI para optimización de tiempo.",
            img: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800"
        },
        {
            title: "Equilibrio Ácido-Base: Titulación de Vinagre",
            subject: "Química General",
            difficulty: 2,
            desc: "Determinación de la concentración molar de ácido acético mediante neutralización con NaOH. Cálculo de pH en el punto de equivalencia.",
            img: "https://images.unsplash.com/photo-1603126010305-2f560a3773f7?auto=format&fit=crop&q=80&w=800"
        },
    ];

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Navbar />

            <div className="w-[70%] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 mt-16">

                {/* Banner con contraste agresivo y moderno */}
                <div className="relative overflow-hidden bg-slate-900 p-8 lg:p-12 rounded-[3rem] shadow-2xl text-white">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/20 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-rose-500/20 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/4" />

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="space-y-6 md:w-3/5 text-center md:text-left">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-amber-300 text-xs font-black uppercase tracking-widest border border-white/10">
                                <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" /> Panel de Control
                            </div>
                            <h1 className="text-4xl lg:text-5xl font-black leading-tight tracking-tight">
                                Forja tu <br/> <span className="text-amber-400">Aprendizaje</span>
                            </h1>
                            <p className="text-base text-slate-300 font-medium max-w-lg leading-relaxed">
                                {t('dashboard.description')}
                            </p>
                            <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-4">
                                <Link to="/create-exercise" className="bg-rose-500 text-white px-8 py-4 rounded-[2rem] font-black text-base hover:bg-rose-600 transition-all shadow-2xl shadow-rose-900/40 active:scale-95">
                                    {t('dashboard.create-exercise')}
                                </Link>
                                <Link to="/create-guide" className="bg-white text-slate-900 px-8 py-4 rounded-[2rem] font-black text-base hover:bg-amber-50 transition-all shadow-xl">
                                    Crear Guía
                                </Link>
                            </div>
                        </div>

                        <div className="hidden lg:grid grid-cols-2 gap-6">
                            <div className="bg-white/10 backdrop-blur-xl p-6 rounded-[3rem] border border-white/20 flex flex-col items-center text-center">
                                <BookOpen size={32} className="text-amber-400 mb-3" />
                                <span className="text-3xl font-black">12</span>
                                <p className="text-[10px] font-black uppercase text-slate-400 mt-2 tracking-widest">Guías</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-xl p-6 rounded-[3rem] border border-white/20 flex flex-col items-center text-center">
                                <Coffee size={32} className="text-rose-400 mb-3" />
                                <span className="text-3xl font-black">45</span>
                                <p className="text-[10px] font-black uppercase text-slate-400 mt-2 tracking-widest">Ejercicios</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tab Selection CENTRADO de ALTO CONTRASTE */}
                <div className="flex flex-col items-center gap-8">
                    <div className="bg-slate-100/80 p-2 rounded-[2rem] flex items-center gap-2 border border-slate-200">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-6 py-3 rounded-[1.5rem] font-black text-sm transition-all duration-300 flex items-center gap-2 ${
                                    activeTab === tab.id
                                        ? 'bg-rose-500 text-white shadow-xl shadow-rose-200 scale-105'
                                        : 'text-slate-500 hover:text-rose-500 hover:bg-white'
                                }`}
                            >
                                {tab.icon} {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="w-full flex justify-between items-center">
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                            {activeTab === 'asignaturas' && t('dashboard.my-subjects')}
                            {activeTab === 'ejercicios' && 'Banco de Ejercicios'}
                            {activeTab === 'guias' && 'Gestión de Guías'}
                        </h2>
                        <div className="flex gap-3">
                            <button className="p-3 bg-white rounded-xl border border-slate-200 text-slate-400 hover:text-slate-900 transition-all shadow-lg">
                                <Filter size={18} />
                            </button>
                            <div className="relative group">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-rose-500 transition-colors" size={18} />
                                <input
                                    type="text"
                                    placeholder="Buscar..."
                                    className="bg-white border border-slate-200 pl-10 pr-4 py-3 rounded-xl outline-none focus:ring-4 focus:ring-rose-100 shadow-sm font-bold text-sm w-48 focus:w-64 transition-all"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Zona de Renderizado con Blanco Sólido */}
                <div className="min-h-[500px]">
                    {activeTab === 'asignaturas' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <SubjectCard
                                title="Física Mecánica"
                                exercises={24}
                                guides={5}
                                icon={<BookOpen size={64} strokeWidth={2} />}
                                pinned
                            />
                            <SubjectCard
                                title="Cálculo II"
                                exercises={18}
                                guides={3}
                                icon={<Coffee size={64} strokeWidth={2} />}
                            />
                            <Link to="/create-category" className="bg-white border-4 border-dashed border-slate-200 rounded-[2rem] h-full min-h-[250px] flex flex-col items-center justify-center text-slate-300 hover:bg-amber-50 hover:border-amber-400 hover:text-amber-500 transition-all group shadow-2xl">
                                <div className="bg-slate-50 p-5 rounded-full group-hover:bg-white group-hover:scale-110 transition-all mb-3">
                                    <Plus size={40} strokeWidth={3} className="text-slate-200 group-hover:text-amber-500" />
                                </div>
                                <span className="font-black text-lg">Nueva Asignatura</span>
                            </Link>
                        </div>
                    )}

                    {activeTab === 'guias' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <GuideCard
                                    key={i}
                                    title={`Guía #${i}: Teoría y Práctica`}
                                    status="En revisión"
                                    subject={i % 2 === 0 ? "Física I" : "Química"}
                                />
                            ))}
                            <Link to="/create-guide" className="bg-white border-4 border-dashed border-slate-200 rounded-[2rem] h-full min-h-[300px] flex flex-col items-center justify-center text-slate-300 hover:bg-rose-50 hover:border-rose-400 hover:text-rose-500 transition-all group shadow-2xl">
                                <div className="bg-slate-50 p-5 rounded-full group-hover:bg-white group-hover:scale-110 transition-all mb-3">
                                    <Plus size={40} strokeWidth={3} className="text-slate-200 group-hover:text-rose-500" />
                                </div>
                                <span className="font-black text-lg">Nueva Guía</span>
                            </Link>
                        </div>
                    )}

                    {activeTab === 'ejercicios' && (
                        <div className="space-y-6">
                            {mockExercises.map((exercise, idx) => (
                                <ExerciseListItem
                                    key={idx}
                                    title={exercise.title}
                                    subject={exercise.subject}
                                    difficulty={exercise.difficulty}
                                    desc={exercise.desc}
                                    img={exercise.img}
                                />
                            ))}

                            <Link to="/create-exercise" className="w-full py-8 bg-white border-4 border-dashed border-slate-200 rounded-[2.5rem] flex items-center justify-center gap-3 text-slate-300 hover:bg-rose-50 hover:border-rose-400 hover:text-rose-500 transition-all group shadow-xl">
                                <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-rose-500 group-hover:text-white transition-all">
                                    <Plus size={24} strokeWidth={3} />
                                </div>
                                <span className="font-black text-base tracking-tight">Forjar Nuevo Ejercicio</span>
                            </Link>
                        </div>
                    )}
                </div>

            </div>

            <Footer />
        </div>
    );
}

export default Dashboard;
