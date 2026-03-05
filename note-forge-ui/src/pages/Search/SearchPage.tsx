import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from '../../components/Dashboard/Navbar';
import BgDecoration from '../../components/UI/BgDecoration';
import Footer from '../../components/UI/Footer';
import { Search, Eye, Layers, Coffee, BookOpen, X, Filter, Edit } from 'lucide-react';
import { useCategoryService, useExerciseService, useGuideService } from '../../services/ServiceFactory';

type FilterType = 'all' | 'subjects' | 'exercises' | 'guides';

interface SearchResult {
  id: number;
  type: 'subject' | 'exercise' | 'guide';
  title: string;
  subtitle: string;
  date: string;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('es-CL', { day: '2-digit', month: 'short', year: 'numeric' });
}

const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [allResults, setAllResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);

  const categoryService = useCategoryService();
  const exerciseService = useExerciseService();
  const guideService = useGuideService();

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [categories, exercises, guides] = await Promise.all([
          categoryService.getAll(),
          exerciseService.getAll(),
          guideService.getAll(),
        ]);

        const levels = t('exercise.levels', { returnObjects: true }) as string[];

        const categoryResults: SearchResult[] = categories.map((c: any) => {
          const count = exercises.filter((e: any) => e.category_id === c.id).length;
          return {
            id: c.id,
            type: 'subject',
            title: c.name,
            subtitle: `${count} ${count !== 1 ? t('labels.exercises') : t('labels.exercise')}`,
            date: formatDate(c.created_at),
          };
        });

        const exerciseResults: SearchResult[] = exercises.map((e: any) => {
          const cat = categories.find((c: any) => c.id === e.category_id);
          const diff = levels[e.difficulty - 1] ?? `${e.difficulty}/5`;
          return {
            id: e.id,
            type: 'exercise',
            title: e.title,
            subtitle: `${cat?.name || t('labels.no-category')} • ${diff}`,
            date: formatDate(e.created_at),
          };
        });

        const guideResults: SearchResult[] = guides.map((g: any) => {
          const count = g.exercise_count ?? 0;
          return {
            id: g.id,
            type: 'guide',
            title: g.title,
            subtitle: `${g.author || t('search.no-author')} • ${count} ${count !== 1 ? t('labels.exercises') : t('labels.exercise')}`,
            date: formatDate(g.created_at),
          };
        });

        setAllResults([...categoryResults, ...exerciseResults, ...guideResults]);
      } catch (err) {
        console.error('Error cargando resultados de búsqueda:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filters: { key: FilterType; label: string }[] = [
    { key: 'all',       label: t('dashboard.filter-all') },
    { key: 'subjects',  label: t('labels.categories') },
    { key: 'exercises', label: t('labels.exercises') },
    { key: 'guides',    label: t('labels.guides') },
  ];

  const typeLabel: Record<SearchResult['type'], string> = {
    subject:  t('labels.category'),
    exercise: t('labels.exercise'),
    guide:    t('labels.guide'),
  };

  const filteredResults = allResults.filter(r => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'subjects'  && r.type === 'subject') ||
      (filter === 'exercises' && r.type === 'exercise') ||
      (filter === 'guides'    && r.type === 'guide');
    const matchesQuery = !query || r.title.toLowerCase().includes(query.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  const getTypeIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'subject':  return <Layers  size={20} className="text-amber-500" />;
      case 'exercise': return <Coffee  size={20} className="text-rose-500" />;
      case 'guide':    return <BookOpen size={20} className="text-slate-900" />;
    }
  };

  const getResultPath = (result: SearchResult) => {
    if (result.type === 'subject')  return `/category/${result.id}`;
    if (result.type === 'exercise') return `/exercise/${result.id}`;
    return `/guide/${result.id}`;
  };

  const getEditPath = (result: SearchResult) => {
    if (result.type === 'subject')  return `/edit-category/${result.id}`;
    if (result.type === 'exercise') return `/edit-exercise/${result.id}`;
    return `/edit-guide/${result.id}`;
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <BgDecoration file="orange.png" position="top-0 left-0" />
      <BgDecoration file="yellow.png" position="top-0 right-0" />

      <Navbar />

      <div className="w-[60%] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-left mt-20">

        {/* Barra de Búsqueda Global */}
        <div className="relative group">
          <div className="bg-white border-2 border-slate-100 rounded-[2.5rem] shadow-xl p-4 flex items-center gap-4 focus-within:border-rose-400 transition-all">
            <div className="p-3 bg-slate-50 rounded-xl text-slate-400 group-focus-within:text-rose-500 transition-colors">
              <Search size={24} strokeWidth={3} />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('search.placeholder')}
              className="flex-grow bg-transparent text-xl font-black text-slate-900 outline-none placeholder:text-slate-300"
              autoFocus
            />
            {query && (
              <button onClick={() => setQuery('')} className="p-3 text-slate-300 hover:text-slate-900 transition-colors">
                <X size={20} strokeWidth={3} />
              </button>
            )}
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white p-5 rounded-[2rem] shadow-lg border border-slate-200">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-2 text-slate-400 font-black uppercase text-[10px] tracking-widest">
              <Filter size={14} /> {t('search.filter-label')}
            </span>
            {filters.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-6 py-2.5 rounded-xl font-black text-sm transition-all ${
                  filter === key
                    ? 'bg-slate-900 text-white shadow-lg scale-105'
                    : 'bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-rose-500'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Contador */}
        <div className="flex justify-between items-center px-2">
          <h2 className="text-lg font-black text-slate-900">
            {t('search.results')} <span className="text-rose-500 ml-2">{loading ? '...' : filteredResults.length}</span>
          </h2>
          <span className="text-slate-400 font-semibold text-xs">{t('search.sort-relevance')}</span>
        </div>

        {/* Lista de Resultados */}
        <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden">
          {loading ? (
            <div className="py-20 flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-rose-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filteredResults.length > 0 ? (
            filteredResults.map((result, idx) => (
              <div
                key={`${result.type}-${result.id}`}
                className={`flex items-center gap-5 p-6 hover:bg-slate-50 transition-all group cursor-pointer ${
                  idx !== filteredResults.length - 1 ? 'border-b border-slate-100' : ''
                }`}
                onClick={() => navigate(getResultPath(result))}
              >
                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center group-hover:bg-white transition-all shadow-inner border border-transparent group-hover:border-slate-100">
                  {getTypeIcon(result.type)}
                </div>

                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded ${
                      result.type === 'subject'  ? 'bg-amber-100 text-amber-700' :
                      result.type === 'exercise' ? 'bg-rose-100 text-rose-700'   : 'bg-slate-100 text-slate-700'
                    }`}>
                      {typeLabel[result.type]}
                    </span>
                    {result.date && <span className="text-slate-300 font-semibold text-[10px]">{result.date}</span>}
                  </div>
                  <h3 className="text-base font-black text-slate-900 tracking-tight group-hover:text-rose-600 transition-colors">
                    {result.title}
                  </h3>
                  <p className="text-slate-400 font-semibold text-xs mt-0.5">{result.subtitle}</p>
                </div>

                <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                  <Link
                    to={getResultPath(result)}
                    className="p-2.5 bg-white text-slate-400 rounded-xl border border-slate-100 hover:text-rose-500 hover:border-rose-200 hover:shadow-md transition-all"
                    title={t('common.view')}
                  >
                    <Eye size={18} />
                  </Link>
                  <Link
                    to={getEditPath(result)}
                    className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:text-rose-500 hover:bg-rose-50 transition-all"
                    title={t('common.edit')}
                  >
                    <Edit size={18} strokeWidth={2.5} />
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center space-y-6">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-200">
                <Search size={36} />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900">{t('search.empty-title')}</h3>
                <p className="text-slate-400 font-semibold mt-2 text-sm">{t('search.empty-desc')}</p>
              </div>
              <button
                onClick={() => setQuery('')}
                className="bg-slate-900 text-white px-8 py-3 rounded-[1.5rem] font-black text-base hover:bg-rose-500 transition-all shadow-xl"
              >
                {t('search.clear')}
              </button>
            </div>
          )}
        </div>

        {/* Sugerencias */}
        <div className="bg-white p-7 lg:p-9 rounded-[2.5rem] shadow-xl border border-slate-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <h4 className="text-xl font-black tracking-tight text-slate-900">{t('search.create-prompt-title')}</h4>
              <p className="text-slate-500 font-semibold text-sm">{t('search.create-prompt-desc')}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => navigate('/create-exercise')}
                className="bg-rose-500 text-white px-6 py-3 rounded-[1.5rem] font-black text-base hover:bg-rose-600 transition-all shadow-lg shadow-rose-900/20"
              >
                {t('search.new-exercise')}
              </button>
              <button
                onClick={() => navigate('/create-category')}
                className="bg-slate-100 text-slate-600 px-6 py-3 rounded-[1.5rem] font-black text-base hover:bg-slate-200 transition-all"
              >
                {t('search.new-subject')}
              </button>
            </div>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
};

export default SearchPage;
