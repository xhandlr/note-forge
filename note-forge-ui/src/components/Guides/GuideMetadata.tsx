import React from 'react';
import { Type } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Category {
    id: number;
    name: string;
}

interface GuideMetadataProps {
    title: string;
    onTitleChange: (title: string) => void;
    author: string;
    onAuthorChange: (author: string) => void;
    categories: Category[];
    selectedCategories: number[];
    onCategoriesChange: (ids: number[]) => void;
}

const GuideMetadata: React.FC<GuideMetadataProps> = ({
    title,
    onTitleChange,
    author,
    onAuthorChange,
    categories,
    selectedCategories,
    onCategoriesChange
}) => {
    const { t } = useTranslation();

    return (
        <section className="space-y-6">
            <div className="flex items-center gap-2 text-rose-500">
                <Type size={18} strokeWidth={2.5} />
                <h2 className="text-sm font-black uppercase tracking-widest">{t('guide.general-config')}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 ml-1">{t('guide.title-label')} *</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => onTitleChange(e.target.value)}
                        placeholder={t('guide.title-placeholder')}
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-rose-100 focus:border-rose-400 transition-all font-bold text-slate-700"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 ml-1">{t('guide.author-label')}</label>
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => onAuthorChange(e.target.value)}
                        placeholder={t('guide.author-placeholder')}
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-rose-100 focus:border-rose-400 transition-all font-bold text-slate-700"
                    />
                </div>
            </div>
        </section>
    );
};

export default GuideMetadata;
