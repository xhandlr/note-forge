import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Dashboard/Navbar';
import BgDecoration from '../../components/UI/BgDecoration';
import Footer from '../../components/UI/Footer';
import LatexEditor from '../../components/Exercises/LatexEditor';
import { Book, Link as LinkIcon, FileText, Camera, ChevronLeft, ChevronRight, Check, X, Eye } from 'lucide-react';
import { getExerciseById, updateExercise, addExercise } from '../../services/ExerciseService';
import { useNotification } from '../../contexts/NotificationContext';
import { useExerciseService } from '../../services/ServiceFactory';

interface Reference {
  id: string;
  type: 'Libro' | 'Link' | 'Documento';
  title: string;
  description: string;
}

interface ExerciseFormProps {
  mode: 'create' | 'edit';
  exerciseId?: string;
}

const ExerciseForm: React.FC<ExerciseFormProps> = ({ mode, exerciseId }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showSuccess, showError } = useNotification();

  const [loading, setLoading] = useState(mode === 'edit');
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

  // Cargar datos si es modo edit
  useEffect(() => {
    if (mode === 'edit' && exerciseId) {
      const fetchExercise = async () => {
        try {
          const data = await getExerciseById(exerciseId);
          if (data) {
            setTitle(data.title || '');
            setDifficulty(data.difficulty || 1);
            setCategoryId(data.categoryId || '');
            setEnunciado(data.description || '');
            setResolucion(data.answer || '');
            // Si hay imagen URL, setearla como preview
            if (data.imageUrl) {
              setImagePreview(data.imageUrl);
            }
          }
          setLoading(false);
        } catch (error) {
          console.error('Error al cargar ejercicio:', error);
          showError('Error al cargar el ejercicio');
          setLoading(false);
        }
      };
      fetchExercise();
    }
  }, [mode, exerciseId]);

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
    setReferences(references.filter(ref => ref.id !== id));
  };

  const handleSubmit = async () => {
    try {
      if (mode === 'edit' && exerciseId) {
        const exerciseData = {
          title,
          difficulty,
          categoryId,
          description: enunciado,
          answer: resolucion,
          imageUrl: imagePreview,
        };
        await updateExercise(exerciseId, exerciseData);
        showSuccess('Ejercicio actualizado con éxito');
      } else {
        // Modo create: usar FormData para soportar imagen
        const formData = new FormData();
        formData.append('title', title);
        formData.append('difficulty', difficulty.toString());
        formData.append('categoryId', categoryId);
        formData.append('description', enunciado);
        formData.append('answer', resolucion);

        // Agregar imagen si existe
        if (image) {
          formData.append('image', image);
        }

        await addExercise(formData);
        showSuccess('Ejercicio creado con éxito');
      }
      navigate('/dashboard');
    } catch (error) {
      console.error('Error al guardar ejercicio:', error);
      showError('Error al guardar el ejercicio');
    }
  };

  const steps = [
    { num: 1, label: 'Fundamentos' },
    { num: 2, label: 'Contenido' },
    { num: 3, label: 'Finalizar' }
  ];

  const getRefIcon = (type: string) => {
    switch (type) {
      case 'Libro': return <Book size={18} />;
      case 'Link': return <LinkIcon size={18} />;
      case 'Documento': return <FileText size={18} />;
      default: return <FileText size={18} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto mb-4"></div>
          <p className="text-slate-600 font-semibold">Cargando ejercicio...</p>
        </div>
      </div>
    );
  }

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
                <span className={`text-[10px] font-black uppercase tracking-widest whitespace-nowrap ${
                  step === s.num ? 'text-rose-600' : step > s.num ? 'text-slate-900' : 'text-slate-400'
                }`}>
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
              Paso {step} de 3 — {mode === 'edit' ? 'Actualiza' : 'Construye'} material profesional.
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
                              ? 'bg-rose-500 text-white border-rose-500 scale-110 shadow-lg shadow-rose-200'
                              : 'bg-slate-50 text-slate-400 border-slate-200 hover:border-rose-300'
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
                  <LatexEditor
                    name="enunciado"
                    value={enunciado}
                    onChange={(e) => setEnunciado(e.target.value)}
                  />
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
                        onClick={() => { setCurrentRefType(btn.type as any); setShowModal(true); }}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black text-sm transition-all shadow-md ${btn.color}`}
                      >
                        {btn.icon} {btn.type}
                      </button>
                    ))}
                  </div>

                  <div className="mt-6 space-y-3 w-full">
                    {references.length > 0 ? references.map((ref) => (
                      <div key={ref.id} className="bg-slate-50 p-5 rounded-[1.5rem] flex items-center justify-between border border-slate-100 w-full">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-white rounded-lg text-slate-600 shadow-sm">{getRefIcon(ref.type)}</div>
                          <div>
                            <p className="font-black text-slate-900 text-sm">{ref.title}</p>
                            <p className="text-slate-500 text-xs font-semibold">{ref.type} • {ref.description}</p>
                          </div>
                        </div>
                        <button type="button" onClick={() => removeReference(ref.id)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-all">
                          <X size={18} strokeWidth={3} />
                        </button>
                      </div>
                    )) : (
                      <div className="p-6 text-center bg-slate-50/50 rounded-[1.5rem] border-2 border-dashed border-slate-100 w-full">
                        <p className="text-slate-300 font-semibold text-sm italic">No has añadido referencias aún.</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Guía de Resolución */}
                <div className="w-full">
                  <label className="text-slate-900 font-black text-base ml-1 block mb-4">Guía de Resolución</label>
                  <LatexEditor
                    name="resolucion"
                    value={resolucion}
                    onChange={(e) => setResolucion(e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Controles de Acción */}
        <div className="flex justify-between items-center bg-white p-5 rounded-[2rem] shadow-lg border border-slate-200">
          <button
            type="button"
            onClick={step === 1 ? () => navigate('/dashboard') : prevStep}
            className="flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-600 rounded-[1.5rem] font-black text-sm hover:bg-slate-200 transition-all"
          >
            <ChevronLeft size={18} strokeWidth={3} /> {step === 1 ? 'Cancelar' : 'Anterior'}
          </button>

          {step < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              className="flex items-center gap-2 px-8 py-3 bg-rose-500 text-white rounded-[1.5rem] font-black text-sm hover:bg-rose-600 transition-all shadow-lg shadow-rose-200"
            >
              Siguiente <ChevronRight size={18} strokeWidth={3} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="flex items-center gap-2 px-8 py-3 bg-slate-900 text-white rounded-[1.5rem] font-black text-sm hover:bg-rose-500 transition-all shadow-lg"
            >
              <Check size={18} strokeWidth={3} /> {mode === 'edit' ? 'Actualizar' : 'Crear'} Ejercicio
            </button>
          )}
        </div>

        {/* Modal para agregar referencia */}
        {showModal && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
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

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => { setShowModal(false); setNewRef({ title: '', description: '' }); }}
                  className="flex-1 px-5 py-3 bg-slate-100 text-slate-600 rounded-xl font-black text-sm hover:bg-slate-200 transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={addReference}
                  className="flex-1 px-5 py-3 bg-rose-500 text-white rounded-xl font-black text-sm hover:bg-rose-600 transition-all shadow-lg shadow-rose-200"
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

export default ExerciseForm;
