import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Coffee, BookOpen, Edit3, Plus, Share2, Calendar } from 'lucide-react';
import { useCategoryService, useExerciseService, useGuideService } from '../../services/ServiceFactory';
import Navbar from '../../components/Dashboard/Navbar';
import Footer from '../../components/UI/Footer';

const CategoryView: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState<'ejercicios' | 'guias'>('ejercicios');
  const [category, setCategory] = useState<any>(null);
  const [exercises, setExercises] = useState<any[]>([]);
  const [guides, setGuides] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const categoryService = useCategoryService();
  const exerciseService = useExerciseService();
  const guideService = useGuideService();

  useEffect(() => {
    const loadData = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const categoryData = await categoryService.getById(id);
        setCategory(categoryData);

        const exercisesData = await exerciseService.getByCategoryId(id);
        setExercises(exercisesData);

        const allGuides = await guideService.getAll();
        const categoryGuides = allGuides.filter((guide: any) =>
          guide.exerciseIds?.some((exerciseId: number) =>
            exercisesData.some((ex: any) => ex.id === exerciseId)
          )
        );
        setGuides(categoryGuides);
      } catch (error) {
        console.error('Error loading category data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-slate-400 font-black text-sm">Cargando categoría...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center space-y-3">
            <p className="text-slate-400 font-black text-lg">Categoría no encontrada</p>
            <button
              onClick={() => navigate('/dashboard')}
              className="text-rose-500 font-black hover:underline"
            >
              Volver al dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

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
            <img src={category.imageUrl} className="w-full h-full object-cover" alt={category.name} />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <span className="px-3 py-1 bg-amber-500 text-white text-[10px] font-black uppercase tracking-wider rounded-lg mb-3 inline-block">
                Asignatura Activa
              </span>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">{category.name}</h1>
            </div>
          </div>

          <div className="p-7 lg:p-9 grid grid-cols-1 md:grid-cols-3 gap-8 items-center border-t border-slate-100">
            <div className="md:col-span-2">
              <p className="text-slate-500 font-semibold leading-relaxed text-sm">{category.description}</p>
            </div>
            <div className="flex gap-4 justify-start md:justify-end">
               <div className="text-center px-6 border-r border-slate-100">
                  <span className="block text-2xl font-black text-slate-900">{exercises.length}</span>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ejercicios</span>
               </div>
               <div className="text-center px-6">
                  <span className="block text-2xl font-black text-slate-900">{guides.length}</span>
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
              exercises.length > 0 ? (
                exercises.map((exercise) => (
                  <Link
                    to={`/exercise/${exercise.id}`}
                    key={exercise.id}
                    className="bg-white rounded-[2.5rem] border border-slate-200 p-7 flex flex-col md:flex-row items-center gap-6 group hover:border-rose-400 hover:shadow-xl transition-all"
                  >
                    <div className="w-full md:w-32 h-32 bg-slate-100 rounded-[1.5rem] overflow-hidden shrink-0">
                      <img
                        src={exercise.imageUrl}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        alt={exercise.title}
                      />
                    </div>
                    <div className="flex-grow space-y-3 text-center md:text-left">
                      <div className="flex items-center justify-center md:justify-start gap-3">
                        <span className="text-[9px] font-black bg-slate-900 text-white px-3 py-1 rounded-lg uppercase tracking-widest">
                          Nivel {exercise.difficulty}
                        </span>
                        <span className="text-slate-400 font-black text-[10px] uppercase tracking-widest flex items-center gap-1">
                          <Calendar size={10}/> {exercise.created_at}
                        </span>
                      </div>
                      <h3 className="text-lg font-black text-slate-900 group-hover:text-rose-600 transition-colors">
                        {exercise.title}
                      </h3>
                      <p className="text-slate-500 font-semibold text-sm line-clamp-2">
                        {exercise.description}
                      </p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl text-slate-300 group-hover:text-rose-500 transition-all">
                      <ArrowLeft className="rotate-180" size={20} strokeWidth={3} />
                    </div>
                  </Link>
                ))
              ) : (
                <div className="py-20 text-center space-y-4 bg-slate-50/50 rounded-[2.5rem] border-4 border-dashed border-slate-200">
                  <Coffee size={40} className="mx-auto text-slate-200" strokeWidth={2} />
                  <h3 className="text-xl font-black text-slate-400 uppercase tracking-tight">No hay ejercicios aún</h3>
                  <Link
                    to="/create-exercise"
                    className="inline-block bg-slate-900 text-white px-8 py-3 rounded-xl font-black text-sm hover:bg-rose-500 transition-all shadow-lg"
                  >
                    Crear Ejercicio
                  </Link>
                </div>
              )
            ) : (
              guides.length > 0 ? (
                guides.map((guide) => (
                  <div key={guide.id} className="bg-white rounded-[2.5rem] border border-slate-200 p-7 hover:shadow-xl transition-all">
                    <h3 className="text-lg font-black text-slate-900">{guide.title}</h3>
                    <p className="text-slate-500 text-sm mt-2">{guide.description}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="px-3 py-1 bg-amber-100 text-amber-700 text-[9px] font-black rounded-lg uppercase tracking-wider">
                        {guide.status}
                      </span>
                      <span className="text-slate-400 text-[10px] font-bold">{guide.author}</span>
                    </div>
                  </div>
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
              )
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CategoryView;
