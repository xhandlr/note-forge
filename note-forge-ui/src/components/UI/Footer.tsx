import React from "react";
import { useTranslation } from "react-i18next";

// UI Components
import Icon from "./Icon";

function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="bg-white border-t border-slate-200 py-16 mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="col-span-2">
                    <Icon
                        size="w-10 h-10"
                        type="logotype"
                        fontSize="text-2xl"
                    />
                    <p className="mt-4 text-slate-500 max-w-sm font-medium text-sm leading-relaxed">
                        {t('footer.description')}
                    </p>
                </div>
                <div>
                    <h4 className="font-black text-slate-900 mb-6 uppercase tracking-wider text-xs">
                        {t('footer.contact')}
                    </h4>
                    <ul className="space-y-4 text-slate-500 font-bold text-sm">
                        <li>
                            <a
                                href="https://github.com/xhandlr/note-forge"
                                className="hover:text-rose-500 transition-colors"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                GitHub
                            </a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-black text-slate-900 mb-6 uppercase tracking-wider text-xs">
                        {t('footer.thanks')}
                    </h4>
                    <ul className="space-y-4 text-slate-500 font-bold text-sm">
                        <li>
                            <a
                                href="https://www.flaticon.com/free-icons/online-class"
                                className="hover:text-slate-900 transition-colors"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Flaticon
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-200">
                <p className="text-center text-slate-500 font-bold text-sm">
                    &copy; {new Date().getFullYear()} Note Forge. Todos los derechos reservados.
                </p>
            </div>
        </footer>
    );
}

export default Footer;