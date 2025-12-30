import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Dashboard/Navbar';
import BgDecoration from '../../components/UI/BgDecoration';
import Footer from '../../components/UI/Footer';
import { Book, Link as LinkIcon, FileText, Camera, ChevronLeft, ChevronRight, Check, X, Eye } from 'lucide-react';

interface Reference {
  id: string;
  type: 'Libro' | 'Link' | 'Documento';
  title: string;
  description: string;
}

const CreateExercise: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState(1);
  const [difficulty, setDifficulty] = useState(1);
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [enunciado, setEnunciado] = useState('');
  const [resolucion, setResolucion] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Referencias
  const [references, setReferences] = useState<Reference[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentRefType, setCurrentRefType] = useState<'Libro' | 'Link' | 'Documento'>('Libro');
  const [newRef, setNewRef] = useState({ title: '', description: '' });

  const nextStep = () => setStep(s => Math.min(s + 1, 3));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addReference = () => {
    if (newRef.title) {
      setReferences([...references, {
        id: Math.random().toString(36),
        type: currentRefType,
        ...newRef
      }]);
      setNewRef({ title: '', description: '' });
      setShowModal(false);
    }
  };

  const removeReference = (id: string) => {
    setReferences(references.filter(r => r.id !== id));
  };

  const steps = [
    { num: 1, label: 'Fundamentos' },
    { num: 2, label: 'Contenido' },
    { num: 3, label: 'Finalizar' }
  ];

  const getRefIcon = (type: string) => {
    switch(type) {
      case 'Libro': return <Book size={18} />;
      case 'Link': return <LinkIcon size={18} />;
      case 'Documento': return <FileText size={18} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <BgDecoration file="orange.png" position="top-0 left-0" />
      <BgDecoration file="yellow.png" position="top-0 right-0" />

      <Navbar />

      <div className="w-[60%] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-left mt-20">

        {/* Step Indicator */}
        <div className="flex justify-between items-center bg-white p-6 rounded-[2.5rem] shadow-xl border border-slate-200">
          {steps.map((s, idx) => (
            <React.Fragment key={s.num}>
              <div className="flex flex-col items-center gap-2">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black transition-all shadow-lg ${
                  step === s.num ? 'bg-rose-500 text-white scale-110 shadow-rose-200' :
                  step > s.num ? 'bg-slate-900 text-white shadow-slate-100' : 'bg-slate-100 text-slate-400'
                }`}>
                  {step > s.num ? <Check size={28} strokeWidth={3} /> : s.num}
                </div>
                <span className={`text-[11px] font-black uppercase tracking-widest text-center whitespace-nowrap ${step === s.num ? 'text-rose-600' : 'text-slate-400'}`}>
                  {s.label}
                </span>
              </div>
              {idx < steps.length - 1 && (
                <div className={`flex-1 h-1.5 rounded-full mx-4 ${step > s.num ? 'bg-slate-900/10' : 'bg-slate-50'}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Card Principal */}
        <div className="bg-white p-7 lg:p-9 rounded-[2.5rem] shadow-xl border border-slate-200 relative">
          <div className="mb-8 border-b border-slate-100 pb-5">
            <h1 className="text-xl font-black text-slate-900 tracking-tight">
              {step === 1 && "Bases del Reto"}
              {step === 2 && "Cuerpo del Ejercicio"}
              {step === 3 && "Detalles de Forja"}
            </h1>
            <p className="text-xs text-slate-500 font-semibold mt-2">
              Paso {step} de 3 — Construye material profesional.
            </p>
          </div>

          <div className="min-h-[400px] w-full">
            {/* STEP 1: FUNDAMENTOS */}
            {step === 1 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500 w-full">
                <div className="w-full">
                  <label className="text-slate-900 font-black text-base ml-1 block mb-4">Título descriptivo *</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ej: Análisis Cinemático Vectorial"
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] outline-none focus:ring-4 focus:ring-rose-100 focus:border-rose-400 transition-all font-bold text-slate-800 text-base"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="text-slate-900 font-black text-base ml-1 block mb-4">Nivel de Forja (1-5)</label>
                    <div className="flex gap-4">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          onClick={() => setDifficulty(num)}
                          type="button"
                          className={`w-16 h-16 rounded-2xl font-black text-base transition-all border-2 ${
                            difficulty === num
                              ? 'bg-rose-500 text-white border-rose-500 shadow-xl shadow-rose-200 scale-105'
                              : 'bg-white text-slate-400 border-slate-100 hover:border-rose-400 hover:text-rose-500'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-900 font-black text-base ml-1 block mb-4">Asignatura destino</label>
                    <select
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                      className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] outline-none focus:ring-4 focus:ring-rose-100 transition-all cursor-pointer font-black text-slate-700 text-base appearance-none"
                    >
                      <option>Selecciona curso...</option>
                      <option>Cálculo Vectorial</option>
                      <option>Física General</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: CONTENIDO */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500 w-full">
                <div className="w-full">
                  <div className="flex justify-between items-center px-1 mb-4">
                     <label className="text-slate-900 font-black text-base">Enunciado del problema</label>
                     <span className="text-[10px] bg-slate-900 text-white px-5 py-2 rounded-full font-black uppercase tracking-widest shadow-md">LaTeX Activo</span>
                  </div>
                  <textarea
                    rows={6}
                    value={enunciado}
                    onChange={(e) => setEnunciado(e.target.value)}
                    placeholder="Escribe el reto detallado. El editor soporta símbolos matemáticos complejos..."
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] outline-none focus:ring-4 focus:ring-rose-100 focus:border-rose-400 transition-all resize-none font-bold text-sm leading-relaxed text-slate-800"
                  />
                </div>

                {/* Vista Previa Enunciado */}
                <div className="space-y-3 w-full">
                   <div className="flex items-center gap-2 text-slate-400 font-black uppercase text-[10px] tracking-widest ml-4">
                      <Eye size={14} /> Vista Previa:
                   </div>
                   <div className="min-h-[120px] w-full bg-slate-50/50 border-2 border-slate-100 rounded-[1.5rem] p-5 text-slate-600 font-medium text-sm italic">
                      {enunciado || "Aquí aparecerá el renderizado de tu ejercicio..."}
                   </div>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {!imagePreview ? (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full border-4 border-dashed border-slate-100 rounded-[1.5rem] py-10 flex flex-col items-center gap-3 hover:bg-slate-50 hover:border-rose-400 transition-all cursor-pointer group shadow-sm bg-slate-50/30"
                  >
                    <div className="p-5 bg-white rounded-2xl text-slate-200 group-hover:text-rose-500 group-hover:scale-110 transition-all shadow-lg border border-slate-100">
                      <Camera size={36} strokeWidth={2.5} />
                    </div>
                    <div className="text-center">
                      <p className="font-black text-slate-900 text-base">Adjuntar soporte visual</p>
                      <p className="text-xs text-slate-500 font-semibold mt-1">Diagramas, PDF o Capturas</p>
                    </div>
                  </button>
                ) : (
                  <div className="relative w-full h-64 rounded-[1.5rem] overflow-hidden border-4 border-slate-200 shadow-lg group">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute inset-0 bg-slate-900/0 hover:bg-slate-900/60 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100"
                    >
                      <div className="p-4 bg-white rounded-full">
                        <Camera size={32} className="text-slate-900" strokeWidth={2.5} />
                      </div>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* STEP 3: FINALIZAR */}
            {step === 3 && (
              <div className="space-y-8 animate-in fade-in duration-700 w-full">

                {/* Referencias Adicionales */}
                <div className="w-full">
                  <label className="text-slate-900 font-black text-base ml-1 block mb-4">Referencias adicionales</label>

                  <div className="flex gap-4 w-full">
                    {[
                      { type: 'Libro', icon: <Book size={18} />, color: 'bg-slate-50 hover:bg-slate-900 hover:text-white' },
                      { type: 'Link', icon: <LinkIcon size={18} />, color: 'bg-slate-50 hover:bg-rose-500 hover:text-white' },
                      { type: 'Documento', icon: <FileText size={18} />, color: 'bg-slate-50 hover:bg-amber-500 hover:text-white' }
                    ].map((btn) => (
                      <button
                        key={btn.type}
                        type="button"
                        onClick={() => {
                          setCurrentRefType(btn.type as any);
                          setShowModal(true);
                        }}
                        className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-[1.5rem] font-black text-slate-500 transition-all border-2 border-slate-100 shadow-sm text-base ${btn.color}`}
                      >
                        {btn.icon} {btn.type}
                      </button>
                    ))}
                  </div>

                  {/* Listado de Referencias Agregadas */}
                  <div className="space-y-4 pt-2 w-full">
                    {references.map((ref) => (
                      <div key={ref.id} className="flex items-center gap-4 p-4 bg-white border-2 border-slate-100 rounded-2xl group hover:border-rose-400 transition-all animate-in slide-in-from-top-2">
                        <div className="p-2.5 bg-slate-50 text-rose-500 rounded-xl">
                          {getRefIcon(ref.type)}
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-black text-slate-900 text-base leading-tight">{ref.title}</h4>
                          <p className="text-slate-400 font-semibold text-xs">{ref.description}</p>
                        </div>
                        <button
                          onClick={() => removeReference(ref.id)}
                          type="button"
                          className="p-2.5 text-slate-200 hover:text-rose-500 transition-colors"
                        >
                          <X size={18} strokeWidth={3} />
                        </button>
                      </div>
                    ))}
                    {references.length === 0 && (
                      <div className="p-6 text-center bg-slate-50/50 rounded-[1.5rem] border-2 border-dashed border-slate-100 w-full">
                        <p className="text-slate-300 font-semibold text-sm italic">No has añadido referencias aún.</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Guía de Resolución */}
                <div className="w-full">
                  <label className="text-slate-900 font-black text-base ml-1 block mb-4">Guía de Resolución</label>
                  <textarea
                    rows={4}
                    value={resolucion}
                    onChange={(e) => setResolucion(e.target.value)}
                    placeholder="Detalla los pasos críticos para resolver el ejercicio..."
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] outline-none focus:ring-4 focus:ring-rose-100 transition-all font-bold text-slate-800 text-sm"
                  />
                  {/* Vista Previa Resolución */}
                  <div className="space-y-3 pt-2 w-full">
                    <div className="flex items-center gap-2 text-slate-400 font-black uppercase text-[10px] tracking-widest ml-4">
                        <Eye size={14} /> Vista Previa:
                    </div>
                    <div className="min-h-[100px] w-full bg-slate-50/50 border-2 border-slate-100 rounded-[1.5rem] p-5 text-slate-600 font-medium text-sm italic">
                        {resolucion || "Aquí aparecerá la guía de resolución renderizada..."}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Controles de Acción */}
        <div className="flex justify-between items-center bg-white p-5 rounded-[2rem] shadow-lg border border-slate-200">
          <button
            onClick={step === 1 ? () => navigate('/dashboard') : prevStep}
            type="button"
            className="flex items-center gap-2 px-8 py-3.5 bg-slate-100 text-slate-600 rounded-[1.5rem] font-black text-base hover:bg-slate-200 transition-all active:scale-95"
          >
            <ChevronLeft size={20} strokeWidth={3} /> {step === 1 ? "Cancelar" : "Anterior"}
          </button>

          {step < 3 ? (
            <button
              onClick={nextStep}
              type="button"
              className="flex items-center gap-2 px-10 py-3.5 bg-slate-900 text-white rounded-[1.5rem] font-black text-base shadow-xl hover:bg-rose-600 transition-all active:scale-95"
            >
              Siguiente <ChevronRight size={20} strokeWidth={3} />
            </button>
          ) : (
            <button
              onClick={() => navigate('/dashboard')}
              type="button"
              className="flex items-center gap-2 px-12 py-3.5 bg-rose-500 text-white rounded-[1.5rem] font-black text-base shadow-xl shadow-rose-900/20 hover:bg-rose-600 transition-all active:scale-95"
            >
              <Check size={20} strokeWidth={3} /> Guardar en Forja
            </button>
          )}
        </div>

        {/* MODAL PARA AGREGAR REFERENCIAS */}
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-md p-7 rounded-[2rem] shadow-2xl border border-white/20 animate-in zoom-in-95 duration-300">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 bg-slate-50 text-rose-500 rounded-xl shadow-inner">
                  {getRefIcon(currentRefType)}
                </div>
                <h3 className="text-base font-black text-slate-900 tracking-tight">Agregar {currentRefType}</h3>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="text-slate-500 font-black uppercase text-[10px] tracking-widest ml-2 block mb-3">Título del {currentRefType}</label>
                  <input
                    type="text"
                    value={newRef.title}
                    onChange={(e) => setNewRef({...newRef, title: e.target.value})}
                    placeholder={`Nombre del ${currentRefType.toLowerCase()}...`}
                    className="w-full px-5 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl outline-none focus:ring-4 focus:ring-rose-100 transition-all font-bold text-base"
                  />
                </div>
                <div>
                  <label className="text-slate-500 font-black uppercase text-[10px] tracking-widest ml-2 block mb-3">Referencia / Descripción</label>
                  <input
                    type="text"
                    value={newRef.description}
                    onChange={(e) => setNewRef({...newRef, description: e.target.value})}
                    placeholder="Ej: Capítulo 3, Pág 45..."
                    className="w-full px-5 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl outline-none focus:ring-4 focus:ring-rose-100 transition-all font-bold text-base"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-5">
                <button
                  onClick={() => setShowModal(false)}
                  type="button"
                  className="flex-1 py-3 bg-slate-100 text-slate-500 rounded-xl font-black text-base hover:bg-slate-200 transition-all"
                >
                  Cancelar
                </button>
                <button
                  onClick={addReference}
                  type="button"
                  className="flex-1 py-3 bg-rose-500 text-white rounded-xl font-black text-base shadow-lg shadow-rose-200 hover:bg-rose-600 transition-all active:scale-95"
                >
                  Agregar
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      <Footer />
    </div>
  );
};

export default CreateExercise;
