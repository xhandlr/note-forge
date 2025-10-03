import React from "react";

interface FooterLink {
    value: string;
    href: string;
}

interface FooterColumnProps {
    title: string;
    links: FooterLink[];
}

function FooterColumn({ title, links }: FooterColumnProps) {
    return (
        <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg mb-2">{title}</h3>
            <ul className="flex flex-col gap-2">
                {links.map((link, index) => (
                    <li key={index}>
                        <a 
                            href={link.href} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-pink-600 transition-colors"
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