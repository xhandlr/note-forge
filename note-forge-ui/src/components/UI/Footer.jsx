import React from "react";

function Footer() {
    return (
        <footer className="w-full h-[400px] bg-white mt-10 text-gray-800 border-t-2 border-gray-200 flex flex-col flex-grow">
            <div className="flex flex-row justify-around items-center w-full max-w-5xl mx-auto py-10">
                <div className="max-w-4xl mx-auto px-4 mb-6 py-8 gap-10">
                    <h3 className="text-lg font-medium mb-3">Note Forge</h3>
                    <ul className="space-y-4">
                        <li>Inicio</li>
                        <li>Inicio de Sesión</li>
                        <li>Dashboard</li>
                    </ul>
                </div>
                <div className="max-w-4xl mx-auto px-4 mb-6 py-8 gap-10">
                    <h3 className="text-lg font-medium mb-3">Agradecimientos</h3>
                    <ul className="space-y-4">
                        <li>
                            <a
                                href="https://www.flaticon.com/free-icons/online-class"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-600 transition-colors"
                            >
                                Online class icons by SBTS2018
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.flaticon.com/free-icons/email-marketing"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-600 transition-colors"
                            >
                                Email marketing icons by SBTS2018
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.flaticon.com/free-icons/gpa"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-600 transition-colors"
                            >
                                GPA icons by SBTS2018
                            </a>
                            {/* Missing attributions of animations and illustrations */}
                        </li>
                    </ul>
                </div>
            </div>

            <div className="bg-gray-900 text-white py-4 w-full mt-auto h-1/4">
                <div className="max-w-4xl mx-auto px-4 text-center text-sm">
                    &copy; {new Date().getFullYear()} Note Forge. Código abierto bajo MIT License.
                </div>
            </div>
        </footer>
    );
}

export default Footer;