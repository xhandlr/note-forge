import React, { useState, useEffect } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

interface LatexEditorProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    name: string;
}

function LatexEditor({ value, onChange, name }: LatexEditorProps) {
    const [latexPreview, setLatexPreview] = useState('');

    useEffect(() => {
        if (value) {
            const content = value;
            const latexRegex = /(\\(?:\(|\[|\$\$?)[\s\S]*?\\(?:\)|\]|\$\$?))/g;
            const segments = content.split(latexRegex);

            let processedContent = '';
            segments.forEach(segment => {
                if (!segment) return;

                if (latexRegex.test(segment)) {
                    try {
                        const latexContent = segment
                            .replace(/^\\(\(|\[|\$\$?)/, '')
                            .replace(/\\(\)|\]|\$\$?)$/, '');

                        const displayMode = segment.startsWith('\\[') || segment.startsWith('$$');
                        processedContent += katex.renderToString(latexContent, {
                            displayMode: displayMode,
                            throwOnError: false
                        });
                    } catch (error) {
                        processedContent += `<span style="color: red;">Error en LaTeX: ${segment}</span>`;
                    }
                } else {
                    processedContent += segment
                        .replace(/&/g, '&amp;')
                        .replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;')
                        .replace(/\n/g, '<br/>');
                }
            });

            setLatexPreview(processedContent);
        }
    }, [value]);

    return (
        <div className="space-y-4">
            <div>
                <p className="text-xs text-gray-500 mb-2">Utilice \( ..\) o \[ ..\] para formato LaTeX</p>
                <textarea
                    name={name}
                    value={value || ''}
                    onChange={onChange}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all resize-none font-mono text-sm"
                    placeholder="Escribe aquí en formato LaTeX (usa \( ... \) para matemáticas en línea o \[ ... \] para ecuaciones en bloque)"
                    required
                />
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Vista Previa:</h3>
                <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: latexPreview }}
                />
            </div>
        </div>
    );
}

export default LatexEditor;