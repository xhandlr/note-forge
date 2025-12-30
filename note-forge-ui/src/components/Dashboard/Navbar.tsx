import React, { useState, useEffect} from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useNotification } from '../../contexts/NotificationContext';
import { useDemoMode } from '../../contexts/DemoContext';
import { Search, LogOut } from 'lucide-react';

// UI Components
import Icon from "../UI/Icon";
import Button from "../UI/Button";
import LanguageToggle from "../UI/LanguageToggle";

// Login Service
import { logoutUser } from "../../services/LoginService";

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();
    const { showSuccess, showError } = useNotification();
    const { isDemoMode, disableDemoMode } = useDemoMode();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    // User is "authenticated" if logged in OR in demo mode
    const isAuthenticated = isLoggedIn || isDemoMode;

    const handleLogout = async () => {
        // If in demo mode, just disable it and go home
        if (isDemoMode) {
            disableDemoMode();
            showSuccess('Saliste del modo demo');
            navigate("/");
            return;
        }

        // Otherwise, normal logout
        try {
            await logoutUser();
            setIsLoggedIn(false);
            showSuccess(t('messages.logoutSuccess'));
            navigate("/");
        } catch (error) {
            if (error instanceof Error) {
                showError(error.message);
            } else {
                showError(t('messages.logoutError'));
            }
        }
    };

    return (
        <nav className="w-full fixed top-0 left-0 bg-white/90 backdrop-blur-md text-slate-800 border-b border-slate-100 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 lg:h-20">
                    {/* Logo - left side */}
                    <Link to="/">
                        <Icon
                            size="w-8 h-8"
                            type="logotype"
                            fontSize="text-xl"
                        />
                    </Link>

                    {/* Navigation links - center (desktop only) */}
                    <div className="hidden md:flex items-center gap-8">
                        {isAuthenticated && (
                            <>
                                <Link
                                    to="/dashboard"
                                    className={`flex items-center gap-2 px-1 py-2 text-sm font-black transition-all border-b-2 ${
                                        location.pathname === '/dashboard'
                                            ? 'text-rose-600 border-rose-600'
                                            : 'text-slate-500 border-transparent hover:text-rose-500'
                                    }`}
                                >
                                    {t('navbar.dashboard')}
                                </Link>
                                <Link
                                    to="/create-guide"
                                    className={`flex items-center gap-2 px-1 py-2 text-sm font-black transition-all border-b-2 ${
                                        location.pathname === '/create-guide'
                                            ? 'text-rose-600 border-rose-600'
                                            : 'text-slate-500 border-transparent hover:text-rose-500'
                                    }`}
                                >
                                    {t('navbar.export-guides')}
                                </Link>
                                <Link
                                    to="/search"
                                    className={`text-slate-500 hover:text-amber-600 px-1 py-2 text-sm font-black transition-all border-b-2 border-transparent flex items-center gap-2 ${
                                        location.pathname === '/search'
                                            ? 'text-amber-600'
                                            : ''
                                    }`}
                                >
                                    <Search size={18} /> {t('navbar.search')}
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Right side buttons */}
                    <div className="flex items-center gap-4">
                        {isAuthenticated ? (
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2 rounded-xl text-sm font-black hover:bg-rose-600 transition-all shadow-sm"
                            >
                                {isDemoMode ? 'Salir del Demo' : t('navbar.logout')} <LogOut size={16} />
                            </button>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link
                                    to="/login"
                                    className="text-slate-600 text-sm font-black px-3 py-2 hover:text-slate-900 transition-colors"
                                >
                                    {t('navbar.login')}
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-rose-500 text-white px-6 py-2.5 rounded-xl text-sm font-black hover:bg-rose-600 transition-all shadow-md"
                                >
                                    Registrarse
                                </Link>
                            </div>
                        )}

                        {/* Language selector */}
                        <LanguageToggle />

                        {/* Mobile menu button - mobile only when authenticated */}
                        {isAuthenticated && (
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="md:hidden inline-flex items-center justify-center p-3 rounded-[1.5rem] text-slate-500 hover:text-white hover:bg-slate-900 focus:outline-none transition-all shadow-lg"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
                                    {isMobileMenuOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isAuthenticated && isMobileMenuOpen && (
                <div className="md:hidden border-t border-slate-200 bg-white shadow-xl">
                    <div className="px-4 pt-4 pb-4 space-y-3">
                        <Link
                            to="/dashboard"
                            className="block px-6 py-3 text-base font-black text-slate-700 hover:text-white hover:bg-slate-900 rounded-[2rem] transition-all shadow-lg"
                        >
                            {t('navbar.dashboard')}
                        </Link>
                        <Link
                            to="/create-guide"
                            className="block px-6 py-3 text-base font-black text-slate-700 hover:text-white hover:bg-slate-900 rounded-[2rem] transition-all shadow-lg"
                        >
                            {t('navbar.export-guides')}
                        </Link>
                        <Link
                            to="/search"
                            className="block px-6 py-3 text-base font-black text-slate-700 hover:text-white hover:bg-slate-900 rounded-[2rem] transition-all shadow-lg"
                        >
                            {t('navbar.search')}
                        </Link>
                        <div className="pt-3 border-t border-slate-200">
                            <button
                                onClick={handleLogout}
                                className="w-full bg-slate-100 text-slate-700 text-base px-6 py-3 rounded-[2rem] font-black hover:bg-rose-500 hover:text-white transition-all shadow-lg transform active:scale-95"
                            >
                                {isDemoMode ? 'Salir del Demo' : t('navbar.logout')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;