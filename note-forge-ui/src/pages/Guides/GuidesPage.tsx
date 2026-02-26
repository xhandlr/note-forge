import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from '../../components/Dashboard/Navbar';
import Footer from '../../components/UI/Footer';
import BgDecoration from '../../components/UI/BgDecoration';
import { getGuides, deleteGuide } from "../../services/GuideService";
import { Plus, Search, FileText, Edit3, Trash2, BookOpen } from 'lucide-react';
import { useNotification } from '../../contexts/NotificationContext';

function GuidesPage() {
    const navigate = useNavigate();
    const { showSuccess, showError } = useNotification();
    const [guides, setGuides] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getGuides()
            .then((data) => setGuides(data || []))
            .catch(() => setGuides([]))
            .finally(() => setLoading(false));
    }, []);

    const filteredGuides = guides.filter(g =>
        !searchQuery || g.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete = async (id: number) => {
        if (!window.confirm('¿Eliminar esta guía?')) return;
        try {
            await deleteGuide(id);
            setGuides(prev => prev.filter(g => g.id !== id));
            showSuccess('Guía eliminada');
        } catch {
            showError('Error al eliminar la guía');
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <BgDecoration file="orange.png" position="top-0 left-0" />
            <BgDecoration file="yellow.png" position="top-0 right-0" />
            <Navbar />

            <div className="w-[70%] mx-auto px-4 sm:px-6 lg:px-8 py-10 mt-16 space-y-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Mis Guías</h1>
                        <p className="text-slate-400 font-semibold text-sm mt-1">
                            {guides.length} guía{guides.length !== 1 ? 's' : ''} creada{guides.length !== 1 ? 's' : ''}
                        </p>
                    </div>
                    <button
                        onClick={() => navigate('/create-guide')}
                        className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl font-black text-sm hover:bg-rose-500 transition-all shadow-lg"
                    >
                        <Plus size={18} strokeWidth={3} /> Nueva Guía
                    </button>
                </div>

                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input
                        type="text"
                        placeholder="Buscar guías..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-14 pr-5 py-4 bg-white border-2 border-slate-100 rounded-[1.5rem] outline-none focus:ring-4 focus:ring-rose-100 focus:border-rose-400 transition-all font-semibold text-slate-700"
                    />
                </div>

                {/* Content */}
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="w-12 h-12 border-4 border-rose-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : filteredGuides.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-[2.5rem] border-2 border-dashed border-slate-100">
                        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <FileText size={28} className="text-slate-200" />
                        </div>
                        <p className="text-slate-300 font-black text-lg">
                            {searchQuery ? 'Sin resultados' : 'Aún no tienes guías'}
                        </p>
                        {!searchQuery && (
                            <button
                                onClick={() => navigate('/create-guide')}
                                className="mt-6 px-6 py-3 bg-rose-500 text-white rounded-2xl font-black text-sm hover:bg-rose-600 transition-all shadow-lg shadow-rose-200"
                            >
                                Crear primera guía
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filteredGuides.map(guide => (
                            <div
                                key={guide.id}
                                className="bg-white rounded-[1.5rem] border border-slate-200 shadow-lg overflow-hidden group hover:border-rose-200 hover:shadow-xl transition-all cursor-pointer"
                                onClick={() => navigate(`/guide/${guide.id}`)}
                            >
                                {/* Cover */}
                                <div
                                    className="aspect-[4/3] bg-slate-900 relative overflow-hidden flex flex-col items-center justify-center p-5"
                                    onClick={() => navigate(`/guide/${guide.id}`)}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900" />
                                    <div className="relative z-10 text-center space-y-1.5 w-full">
                                        <div className="w-8 h-8 bg-rose-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                                            <FileText size={15} className="text-white" />
                                        </div>
                                        <p className="text-white font-black text-xs leading-tight line-clamp-2">{guide.title}</p>
                                        {guide.author && (
                                            <p className="text-slate-400 text-[9px] font-bold">{guide.author}</p>
                                        )}
                                    </div>
                                    <div className="absolute bottom-3 left-3 right-3 space-y-1 opacity-20">
                                        <div className="h-0.5 bg-white rounded-full w-full" />
                                        <div className="h-0.5 bg-white rounded-full w-4/5" />
                                        <div className="h-0.5 bg-white rounded-full w-3/5" />
                                    </div>
                                    <div className="absolute inset-0 bg-rose-500/0 group-hover:bg-rose-500/10 transition-colors" />
                                </div>

                                {/* Info */}
                                <div className="p-3.5 space-y-3" onClick={e => e.stopPropagation()}>
                                    <div>
                                        <h4 className="font-black text-slate-900 text-xs leading-tight line-clamp-1">{guide.title}</h4>
                                        <p className="text-slate-400 text-[10px] font-semibold mt-0.5 flex items-center gap-1">
                                            <BookOpen size={10} />
                                            {guide.exercise_count ?? 0} ejercicio{(guide.exercise_count ?? 0) !== 1 ? 's' : ''}
                                        </p>
                                    </div>
                                    <div className="flex gap-1.5">
                                        <button
                                            onClick={() => navigate(`/edit-guide/${guide.id}`)}
                                            className="flex-1 flex items-center justify-center gap-1 py-2 bg-slate-50 text-slate-700 rounded-lg font-black text-[10px] hover:bg-slate-900 hover:text-white transition-all"
                                        >
                                            <Edit3 size={11} /> Editar
                                        </button>
                                        <button
                                            onClick={() => handleDelete(guide.id)}
                                            className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                                        >
                                            <Trash2 size={13} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}

export default GuidesPage;
