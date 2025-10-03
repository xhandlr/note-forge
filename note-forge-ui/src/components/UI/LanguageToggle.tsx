import React from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageToggleProps {
    className?: string;
}

function LanguageToggle({ className = '' }: LanguageToggleProps) {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'es' : 'en';
        i18n.changeLanguage(newLang);
    }

    return (
        <button
            onClick={toggleLanguage}
            className={`inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${className}`}
        >
      <span className="mr-1">
        {i18n.language === 'es' ? '🇬🇧' : '🇪🇸'}
      </span>
            {i18n.language === 'es' ? 'EN' : 'ES'}
        </button>
    );
}

export default LanguageToggle;
