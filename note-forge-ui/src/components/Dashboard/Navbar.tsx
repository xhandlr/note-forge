import React, { useState, useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

// UI Components
import Icon from "../UI/Icon";
import Button from "../UI/Button";
import LanguageToggle from "../UI/LanguageToggle";

// Login Service
import { logoutUser } from "../../services/LoginService";

function Navbar() {
    const navigate = useNavigate();
    const { t } = useTranslation();
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
            alert(t('messages.logoutSuccess'));
            navigate("/");
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message);
            } else {
                alert(t('messages.logoutError'));
            }
        }
    };

    return (
        <nav className="w-full fixed top-0 left-0 bg-white bg-opacity-95 backdrop-blur-sm text-gray-800 border-b border-gray-200 shadow-lg z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center h-16">
                    {/* Logo and title - left side */}
                    <div className="flex items-center space-x-4 flex-1">
                        <Icon
                            size="w-10 h-10"
                            type="dark"
                        />
                        <h1 className="text-gray-800 text-xl lg:text-2xl font-bold hidden sm:block">
                            {t('navbar.title')}
                        </h1>
                    </div>

                    {/* Navigation links - center (desktop only) */}
                    {isLoggedIn && (
                        <div className="hidden md:flex flex-1 justify-center">
                            <div className="flex space-x-8">
                                <Link
                                    to="/dashboard"
                                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-gray-100"
                                >
                                    {t('navbar.dashboard')}
                                </Link>
                                <Link
                                    to="/export"
                                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-gray-100"
                                >
                                    {t('navbar.export-guides')}
                                </Link>
                                <Link
                                    to="/search"
                                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-gray-100"
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
                            <Button
                                children={t('navbar.login')}
                                to={"/login"}
                            />
                        )}

                        {/* Logout button - desktop only when logged in */}
                        {isLoggedIn && (
                            <div className="hidden md:block">
                                <Button
                                    variant="secondary"
                                    children={t('navbar.logout')}
                                    onClick={handleLogout}
                                />
                            </div>
                        )}

                        {/* Language selector */}
                        <LanguageToggle />

                        {/* Mobile menu button - mobile only when logged in */}
                        {isLoggedIn && (
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    {isMobileMenuOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isLoggedIn && isMobileMenuOpen && (
                <div className="md:hidden border-t border-gray-200 bg-white">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <Link
                            to="/dashboard"
                            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                        >
                            {t('navbar.dashboard')}
                        </Link>
                        <Link
                            to="/export"
                            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                        >
                            {t('navbar.export-guides')}
                        </Link>
                        <Link
                            to="/search"
                            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                        >
                            {t('navbar.search')}
                        </Link>
                        <div className="pt-2 border-t border-gray-200">
                            <div className="px-3">
                                <Button
                                    variant="secondary"
                                    children={t('navbar.logout')}
                                    onClick={handleLogout}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;