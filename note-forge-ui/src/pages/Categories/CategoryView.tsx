import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Coffee, BookOpen, Edit3, Plus, Share2, Calendar } from 'lucide-react';
import Navbar from '../../components/Dashboard/Navbar';
import Footer from '../../components/UI/Footer';

const CategoryView: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState<'ejercicios' | 'guias'>('ejercicios');

  // Mock data - reemplazar con datos reales de la API
  const subject = {
    title: "Física Mecánica",
    desc: "Estudio detallado de la cinemática, dinámica y leyes de conservación en sistemas clásicos. Este curso cubre desde vectores hasta mecánica rotacional avanzada.",
    img: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1200",
    stats: { exercises: 24, guides: 5, difficulty: "Intermedio" }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <div className="w-[70%] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left mt-16">

        {/* Top Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-slate-500 font-black text-sm hover:text-slate-900 transition-colors"
          >
            <ArrowLeft size={20} strokeWidth={2.5} /> Volver al Tablero
          </button>
          <div className="flex gap-3">
            <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-rose-500 transition-all shadow-sm">
              <Share2 size={18} />
            </button>
            <Link
              to={`/edit-category/${id}`}
              className="flex items-center gap-2 px-5 py-3 bg-slate-900 text-white rounded-xl font-black text-sm shadow-lg hover:bg-rose-600 transition-all"
            >
              <Edit3 size={18} /> Editar Asignatura
            </Link>
          </div>
        </div>

        {/* Hero Area */}
        <div className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-xl">
          <div className="relative h-64 md:h-80 overflow-hidden">
            <img src={subject.img} className="w-full h-full object-cover" alt={subject.title} />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <span className="px-3 py-1 bg-amber-500 text-white text-[10px] font-black uppercase tracking-wider rounded-lg mb-3 inline-block">
                Asignatura Activa
              </span>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">{subject.title}</h1>
            </div>
          </div>

          <div className="p-7 lg:p-9 grid grid-cols-1 md:grid-cols-3 gap-8 items-center border-t border-slate-100">
            <div className="md:col-span-2">
              <p className="text-slate-500 font-semibold leading-relaxed text-sm">{subject.desc}</p>
            </div>
            <div className="flex gap-4 justify-start md:justify-end">
               <div className="text-center px-6 border-r border-slate-100">
                  <span className="block text-2xl font-black text-slate-900">{subject.stats.exercises}</span>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ejercicios</span>
               </div>
               <div className="text-center px-6">
                  <span className="block text-2xl font-black text-slate-900">{subject.stats.guides}</span>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Guías</span>
               </div>
            </div>
          </div>
        </div>

        {/* Content Tabs & Actions */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex bg-slate-100 p-2 rounded-[1.5rem] border border-slate-200">
              <button
                onClick={() => setTab('ejercicios')}
                className={`px-6 py-3 rounded-xl font-black text-sm transition-all flex items-center gap-2 ${
                  tab === 'ejercicios'
                    ? 'bg-white text-slate-900 shadow-lg'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <Coffee size={16} /> Ejercicios
              </button>
              <button
                onClick={() => setTab('guias')}
                className={`px-6 py-3 rounded-xl font-black text-sm transition-all flex items-center gap-2 ${
                  tab === 'guias'
                    ? 'bg-white text-slate-900 shadow-lg'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <BookOpen size={16} /> Guías
              </button>
            </div>
            <Link
              to={tab === 'ejercicios' ? "/create-exercise" : "/create-guide"}
              className="flex items-center gap-2 bg-rose-500 text-white px-6 py-3 rounded-xl font-black text-sm hover:bg-rose-600 transition-all shadow-xl shadow-rose-900/20"
            >
              <Plus size={18} strokeWidth={2.5} /> {tab === 'ejercicios' ? "Nuevo Ejercicio" : "Nueva Guía"}
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 pb-8">
            {tab === 'ejercicios' ? (
              [1, 2, 3].map((i) => (
                <Link
                  to={`/exercise/${i}`}
                  key={i}
                  className="bg-white rounded-[2.5rem] border border-slate-200 p-7 flex flex-col md:flex-row items-center gap-6 group hover:border-rose-400 hover:shadow-xl transition-all"
                >
                  <div className="w-full md:w-32 h-32 bg-slate-100 rounded-[1.5rem] overflow-hidden shrink-0">
                    <img
                      src={`https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=300&sig=${i}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      alt="Ejercicio"
                    />
                  </div>
                  <div className="flex-grow space-y-3 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-3">
                      <span className="text-[9px] font-black bg-slate-900 text-white px-3 py-1 rounded-lg uppercase tracking-widest">
                        Nivel {i + 1}
                      </span>
                      <span className="text-slate-400 font-black text-[10px] uppercase tracking-widest flex items-center gap-1">
                        <Calendar size={10}/> 12 Oct 2023
                      </span>
                    </div>
                    <h3 className="text-lg font-black text-slate-900 group-hover:text-rose-600 transition-colors">
                      Dinámica de Partículas: Plano Inclinado #{i}
                    </h3>
                    <p className="text-slate-500 font-semibold text-sm line-clamp-2">
                      Análisis de fuerzas y fricción en sistemas mecánicos básicos para estudiantes de primer año.
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl text-slate-300 group-hover:text-rose-500 transition-all">
                    <ArrowLeft className="rotate-180" size={20} strokeWidth={3} />
                  </div>
                </Link>
              ))
            ) : (
              <div className="py-20 text-center space-y-4 bg-slate-50/50 rounded-[2.5rem] border-4 border-dashed border-slate-200">
                <BookOpen size={40} className="mx-auto text-slate-200" strokeWidth={2} />
                <h3 className="text-xl font-black text-slate-400 uppercase tracking-tight">No hay guías aún</h3>
                <Link
                  to="/create-guide"
                  className="inline-block bg-slate-900 text-white px-8 py-3 rounded-xl font-black text-sm hover:bg-rose-500 transition-all shadow-lg"
                >
                  Empezar Forja
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CategoryView;
