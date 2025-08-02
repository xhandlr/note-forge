import React from 'react';
import { Link } from 'react-router-dom';

function Button({ children, variant = "primary", className = "", to, href, ...props }) {
    const base = "rounded-md px-6 py-3";
    const variants = {
        primary: "bg-(--color-purple) text-white hover:bg-(--color-purple-hover) hover:scale-105 transition-transform flex justify-center",
        secondary: "bg-gray-500/20 text-black border border-gray-300 hover:bg-gray-400 hover:scale-105 transition-transform",
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