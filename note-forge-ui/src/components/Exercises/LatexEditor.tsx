import React, { useState, useEffect, useRef } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

interface LatexEditorProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    name: string;
}

interface Snippet {
    label: string;
    title: string;
    before: string;
    after: string;
}

const MATH_SNIPPETS: Snippet[] = [
    { label: '\\( \\)',  title: 'Matemática inline',   before: '\\( ',     after: ' \\)' },
    { label: '\\[ \\]',  title: 'Ecuación en bloque',  before: '\\[\n',    after: '\n\\]' },
    { label: 'a/b',      title: 'Fracción',             before: '\\frac{',  after: '}{b}' },
    { label: '√',        title: 'Raíz cuadrada',        before: '\\sqrt{',  after: '}' },
    { label: 'xⁿ',      title: 'Superíndice',          before: '^{',       after: '}' },
    { label: 'xₙ',      title: 'Subíndice',            before: '_{',       after: '}' },
    { label: '·',        title: 'Multiplicación (cdot)', before: '\\cdot',   after: '' },
    { label: 'Σ',        title: 'Sumatoria',            before: '\\sum_{',  after: '}^{}' },
    { label: '∫',        title: 'Integral',             before: '\\int_{',  after: '}^{} dx' },
];

const TEXT_SNIPPETS: Snippet[] = [
    { label: 'B',   title: 'Negrita',        before: '\\textbf{',    after: '}' },
    { label: 'I',   title: 'Cursiva',        before: '\\textit{',    after: '}' },
    { label: 'U',   title: 'Subrayado',      before: '\\underline{', after: '}' },
    { label: '§',   title: 'Sección',        before: '\\section*{',  after: '}' },
    { label: '§§',  title: 'Subsección',     before: '\\subsection*{', after: '}' },
    { label: '↵',   title: 'Salto de línea', before: '\\\\\n',       after: '' },
];

function escHtml(s: string): string {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function highlightTextPart(text: string): string {
    return text.replace(
        /(\\(?:textbf|textit|underline|emph|text|section\*?|subsection\*?|chapter\*?))\{([^}]*)\}/g,
        '<span style="color:#7c3aed">$1{</span>$2<span style="color:#7c3aed">}</span>'
    );
}

function highlightLatex(raw: string): string {
    const mathRegex = /(\\(?:\(|\[)[\s\S]*?\\(?:\)|\]))/g;
    const parts: string[] = [];
    let last = 0;
    let m: RegExpExecArray | null;

    while ((m = mathRegex.exec(raw)) !== null) {
        if (m.index > last) {
            parts.push(highlightTextPart(escHtml(raw.slice(last, m.index))));
        }
        const isBlock = m[0].startsWith('\\[');
        const dc = isBlock ? '#e11d48' : '#d97706';
        const bg = isBlock ? 'rgba(244,63,94,0.07)' : 'rgba(251,191,36,0.10)';
        const open  = isBlock ? '\\[' : '\\(';
        const close = isBlock ? '\\]' : '\\)';
        const inner = escHtml(m[0].slice(open.length, m[0].length - close.length));
        parts.push(
            `<span style="background:${bg};border-radius:3px">` +
            `<span style="color:${dc}">${escHtml(open)}</span>` +
            inner +
            `<span style="color:${dc}">${escHtml(close)}</span>` +
            `</span>`
        );
        last = m.index + m[0].length;
    }

    if (last < raw.length) {
        parts.push(highlightTextPart(escHtml(raw.slice(last))));
    }

    return parts.join('').replace(/\n/g, '<br/>') + '<br/>';
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
        .replace(/\\subsection\*?\{([^}]*)\}/g, '<strong>$1</strong>')
        .replace(/\\\\/g, '<br/>')
        .replace(/\\newline/g, '<br/>')
        .replace(/\\par\b/g, '<br/><br/>');
}

