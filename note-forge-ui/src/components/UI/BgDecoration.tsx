import React from "react";

interface BgDecorationProps {
    file: string;
    position?: string; // e.g., "top-0 left-0", "bottom-0 right-0"
    size?: string; // e.g., "w-xs h-xs", "w-sm h-sm"
    [key: string]: any; // Other props
}

function BgDecoration({file, position = "top-0 left-0",size = "w-xs h-xs", ...props}: BgDecorationProps) {

    const images = import.meta.glob('/src/assets/*', { eager: true, query: '?url', import: 'default' });

    const src = images[`/src/assets/${file}`] as string;

    const base = "absolute mt-0 mr-0 pointer-events-none select-none"

    return (
        <img
            src={src}
            alt=""
            className={`${base} ${position} ${size}`}
            style={{ zIndex: -1 }}
            {...props}
        >
        </img>
    );
}

export default BgDecoration;