import React from "react";

// UI Components
import Icon from "./Icon";
import FooterColumn from "./FooterColumn";

function Footer() {
    return (
        <footer className="w-full min-h-[400px] bg-white mt-10 text-gray-800 border-t-2 border-gray-200 flex flex-col flex-grow">
            <div className="flex flex-row justify-around items-start w-full max-w-5xl mx-auto py-10">
                <div className="max-w-4xl mx-auto px-4 mb-6 py-8 gap-10">
                    <Icon 
                        size="w-25" 
                        type="logotype"
                    />
                </div>
                <FooterColumn
                    title="Agradecimientos"
                    links={[
                        {
                            value: "Online class icons by SBTS2018",
                            href: "https://www.flaticon.com/free-icons/online-class",
                        },
                        {
                            value: "Email marketing icons by SBTS2018",
                            href: "https://www.flaticon.com/free-icons/email-marketing",
                        },
                        {
                            value: "GPA icons by SBTS2018",
                            href: "https://www.flaticon.com/free-icons/gpa",
                        },
                        {
                            value: "More icons by sonnycandra",
                            href: "https://www.flaticon.com/free-icons/plus-button"
                        }
                        // Missing attributions of animations and illustrations
                    ]}
                />
                <FooterColumn 
                    title="Contacto"
                    links={[
                        {
                            value: "GitHub",
                            href: "https://github.com/xhandlr/note-forge"
                        }
                    ]}
                />
            </div>
            <div className="bg-gray-900 text-white py-4 w-full mt-auto">
                <div className="max-w-4xl mx-auto px-4 text-center text-sm">
                    &copy; {new Date().getFullYear()} Note Forge. Código abierto bajo MIT License.
                </div>
            </div>
        </footer>
    );
}

export default Footer;