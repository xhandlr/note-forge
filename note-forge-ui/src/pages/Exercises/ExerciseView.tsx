import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Edit3, Share2, Book, Link as LinkIcon, FileText, CheckCircle, ChevronDown, Download, Layers } from 'lucide-react';
import Navbar from '../../components/Dashboard/Navbar';
import Footer from '../../components/UI/Footer';

const ExerciseView: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showResolution, setShowResolution] = useState(false);

  // Mock data - reemplazar con datos reales de la API
  const exercise = {
    title: "Análisis del Cañón Parabólico",
    subject: "Física Mecánica",
    difficulty: 4,
    enunciado: "Un proyectil se lanza desde un cañón situado a una altura h = 20m sobre el suelo con una velocidad inicial de 50 m/s y un ángulo de 45°. Determine la distancia horizontal máxima (alcance) considerando la resistencia del aire como despreciable y g = 9.81 m/s².",
    img: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&q=80&w=1200",
    resolucion: [
      "Descomposición de la velocidad inicial en sus componentes vectoriales Vx y Vy.",
      "Planteamiento de la ecuación cinemática para la altura en función del tiempo.",
      "Determinación del tiempo total de vuelo igualando la ecuación a cero.",
      "Cálculo del alcance horizontal máximo multiplicando Vx por el tiempo de vuelo."
    ],
    references: [
      { type: 'Libro', title: 'Física Universitaria Vol. 1', desc: 'Sears & Zemansky, Cap 3' },
      { type: 'Link', title: 'Simulación de Proyectiles', desc: 'phet.colorado.edu' },
      { type: 'Documento', title: 'Formulario Cinemática', desc: 'Recursos Note Forge' }
    ]
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <div className="w-[70%] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left mt-16">

        {/* Navigation & Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-6">
          <div className="space-y-3">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-slate-400 font-black hover:text-slate-900 transition-colors text-sm mb-2"
            >
              <ArrowLeft size={16} strokeWidth={3} /> Regresar
            </button>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-rose-50 text-rose-600 text-[9px] font-black uppercase tracking-wider rounded-lg border border-rose-100">
                {exercise.subject}
              </span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className={`w-2 h-2 rounded-full ${i < exercise.difficulty ? 'bg-amber-400' : 'bg-slate-100'}`} />
                ))}
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">{exercise.title}</h1>
          </div>

          <div className="flex gap-3">
            <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-amber-500 transition-all shadow-sm">
              <Download size={18} />
            </button>
            <Link
              to={`/edit-exercise/${id}`}
              className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-black text-sm shadow-lg hover:bg-rose-600 transition-all"
            >
              <Edit3 size={18} /> Editar Ejercicio
            </Link>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Main Area */}
          <div className="lg:col-span-3 space-y-6">

            {/* Enunciado Card */}
            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden">
              <div className="px-8 py-5 border-b border-slate-100 flex items-center gap-2">
                <FileText size={18} className="text-rose-500" strokeWidth={2} />
                <h2 className="text-sm font-black uppercase tracking-widest text-slate-900">Enunciado del Problema</h2>
              </div>
              <div className="p-7 lg:p-9 space-y-8">
                <p className="text-xl font-black text-slate-700 leading-relaxed italic">
                  "{exercise.enunciado}"
                </p>
                <div className="rounded-[1.5rem] overflow-hidden border border-slate-100 bg-slate-50">
                  <img src={exercise.img} className="w-full h-auto max-h-[400px] object-contain mx-auto" alt="Diagrama" />
                </div>
              </div>
            </div>

            {/* Resolución Section */}
            <div className={`rounded-[2.5rem] border transition-all shadow-xl ${showResolution ? 'bg-slate-900 border-slate-900' : 'bg-white border-slate-200'}`}>
               <button
                onClick={() => setShowResolution(!showResolution)}
                className={`w-full p-8 flex items-center justify-between transition-colors ${showResolution ? 'text-white' : 'text-slate-900'}`}
               >
                  <div className="flex items-center gap-4">
                     <div className={`p-3 rounded-xl ${showResolution ? 'bg-rose-500' : 'bg-slate-100 text-slate-500'}`}>
                        <CheckCircle size={24} strokeWidth={2} />
                     </div>
                     <div className="text-left">
                        <h3 className="text-lg font-black uppercase tracking-tight">Guía de Resolución</h3>
                        <p className={`text-xs font-black opacity-60 ${showResolution ? 'text-slate-400' : 'text-slate-400'}`}>
                          Clic para ver el proceso paso a paso
                        </p>
                     </div>
                  </div>
                  <ChevronDown className={`transition-transform duration-300 ${showResolution ? 'rotate-180 text-rose-400' : 'text-slate-300'}`} size={24} strokeWidth={3} />
               </button>

               {showResolution && (
                 <div className="p-8 pt-0 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="bg-white/5 border border-white/10 rounded-[1.5rem] p-6 space-y-4">
                      {exercise.resolucion.map((line, i) => (
                        <div key={i} className="flex gap-4 items-start">
                          <span className="w-8 h-8 shrink-0 bg-rose-500/20 text-rose-400 rounded-lg flex items-center justify-center font-black text-xs">
                            {i + 1}
                          </span>
                          <p className="text-slate-300 font-semibold text-base pt-1">{line}</p>
                        </div>
                      ))}
                    </div>
                 </div>
               )}
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-1 space-y-6">
            {/* References Card */}
            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden">
               <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
                  <Book size={16} className="text-amber-500" strokeWidth={2} />
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-900">Referencias</h3>
               </div>
               <div className="p-4 space-y-3">
                  {exercise.references.map((ref, i) => (
                    <div key={i} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-amber-200 transition-all group">
                       <div className="flex items-start gap-3">
                          <div className="p-2 bg-white rounded-lg text-slate-400 group-hover:text-amber-500 transition-colors shadow-sm">
                             {ref.type === 'Libro' && <Book size={14} strokeWidth={2} />}
                             {ref.type === 'Link' && <LinkIcon size={14} strokeWidth={2} />}
                             {ref.type === 'Documento' && <FileText size={14} strokeWidth={2} />}
                          </div>
                          <div className="overflow-hidden">
                             <p className="font-black text-slate-900 text-xs truncate">{ref.title}</p>
                             <p className="text-[10px] text-slate-400 font-black truncate mt-1">{ref.desc}</p>
                          </div>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            {/* Quick Info / Stats */}
            <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white relative overflow-hidden shadow-xl">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Layers size={80} strokeWidth={2} />
               </div>
               <div className="relative z-10 space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-400">Información de Forja</p>
                  <div className="space-y-3">
                     <div className="flex justify-between items-center border-b border-white/5 pb-2">
                        <span className="text-slate-400 text-xs font-black">Dificultad</span>
                        <span className="text-amber-400 font-black text-xs">Alto Impacto</span>
                     </div>
                     <div className="flex justify-between items-center border-b border-white/5 pb-2">
                        <span className="text-slate-400 text-xs font-black">Tiempo Est.</span>
                        <span className="text-white font-black text-xs">25 Minutos</span>
                     </div>
                     <div className="flex justify-between items-center pb-2">
                        <span className="text-slate-400 text-xs font-black">ID</span>
                        <span className="text-white font-black text-xs">#PX-9921</span>
                     </div>
                  </div>
                  <button className="w-full py-3 bg-white text-slate-900 rounded-xl font-black text-xs hover:bg-rose-500 hover:text-white transition-all shadow-lg">
                     Compartir Reto
                  </button>
               </div>
            </div>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
};

export default ExerciseView;
