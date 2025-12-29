import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
    children: React.ReactNode;
    variant?: "primary" | "secondary";
    className?: string;
    to?: string;
    href?: string;
    [key: string]: any;
}

function Button({ children, variant = "primary", className = "", to, href, ...props }: ButtonProps) {
    const base = "w-full py-5 rounded-2xl font-bold text-lg transition-all shadow-lg active:scale-95 cursor-pointer";
    const variants = {
        primary: "bg-slate-900 text-white hover:bg-gray-800",
        secondary: "bg-gray-500/20 text-black border border-gray-300 hover:bg-gray-700 hover:text-white",
    };

    const classes = `${base} ${variants[variant]} ${className}`

    if (to) {
        return (
            <Link to={to} className={classes} {...props}>
                {children}
            </Link>
        );
    }
    if (href) {
        return (
            <a href={href} className={classes} {...props}>
                {children}
            </a>
        );
    }
    return (
        <button className={classes} {...props}>
            {children}
        </button>
    );
}

export default Button;