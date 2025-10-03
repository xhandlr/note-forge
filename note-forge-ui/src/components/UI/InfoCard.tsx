import React from "react";

function InfoCard({ title, image, alt, description = "", color = "bg-white", size = "h-5/6", sizeImage = "w-5/6 h-5/6", ...props }) {

    const base = "p-6 rounded-lg shadow-md flex-1 m-4 hover:shadow-lg hover:scale-105 transition-transform duration-200 flex flex-col justify-center items-center";

    const images = import.meta.glob('/src/assets/*', { eager: true, query: '?url', import: 'default' });

    const imageSrc = images[`/src/assets/${image}`];

    return (
        <div className={`${color} ${base} ${size}`}>
            <h1 className="text-xl font-semibold logo-font mb-8">{title}</h1>
            <img src={imageSrc} className={sizeImage} alt={alt} />
            {description
                ? <p className="mt-4 text-gray-600">{description}</p>
                : null
            }
        </div>
    );
}

export default InfoCard;