function LatexEditor({ value, onChange, name }: LatexEditorProps) {
    const [latexPreview, setLatexPreview] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Auto-resize textarea
    useEffect(() => {
        const el = textareaRef.current;
        if (!el) return;
        el.style.height = 'auto';
        el.style.height = el.scrollHeight + 'px';
    }, [value]);

    // Render preview
    useEffect(() => {
        if (!value) { setLatexPreview(''); return; }

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
                    processedContent += katex.renderToString(latexContent, { displayMode, throwOnError: false });
                } catch {
                    processedContent += `<span style="color:red">Error: ${segment}</span>`;
                }
            } else {
                const escaped = escHtml(segment);
                processedContent += applyTextCommands(escaped).replace(/\n/g, '<br/>');
            }
        });

        setLatexPreview(processedContent);
    }, [value]);

    const insertSnippet = (snippet: Snippet) => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart ?? 0;
        const end = textarea.selectionEnd ?? 0;
        const val = value || '';
        const selected = val.slice(start, end);

        const newValue = val.slice(0, start) + snippet.before + selected + snippet.after + val.slice(end);
        const newCursorPos = start + snippet.before.length + selected.length;

        const event = { target: { name, value: newValue } } as React.ChangeEvent<HTMLTextAreaElement>;
        onChange(event);

        setTimeout(() => {
            textarea.selectionStart = newCursorPos;
            textarea.selectionEnd = newCursorPos;
            textarea.focus();
        }, 0);
    };

    // Shared style for overlay and textarea (must be identical)
    const sharedStyle: React.CSSProperties = {
        fontFamily: 'inherit',
        fontSize: '0.875rem',
        fontWeight: '400',
        lineHeight: '1.625',
        padding: '1rem 1.25rem',
        letterSpacing: 'normal',
        wordSpacing: 'normal',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
    };

    return (
        <>
            {/* Toolbar */}
            <div className="flex flex-wrap gap-3 mb-2">
                <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 rounded-2xl px-3 py-1.5 flex-wrap">
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-300 mr-1">Math</span>
                    {MATH_SNIPPETS.map((s) => (
                        <button
                            key={s.title}
                            type="button"
                            title={s.title}
                            onClick={() => insertSnippet(s)}
                            className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs font-black text-amber-600 hover:bg-amber-500 hover:text-white hover:border-amber-500 transition-all shadow-sm font-mono"
                        >
                            {s.label}
                        </button>
                    ))}
                </div>
                <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 rounded-2xl px-3 py-1.5 flex-wrap">
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-300 mr-1">Texto</span>
                    {TEXT_SNIPPETS.map((s) => (
                        <button
                            key={s.title}
                            type="button"
                            title={s.title}
                            onClick={() => insertSnippet(s)}
                            className={`px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs text-violet-600 hover:bg-violet-500 hover:text-white hover:border-violet-500 transition-all shadow-sm ${
                                s.label === 'I' ? 'italic font-bold' : s.label === 'U' ? 'underline font-black' : 'font-black'
                            }`}
                        >
                            {s.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Editor con overlay de colores */}
            <div
                className="relative w-full bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] focus-within:ring-4 focus-within:ring-rose-100 focus-within:border-rose-400 transition-all overflow-hidden"
            >
                {/* Overlay de resaltado */}
                <div
                    aria-hidden
                    style={{ ...sharedStyle, position: 'absolute', inset: 0, pointerEvents: 'none', color: '#1e293b', overflowY: 'hidden' }}
                    dangerouslySetInnerHTML={{ __html: highlightLatex(value || '') }}
                />
                {/* Textarea encima, texto transparente para ver el overlay */}
                <textarea
                    ref={textareaRef}
                    name={name}
                    value={value || ''}
                    onChange={onChange}
                    placeholder="Escribe aquí en formato LaTeX (usa \( ... \) para matemáticas en línea o \[ ... \] para ecuaciones en bloque)"
                    style={{
                        ...sharedStyle,
                        position: 'relative',
                        display: 'block',
                        width: '100%',
                        minHeight: '150px',
                        background: 'transparent',
                        color: 'transparent',
                        caretColor: '#1e293b',
                        outline: 'none',
                        resize: 'none',
                        overflow: 'hidden',
                    }}
                />
            </div>

            {/* Vista previa */}
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
