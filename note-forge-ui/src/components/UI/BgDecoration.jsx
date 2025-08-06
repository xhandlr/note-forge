import React from "react";

function BgDecoration({file, position = "top-0 left-0",size = "w-xs h-xs", ...props}) {
    
    const images = import.meta.glob('/src/assets/*', { eager: true, as: 'url' });
    const src = images[`/src/assets/${file}`];

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