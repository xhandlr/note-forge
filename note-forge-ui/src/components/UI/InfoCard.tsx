import React from "react";

interface InfoCardProps {
    title: string;
    image: string;
    alt: string;
    description?: string;
    color?: string; // e.g., "bg-white", "bg-gray-100"
    size?: string; // e.g., "h-5/6", "h-4/6"
    sizeImage?: string; // e.g., "w-5/6 h-5/6", "w-4/6 h-4/6"
    [key: string]: any; // Other props
}

function InfoCard({ title, image, alt, description = "", color = "bg-white", size = "h-5/6", sizeImage = "w-5/6 h-5/6", ...props }: InfoCardProps) {

    const base = "p-6 rounded-lg shadow-md flex-1 m-4 hover:shadow-lg hover:scale-105 transition-transform duration-200 flex flex-col justify-center items-center";

    const images = import.meta.glob('/src/assets/*', { eager: true, query: '?url', import: 'default' });

    const imageSrc = images[`/src/assets/${image}`] as string;

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