import React, { useState, useEffect } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

interface LatexEditorProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    name: string;
}

function applyTextCommands(text: string): string {
    return text
        .replace(/\\(begin|end)\{document\}/g, '')
        .replace(/\\documentclass(\[.*?\])?\{.*?\}/g, '')
        .replace(/\\usepackage(\[.*?\])?\{.*?\}/g, '')
        .replace(/\\textbf\{([^}]*)\}/g, '<strong>$1</strong>')
        .replace(/\\textit\{([^}]*)\}/g, '<em>$1</em>')
        .replace(/\\underline\{([^}]*)\}/g, '<u>$1</u>')
        .replace(/\\text\{([^}]*)\}/g, '$1')
        .replace(/\\emph\{([^}]*)\}/g, '<em>$1</em>')
        .replace(/\\(section|chapter)\*?\{([^}]*)\}/g, '<strong class="text-lg">$2</strong>')
        .replace(/\\subsection\*?\{([^}]*)\}/g, '<strong>$2</strong>')
        .replace(/\\\\/g, '<br/>')
        .replace(/\\newline/g, '<br/>')
        .replace(/\\par\b/g, '<br/><br/>');
}

function LatexEditor({ value, onChange, name }: LatexEditorProps) {
    const [latexPreview, setLatexPreview] = useState('');

    useEffect(() => {
        if (value) {
            const latexRegex = /(\\(?:\(|\[)[\s\S]*?\\(?:\)|\])|\$\$[\s\S]*?\$\$)/g;
            const segments = value.split(latexRegex);

            let processedContent = '';
            segments.forEach(segment => {
                if (!segment) return;

                if (segment.startsWith('\\(') || segment.startsWith('\\[') || segment.startsWith('$$')) {
                    try {
                        const displayMode = segment.startsWith('\\[') || segment.startsWith('$$');
                        const latexContent = segment
                            .replace(/^(\\[\(\[]|\$\$)/, '')
                            .replace(/(\\[\)\]]|\$\$)$/, '');
                        processedContent += katex.renderToString(latexContent, {
                            displayMode,
                            throwOnError: false
                        });
                    } catch {
                        processedContent += `<span style="color: red;">Error en LaTeX: ${segment}</span>`;
                    }
                } else {
                    const escaped = segment
                        .replace(/&/g, '&amp;')
                        .replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;');
                    processedContent += applyTextCommands(escaped).replace(/\n/g, '<br/>');
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
