import React, { useState, useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useNotification } from '../../contexts/NotificationContext';

// UI Components
import Icon from "../UI/Icon";
import Button from "../UI/Button";
import LanguageToggle from "../UI/LanguageToggle";

// Login Service
import { logoutUser } from "../../services/LoginService";

function Navbar() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { showSuccess, showError } = useNotification();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = async () => {
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
        <nav className="w-full fixed top-0 left-0 bg-white bg-opacity-98 backdrop-blur-sm text-slate-800 border-b border-slate-200 shadow-xl z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center h-20">
                    {/* Logo and title - left side */}
                    <div className="flex items-center space-x-4 flex-1">
                        <Icon
                            size="w-8 h-8"
                            type="logotype"
                            fontSize="text-xl"
                        />
                    </div>

                    {/* Navigation links - center (desktop only) */}
                    {isLoggedIn && (
                        <div className="hidden md:flex flex-1 justify-center">
                            <div className="flex space-x-3">
                                <Link
                                    to="/dashboard"
                                    className="text-slate-600 hover:text-white hover:bg-slate-900 px-6 py-3 rounded-[1.5rem] text-sm font-black transition-all duration-200 shadow-sm hover:shadow-lg transform active:scale-95"
                                >
                                    {t('navbar.dashboard')}
                                </Link>
                                <Link
                                    to="/export"
                                    className="text-slate-600 hover:text-white hover:bg-slate-900 px-6 py-3 rounded-[1.5rem] text-sm font-black transition-all duration-200 shadow-sm hover:shadow-lg transform active:scale-95"
                                >
                                    {t('navbar.export-guides')}
                                </Link>
                                <Link
                                    to="/search"
                                    className="text-slate-600 hover:text-white hover:bg-slate-900 px-6 py-3 rounded-[1.5rem] text-sm font-black transition-all duration-200 shadow-sm hover:shadow-lg transform active:scale-95"
                                >
                                    {t('navbar.search')}
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* Right side buttons */}
                    <div className="flex items-center space-x-3 flex-1 justify-end">
                        {/* Login button - only when not logged in */}
                        {!isLoggedIn && (
                            <Link
                                to="/login"
                                className="inline-block bg-slate-900 text-white text-sm px-8 py-3 rounded-[2rem] font-black hover:bg-rose-500 transition-all shadow-lg transform active:scale-95"
                            >
                                {t('navbar.login')}
                            </Link>
                        )}

                        {/* Logout button - desktop only when logged in */}
                        {isLoggedIn && (
                            <div className="hidden md:block">
                                <button
                                    onClick={handleLogout}
                                    className="bg-slate-100 text-slate-700 text-sm px-8 py-3 rounded-[2rem] font-black hover:bg-rose-500 hover:text-white transition-all shadow-lg transform active:scale-95"
                                >
                                    {t('navbar.logout')}
                                </button>
                            </div>
                        )}

                        {/* Language selector */}
                        <LanguageToggle />

                        {/* Mobile menu button - mobile only when logged in */}
                        {isLoggedIn && (
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
            {isLoggedIn && isMobileMenuOpen && (
                <div className="md:hidden border-t border-slate-200 bg-white shadow-xl">
                    <div className="px-4 pt-4 pb-4 space-y-3">
                        <Link
                            to="/dashboard"
                            className="block px-6 py-3 text-base font-black text-slate-700 hover:text-white hover:bg-slate-900 rounded-[2rem] transition-all shadow-lg"
                        >
                            {t('navbar.dashboard')}
                        </Link>
                        <Link
                            to="/export"
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
                                {t('navbar.logout')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;