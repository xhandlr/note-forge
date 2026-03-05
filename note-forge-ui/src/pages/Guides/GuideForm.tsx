import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from '../../components/Dashboard/Navbar';
import Footer from '../../components/UI/Footer';
import { useExerciseService, useGuideService, useCategoryService } from '../../services/ServiceFactory';
import { FileText, ArrowLeft, Eye, Save, Download, BookOpen } from 'lucide-react';
import { useNotification } from '../../contexts/NotificationContext';
import ExportGuideModal from '../../components/Guides/ExportGuideModal';
import GuideMetadata from '../../components/Guides/GuideMetadata';
import GuideExercisesList from '../../components/Guides/GuideExercisesList';
import ExerciseSearch from '../../components/Guides/ExerciseSearch';
import GuidePreviewModal from '../../components/Guides/GuidePreviewModal';
import ExercisePicker from '../../components/Guides/ExercisePicker';

interface Exercise {
    id: number;
    title: string;
    description: string;
    answer?: string;
    image_url?: string;
    imageUrl?: string;
    difficulty?: number;
    categoryId?: number;
    duration?: string;
}

interface GuideFormProps {
    mode: 'create' | 'edit';
    guideId?: string;
}

const GuideForm: React.FC<GuideFormProps> = ({ mode, guideId }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { showSuccess, showError } = useNotification();
    const exerciseService = useExerciseService();
    const guideService = useGuideService();
    const categoryService = useCategoryService();
    const [loading, setLoading] = useState(mode === 'edit');
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
    const [guideExercises, setGuideExercises] = useState<Exercise[]>([]);
    const [guideTitle, setGuideTitle] = useState("");
    const [guideAuthor, setGuideAuthor] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [showPreview, setShowPreview] = useState(false);
    const [previewTab, setPreviewTab] = useState<'render' | 'latex'>('render');
    const [showExportModal, setShowExportModal] = useState(false);
    const [categories, setCategories] = useState<any[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const [showPicker, setShowPicker] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const exercisesData = await exerciseService.getAll();
                setExercises(exercisesData);
                setFilteredExercises(exercisesData);
            } catch (error) {
                console.error('Error loading exercises:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await categoryService.getAll();
                setCategories(data);
            } catch (error) {
                console.error('Error loading categories:', error);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        if (mode === 'edit' && guideId) {
            const fetchGuide = async () => {
                try {
                    const data = await guideService.getById(guideId);
                    if (data) {
                        setGuideTitle(data.title || '');
                        setGuideAuthor(data.author || '');
                        if (data.exercises) setGuideExercises(data.exercises);
                        if (data.categories) {
                            setSelectedCategories(data.categories.map((cat: any) => cat.id));
                        }
                    }
                    setLoading(false);
                } catch {
                    showError(t('guide.error-load'));
                    setLoading(false);
                }
            };
            fetchGuide();
        }
    }, [mode, guideId]);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        if (!query.trim()) {
            setFilteredExercises(exercises);
        } else {
            setFilteredExercises(exercises.filter(ex =>
                ex.title.toLowerCase().includes(query.toLowerCase())
            ));
        }
    };

    const handleRemoveFromGuide = (id: number) => {
        setGuideExercises(guideExercises.filter(ex => ex.id !== id));
    };

    const handleAddToGuide = (exercise: Exercise) => {
        if (!guideExercises.some(ex => ex.id === exercise.id)) {
            setGuideExercises([...guideExercises, exercise]);
        }
    };

    const handleDragStart = (e: React.DragEvent, id: number) => {
        e.dataTransfer.setData("exerciseId", id.toString());
    };

    const handleDrop = (e: React.DragEvent, targetIndex: number) => {
        e.preventDefault();
        const exerciseId = parseInt(e.dataTransfer.getData("exerciseId"), 10);
        if (!exerciseId) return;

        const fromLibrary = exercises.find(ex => ex.id === exerciseId);
        const fromGuide = guideExercises.find(ex => ex.id === exerciseId);
        if (!fromLibrary && !fromGuide) return;

        let updated = [...guideExercises];
        if (fromLibrary && !guideExercises.some(ex => ex.id === exerciseId)) {
            updated.push(fromLibrary);
        } else if (fromGuide) {
            const draggedIdx = updated.findIndex(ex => ex.id === exerciseId);
            if (draggedIdx !== -1 && targetIndex !== draggedIdx) {
                const [moved] = updated.splice(draggedIdx, 1);
                updated.splice(targetIndex, 0, moved);
            }
        }
        setGuideExercises(updated);
    };

    const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); };

    const generateLatex = () => {
        const imgName = (url: string) => url.split('/').pop() || 'image.png';
        return `\\documentclass{article}
\\usepackage{amsmath}
\\usepackage{graphicx}
\\usepackage[utf8]{inputenc}
\\usepackage[T1]{fontenc}
\\usepackage[spanish]{babel}

\\title{${guideTitle || 'Guía de Ejercicios'}}
\\author{${guideAuthor || 'Autor'}}
\\date{\\today}

\\begin{document}

\\maketitle

${guideExercises.map((ex, idx) => {
    const imgUrl = ex.image_url || ex.imageUrl;
    return `\\section*{${idx + 1}. ${ex.title}}

${ex.description || ''}
${imgUrl ? `\n\\begin{figure}[h]\n\\centering\n\\includegraphics[width=0.8\\textwidth]{images/${imgName(imgUrl)}}\n\\end{figure}\n` : ''}
${ex.answer ? `\n\\subsection*{Resolución}\n\n${ex.answer}` : ''}`;
}).join('\n\n')}

\\end{document}`;
    };

    const saveGuide = async () => {
        const guideData = {
            title: guideTitle,
            author: guideAuthor,
            description: generateLatex(),
            exerciseIds: guideExercises.map(ex => ex.id),
            categoryIds: selectedCategories,
        };
        try {
            if (mode === 'edit' && guideId) {
                await guideService.update(guideId, guideData);
                showSuccess(t('guide.success-update'));
            } else {
                await guideService.create(guideData);
                showSuccess(t('guide.success-create'));
            }
            navigate('/dashboard', { state: { tab: 'guias' } });
        } catch {
            showError(t('guide.error-save'));
        }
    };

    const handleSave = () => {
        if (!guideTitle.trim()) {
            showError(t('guide.title-required'));
            return;
        }
        saveGuide();
    };

    const handleSaveAndExport = () => {
        if (!guideTitle.trim()) {
            showError(t('guide.title-required'));
            return;
        }
        setShowExportModal(true);
    };

    const handleExportComplete = async () => {
        await saveGuide();
    };

    const calculateTotalTime = () =>
        guideExercises.reduce((acc, ex) => acc + (parseInt(ex.duration || '0', 10) || 0), 0);

    const calculateAvgDifficulty = () => {
        if (guideExercises.length === 0) return 0;
        const sum = guideExercises.reduce((acc, ex) => acc + (ex.difficulty || 0), 0);
        return Math.round(sum / guideExercises.length);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex flex-col">
                <Navbar />
                <div className="flex items-center justify-center h-screen">
                    <div className="text-center space-y-3">
                        <div className="w-12 h-12 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto" />
                        <p className="text-slate-400 font-black text-sm">{t('guide.loading')}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Navbar />

            <div className="w-[70%] mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
                <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden flex flex-col min-h-[85vh]">

                    {/* Header */}
                    <div className="px-10 py-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
                        <div className="flex items-center gap-5">
                            <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-lg">
                                <FileText size={24} />
                            </div>
                            <div>
                                <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                                    {t(mode === 'edit' ? 'guide.title-edit' : 'guide.title-create')}
                                </h1>
                                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">
                                    Documento ID: #GU-{guideId || '0042'}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => navigate('/dashboard', { state: { tab: 'guias' } })}
                            className="flex items-center gap-2 px-4 py-2 text-slate-400 font-bold hover:text-slate-900 transition-colors"
                        >
                            <ArrowLeft size={18} strokeWidth={2.5} /> {t(mode === 'edit' ? 'common.back' : 'guide.back')}
                        </button>
                    </div>

                    {/* Body */}
                    <div className="flex flex-col lg:flex-row flex-grow">

                        {/* Left — Edición */}
                        <div className="lg:w-2/3 p-10 space-y-12 border-r border-slate-100 overflow-y-auto">
                            <GuideMetadata
                                title={guideTitle}
                                onTitleChange={setGuideTitle}
                                author={guideAuthor}
                                onAuthorChange={setGuideAuthor}
                                categories={categories}
                                selectedCategories={selectedCategories}
                                onCategoriesChange={setSelectedCategories}
                            />

                            <GuideExercisesList
                                exercises={guideExercises}
                                onRemove={handleRemoveFromGuide}
                                onDragStart={handleDragStart}
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}
                                onPreview={() => {}}
                            />
                        </div>

                        {/* Right — Biblioteca */}
                        <div className="lg:w-1/3 bg-slate-50/50 flex flex-col overflow-hidden">
                            <div className="p-8 flex-grow overflow-y-auto">
                                <ExerciseSearch
                                    searchQuery={searchQuery}
                                    onSearchChange={handleSearch}
                                    filteredExercises={filteredExercises}
                                    onAddExercise={handleAddToGuide}
                                    guideExercises={guideExercises}
                                    onRemoveExercise={handleRemoveFromGuide}
                                    onOpenPicker={() => setShowPicker(true)}
                                    categories={categories}
                                    selectedCategories={selectedCategories}
                                    onCategoriesChange={setSelectedCategories}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="px-10 py-8 border-t border-slate-100 bg-slate-50/50 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex gap-10">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('guide.resolution-time')}</span>
                                <span className="text-slate-900 font-black">
                                    {calculateTotalTime() > 0 ? `~ ${calculateTotalTime()} min` : '—'}
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('guide.avg-difficulty')}</span>
                                <div className="flex gap-1 mt-1">
                                    {[...Array(5)].map((_, i) => (
                                        <div key={i} className={`w-2 h-2 rounded-full ${i < calculateAvgDifficulty() ? 'bg-amber-400' : 'bg-slate-200'}`} />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 w-full md:w-auto">
                            <button
                                onClick={() => { setPreviewTab('render'); setShowPreview(true); }}
                                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-black hover:bg-slate-50 transition-all shadow-sm text-sm"
                            >
                                <Eye size={18} /> {t('guide.preview')}
                            </button>
                            <button
                                onClick={handleSave}
                                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 bg-black text-white rounded-2xl font-black hover:bg-gray-700 transition-all active:scale-95 text-sm"
                            >
                                <Save size={18} strokeWidth={3} /> {t(mode === 'edit' ? 'common.update' : 'common.save')}
                            </button>
                            <button
                                onClick={handleSaveAndExport}
                                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 bg-rose-500 text-white rounded-2xl font-black shadow-xl shadow-rose-200 hover:bg-rose-600 transition-all active:scale-95 text-sm"
                            >
                                <Download size={18} strokeWidth={3} /> {t('guide.export')}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex items-center gap-4 text-slate-400 font-bold text-sm bg-white/50 p-6 rounded-3xl border border-slate-100">
                    <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
                        <BookOpen size={16} />
                    </div>
                    <p>{t('guide.drag-hint')}</p>
                </div>
            </div>

            <Footer />

            <ExportGuideModal
                isOpen={showExportModal}
                onClose={() => setShowExportModal(false)}
                onExportComplete={handleExportComplete}
                guideTitle={guideTitle}
                guideAuthor={guideAuthor}
                exercises={guideExercises}
            />

            <GuidePreviewModal
                isOpen={showPreview}
                onClose={() => setShowPreview(false)}
                previewTab={previewTab}
                onTabChange={setPreviewTab}
                guideTitle={guideTitle}
                guideAuthor={guideAuthor}
                guideExercises={guideExercises}
                generateLatex={generateLatex}
            />

            <ExercisePicker
                isOpen={showPicker}
                onClose={() => setShowPicker(false)}
                exercises={exercises}
                guideExercises={guideExercises}
                categories={categories}
                onAddExercise={handleAddToGuide}
                onRemoveExercise={handleRemoveFromGuide}
            />

            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
            `}</style>
        </div>
    );
};

export default GuideForm;
