import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

// UI Components
import Icon from "../UI/Icon";
import Button from "../UI/Button";

// Login Service
import { logoutUser } from "../../services/LoginService";

function Navbar() {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation(); // Hook de traducción

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
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

    // Función para cambiar idioma (opcional)
    const toggleLanguage = () => {
        const newLang = i18n.language === 'es' ? 'en' : 'es';
        i18n.changeLanguage(newLang);
    };

    return (
        <nav className="w-screen fixed top-0 left-0 bg-white text-black flex flex-row justify-between items-center p-8 px-20 border-b border-gray-200 shadow-md z-50">
            <div className="flex flex-row gap-x-8 items-center justify-center">
                <Icon
                    size="w-15"
                    type="dark"
                />
                <h1 className="text-gray-800 text-3xl logo-font">{t('navbar.title')}</h1>
            </div>
            <div className="flex flex-row space-x-3">
                {isLoggedIn ? (
                    <>
                        <Button
                            children={t('navbar.dashboard')}
                            to={"/dashboard"}
                        />
                        <Button
                            variant="secondary"
                            children={t('navbar.logout')}
                            onClick={handleLogout}
                        />
                    </>
                ) : (
                    <>
                        <Button
                            children={t('navbar.login')}
                            to={"/login"}
                        />
                    </>
                )}
                {/* Botón opcional para cambiar idioma */}
                <button onClick={toggleLanguage} className="ml-4">
                    {i18n.language === 'es' ? '🇬🇧 EN' : '🇪🇸 ES'}
                </button>
            </div>
        </nav>
    );
}

export default Navbar;