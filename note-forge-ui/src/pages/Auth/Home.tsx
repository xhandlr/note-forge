import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Megaphone, UserRound } from 'lucide-react';
import { useTranslation } from "react-i18next";

// UI Components
import Navbar from '../../components/Dashboard/Navbar';
import Footer from '../../components/UI/Footer';

const RoleCard: React.FC<{ role: string; icon: React.ReactNode; img: string }> = ({ role, icon, img }) => {
    const images = import.meta.glob('/src/assets/*', { eager: true, query: '?url', import: 'default' });
    const imageSrc = images[`/src/assets/${img}`] as string;

    return (
        <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-slate-200 flex flex-col items-center text-center transition-all hover:-translate-y-4 hover:border-rose-300 group">
            <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mb-10 text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-all shadow-inner border border-slate-100">
                {icon}
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mb-8 tracking-tight">{role}</h3>
            <img src={imageSrc} alt={role} className="w-full max-w-[220px] h-auto object-contain rounded-[3rem] shadow-sm group-hover:shadow-xl transition-all" />
        </div>
    );
};

/**
 * Home page component.
 * Displays the presentation of the application.
 * Allows users to navigate to the login page.
 *
 * @component
 * @returns {JSX.Element}
 */
function Home() {
    const { t } = useTranslation();
    const images = import.meta.glob('/src/assets/*', { eager: true, query: '?url', import: 'default' });
    const heroImage = images['/src/assets/home-image.png'] as string;

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Navbar />

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 flex flex-col lg:flex-row items-center gap-16 mt-16">
                <div className="lg:w-1/2 space-y-8 text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-full text-amber-600 text-xs font-black uppercase tracking-wide border border-amber-200">
                        Forja tu futuro educativo
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-black text-slate-900 leading-tight tracking-tight">
                        Note <br/>Forge<span className="text-rose-500">.</span>
                    </h1>
                    <p className="text-lg lg:text-xl text-slate-600 font-bold leading-relaxed max-w-xl">
                        {t('home.description')}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-4">
                        <Link
                            to="/register"
                            className="inline-block bg-slate-900 text-white text-base px-8 py-3 rounded-[2rem] font-black hover:bg-rose-500 transition-all shadow-xl transform active:scale-95"
                        >
                            {t('button.start')}
                        </Link>
                        <Link
                            to="/login"
                            className="text-base font-black text-slate-500 hover:text-rose-600 transition-colors flex items-center gap-2 group"
                        >
                            {t('home.create-exercises')} <span className="group-hover:translate-x-2 transition-transform text-rose-500">→</span>
                        </Link>
                    </div>
                </div>
                <div className="lg:w-1/2 relative">
                    <div className="relative z-10">
                        <div className="absolute inset-0 bg-amber-400 blur-[80px] opacity-15 -rotate-12 rounded-full" />
                        <img
                            src={heroImage}
                            alt="Note Forge"
                            className="w-full h-auto rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.12)] rotate-2 border-8 border-white relative z-10"
                        />
                        <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-rose-400/20 rounded-full blur-[60px] animate-pulse" />
                    </div>
                </div>
            </section>

            <section className="bg-slate-900 py-16 rounded-t-[4rem] lg:rounded-t-[6rem] mt-32 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 space-y-3">
                        <h2 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                            {t('home.made-for-you')}
                        </h2>
                        <p className="text-slate-400 text-sm lg:text-base font-medium max-w-2xl mx-auto leading-relaxed">
                            Una forja diseñada para estudiantes y educadores que no se conforman con lo básico.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <RoleCard
                            role={t('roles.student')}
                            icon={<GraduationCap size={56} />}
                            img="student.png"
                        />
                        <RoleCard
                            role={t('roles.assistant')}
                            icon={<Megaphone size={56} />}
                            img="assistant.png"
                        />
                        <RoleCard
                            role={t('roles.teacher')}
                            icon={<UserRound size={56} />}
                            img="teacher.png"
                        />
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default Home;