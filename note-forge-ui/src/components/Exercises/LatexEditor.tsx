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
        <>
            <textarea
                name={name}
                value={value || ''}
                onChange={onChange}
                rows={6}
                className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] outline-none focus:ring-4 focus:ring-rose-100 focus:border-rose-400 transition-all resize-none font-bold text-sm leading-relaxed text-slate-800"
                placeholder="Escribe aquí en formato LaTeX (usa \( ... \) para matemáticas en línea o \[ ... \] para ecuaciones en bloque)"
            />

            <div className="space-y-3 w-full mt-6">
                <div className="flex items-center gap-2 text-slate-400 font-black uppercase text-[10px] tracking-widest ml-4">
                    Vista Previa:
                </div>
                <div className="min-h-[120px] w-full bg-slate-50/50 border-2 border-slate-100 rounded-[1.5rem] p-5 text-slate-600 font-medium text-sm">
                    <div
                        className="prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: latexPreview || "Aquí aparecerá el renderizado..." }}
                    />
                </div>
            </div>
        </>
    );
}

export default LatexEditor;