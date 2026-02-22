import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Coffee, Plus, Search, Filter, BookOpen, Layers } from "lucide-react";
import { useCategoryService, useExerciseService, useGuideService } from "../../services/ServiceFactory";

import Navbar from "../../components/Dashboard/Navbar";
import Footer from "../../components/UI/Footer";
import SubjectCard from "../../components/Dashboard/SubjectCard";
import GuideCard from "../../components/Dashboard/GuideCard";
import ExerciseListItem from "../../components/Dashboard/ExerciseListItem";
import DeleteDialog from "../../components/Dashboard/DeleteDialog";

function Dashboard() {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('asignaturas');
    const [categories, setCategories] = useState<any[]>([]);
    const [exercises, setExercises] = useState<any[]>([]);
    const [guides, setGuides] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [deletingCategory, setDeletingCategory] = useState<{ id: number; name: string; exercisesCount: number } | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const categoryService = useCategoryService();
    const exerciseService = useExerciseService();
    const guideService = useGuideService();

    const tabs = [
        { id: 'asignaturas', label: t('dashboard.my-subjects'), icon: <Layers size={18} /> },
        { id: 'ejercicios', label: t('dashboard.my-exercises'), icon: <Coffee size={18} /> },
        { id: 'guias', label: t('dashboard.study-material'), icon: <BookOpen size={18} /> },
    ];

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const [categoriesData, exercisesData, guidesData] = await Promise.all([
                    categoryService.getAll(),
                    exerciseService.getAll(),
                    guideService.getAll()
                ]);
                setCategories(categoriesData);
                setExercises(exercisesData);
                setGuides(guidesData);
            } catch (error) {
                console.error('Error loading dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const handleTogglePin = async (category: any) => {
        const newPinned = category.is_pinned ? 0 : 1;

        setCategories(prev =>
            prev.map(c => c.id === category.id ? { ...c, is_pinned: newPinned } : c)
        );

        try {
            const formData = new FormData();
            formData.append('name', category.name);
            formData.append('description', category.description || '');
            formData.append('isPinned', String(newPinned));
            await categoryService.update(category.id, formData);
        } catch (error) {
            setCategories(prev =>
                prev.map(c => c.id === category.id ? { ...c, is_pinned: category.is_pinned } : c)
            );
            console.error('Error al cambiar pin:', error);
        }
    };

    const handleDeleteCategory = async (deleteExercises: boolean) => {
        if (!deletingCategory) return;
        setIsDeleting(true);

        try {
            if (deleteExercises) {
                const categoryExercises = exercises.filter(e => e.category_id === deletingCategory.id);
                await Promise.all(categoryExercises.map(e => exerciseService.delete(e.id)));
            }
            await categoryService.delete(deletingCategory.id);
            setCategories(prev => prev.filter(c => c.id !== deletingCategory.id));
            if (deleteExercises) {
                setExercises(prev => prev.filter(e => e.category_id !== deletingCategory.id));
            }
            setDeletingCategory(null);
        } catch (error) {
            console.error('Error al eliminar asignatura:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    const sortedCategories = [...categories].sort((a, b) =>
        (b.is_pinned ? 1 : 0) - (a.is_pinned ? 1 : 0)
    );

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Navbar />

            {deletingCategory && (
                <DeleteDialog
                    categoryName={deletingCategory.name}
                    exercisesCount={deletingCategory.exercisesCount}
                    onConfirm={handleDeleteCategory}
                    onCancel={() => !isDeleting && setDeletingCategory(null)}
                    deleting={isDeleting}
                />
            )}

            <div className="w-[70%] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 mt-16">

                {/* Banner */}
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

                {/* Tabs */}
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

                {/* Contenido */}
                <div className="min-h-[500px]">
                    {loading ? (
                        <div className="flex items-center justify-center h-[500px]">
                            <div className="text-center space-y-3">
                                <div className="w-12 h-12 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto" />
                                <p className="text-slate-400 font-black text-sm">Cargando datos...</p>
                            </div>
                        </div>
                    ) : (
                        <>
                            {activeTab === 'asignaturas' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {sortedCategories.map((category) => {
                                        const categoryExercisesCount = exercises.filter(e => e.category_id === category.id).length;
                                        return (
                                            <SubjectCard
                                                key={category.id}
                                                id={category.id}
                                                title={category.name}
                                                exercises={categoryExercisesCount}
                                                guides={0}
                                                icon={<BookOpen size={64} strokeWidth={2} />}
                                                pinned={category.is_pinned}
                                                imageSrc={category.image_url}
                                                onTogglePin={() => handleTogglePin(category)}
                                                onDelete={() => setDeletingCategory({ id: category.id, name: category.name, exercisesCount: categoryExercisesCount })}
                                            />
                                        );
                                    })}
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
                                    {guides.map((guide) => (
                                        <GuideCard
                                            key={guide.id}
                                            title={guide.title}
                                            status={guide.status}
                                            subject={guide.author}
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
                                    {exercises.map((exercise) => (
                                        <ExerciseListItem
                                            key={exercise.id}
                                            id={exercise.id}
                                            title={exercise.title}
                                            subject={categories.find(c => c.id === exercise.category_id)?.name || 'Sin categoría'}
                                            difficulty={exercise.difficulty}
                                            desc={exercise.description}
                                            img={exercise.image_url}
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
                        </>
                    )}
                </div>

            </div>

            <Footer />
        </div>
    );
}

export default Dashboard;
