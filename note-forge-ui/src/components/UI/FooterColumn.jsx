import React from "react";

function FooterColumn({ title, links = [] }) {
    return (
        <div className="max-w-4xl mx-auto px-4 mb-6 py-8 gap-10">
            <h3 className="text-lg font-medium mb-3 font-semibold">{title}</h3>
            <ul className="space-y-4">
                {links.map((link, index) => (
                    <li key={index}>
                        <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-600 transition-colors"
                        >
                            {link.value}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FooterColumn;