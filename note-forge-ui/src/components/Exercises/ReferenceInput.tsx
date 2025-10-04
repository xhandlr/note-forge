import React, { useState } from 'react';

interface ReferenceItem {
    id: string;
    type: 'book' | 'link' | 'document';
    title: string;
    content: string;
}

interface ReferenceInputProps {
    references: ReferenceItem[];
    onChange: (references: ReferenceItem[]) => void;
    error?: string;
}

const ReferenceInput: React.FC<ReferenceInputProps> = ({ references, onChange, error }) => {
    const [showModal, setShowModal] = useState(false);
    const [currentType, setCurrentType] = useState<'book' | 'link' | 'document'>('book');
    const [referenceTitle, setReferenceTitle] = useState('');
    const [referenceContent, setReferenceContent] = useState('');

    const icons = {
        book: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
        ),
        link: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
        ),
        document: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
        )
    };

    const typeConfig = {
        book: {
            color: 'blue',
            placeholder: 'Ej: Cálculo de Stewart, Capítulo 3',
            titlePlaceholder: 'Título del libro'
        },
        link: {
            color: 'green',
            placeholder: 'https://example.com/resource',
            titlePlaceholder: 'Descripción del enlace'
        },
        document: {
            color: 'purple',
            placeholder: 'Nombre del documento o archivo',
            titlePlaceholder: 'Título del documento'
        }
    };

    const openModal = (type: 'book' | 'link' | 'document') => {
        setCurrentType(type);
        setReferenceTitle('');
        setReferenceContent('');
        setShowModal(true);
    };

    const addReference = () => {
        if (!referenceTitle.trim() || !referenceContent.trim()) return;

        const newReference: ReferenceItem = {
            id: Math.random().toString(36).substr(2, 9),
            type: currentType,
            title: referenceTitle,
            content: referenceContent,
        };

        const updatedReferences = [...references, newReference];
        onChange(updatedReferences);
        setShowModal(false);
    };

    const removeReference = (index: number) => {
        const updatedReferences = references.filter((_, i) => i !== index);
        onChange(updatedReferences);
    };

    const getColorClasses = (type: 'book' | 'link' | 'document') => {
        const config = typeConfig[type];
        return {
            bg: `bg-${config.color}-50`,
            text: `text-${config.color}-700`,
            border: `border-${config.color}-200`,
            hover: `hover:bg-${config.color}-100`
        };
    };

    return (
        <div>
            {/* Botones para agregar referencias */}
            <div className="flex gap-2 mb-4">
                <button
                    type="button"
                    onClick={() => openModal('book')}
                    className="px-4 py-2.5 bg-blue-50 text-blue-700 rounded-lg font-medium hover:bg-blue-100 transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                >
                    {icons.book}
                    Libro
                </button>
                <button
                    type="button"
                    onClick={() => openModal('link')}
                    className="px-4 py-2.5 bg-green-50 text-green-700 rounded-lg font-medium hover:bg-green-100 transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                >
                    {icons.link}
                    Link
                </button>
                <button
                    type="button"
                    onClick={() => openModal('document')}
                    className="px-4 py-2.5 bg-purple-50 text-purple-700 rounded-lg font-medium hover:bg-purple-100 transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                >
                    {icons.document}
                    Documento
                </button>
            </div>

            {/* Lista de referencias agregadas */}
            {references.length > 0 && (
                <div className="space-y-3 mb-4">
                    {references.map((ref, index) => {
                        const colors = getColorClasses(ref.type);
                        return (
                            <div
                                key={ref.id}
                                className={`flex items-center justify-between p-3 rounded-lg border ${colors.bg} ${colors.border} transition-all duration-200 hover:shadow-sm`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg ${colors.bg} ${colors.text}`}>
                                        {icons[ref.type]}
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-900">{ref.title}</div>
                                        <div className="text-sm text-gray-600">{ref.content}</div>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => removeReference(index)}
                                    className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}

            {error && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
            )}

            {/* Modal para agregar referencia */}
            {showModal && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 transform transition-all">
                        <div className="flex items-center gap-3 mb-4">
                            <div className={`p-2 rounded-lg ${getColorClasses(currentType).bg} ${getColorClasses(currentType).text}`}>
                                {icons[currentType]}
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">
                                Agregar {currentType === 'book' ? 'Libro' : currentType === 'link' ? 'Enlace' : 'Documento'}
                            </h3>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Título
                                </label>
                                <input
                                    type="text"
                                    value={referenceTitle}
                                    onChange={(e) => setReferenceTitle(e.target.value)}
                                    placeholder={typeConfig[currentType].titlePlaceholder}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {currentType === 'book' ? 'Referencia' : currentType === 'link' ? 'URL' : 'Documento'}
                                </label>
                                <input
                                    type="text"
                                    value={referenceContent}
                                    onChange={(e) => setReferenceContent(e.target.value)}
                                    placeholder={typeConfig[currentType].placeholder}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                type="button"
                                onClick={() => setShowModal(false)}
                                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                onClick={addReference}
                                className={`flex-1 px-4 py-2 ${getColorClasses(currentType).bg} ${getColorClasses(currentType).text} rounded-lg font-medium ${getColorClasses(currentType).hover} transition-colors`}
                            >
                                Agregar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReferenceInput;