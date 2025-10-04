import React, { useState } from 'react';

interface ImageUploaderProps {
    onImageSelect: (file: File | null) => void;
}

function ImageUploader({ onImageSelect }: ImageUploaderProps) {
    const [image, setImage] = useState<string | null>(null);
    const [error, setError] = useState('');

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            if (!file.type.startsWith('image/')) {
                setError('Por favor, selecciona un archivo de imagen válido.');
                return;
            }

            if (file.size > 5 * 1024 * 1024) {
                setError('La imagen no debe superar los 5MB.');
                return;
            }

            setImage(URL.createObjectURL(file));
            setError('');
            onImageSelect(file);
        }
    };

    const removeImage = () => {
        setImage(null);
        onImageSelect(null);
    };

    return (
        <div className="flex flex-col items-center justify-center w-full">
            {!image ? (
                <label className="flex flex-col items-center justify-center w-1/2 h-60 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sm text-gray-600 font-medium">Haz clic para subir una imagen</span>
                    <span className="text-xs text-gray-500 mt-1">PNG, JPG o JPEG (máx. 5MB)</span>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                    />
                </label>
            ) : (
                <div className="relative w-1/2 h-60 border border-gray-300 rounded-lg overflow-hidden">
                    <img src={image} alt="Preview" className="w-full h-full object-contain" />
                    <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            )}

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
    );
}

export default ImageUploader;