import React from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface Exercise {
    id: number;
    title: string;
    description: string;
    answer?: string;
    image_url?: string;
    imageUrl?: string;
    difficulty?: number;
    duration?: string;
}

interface PDFPreviewProps {
    title: string;
    author?: string;
    exercises: Exercise[];
    showAnswers: boolean;
    showDifficulty: boolean;
    showDuration: boolean;
    showImages: boolean;
    pageBreak?: boolean;
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

function renderLatex(text: string): string {
    if (!text) return '';
    const latexRegex = /(\\(?:\(|\[)[\s\S]*?\\(?:\)|\])|\$\$[\s\S]*?\$\$)/g;
    const segments = text.split(latexRegex);
    let processed = '';
    for (const segment of segments) {
        if (!segment) continue;
        if (segment.startsWith('\\(') || segment.startsWith('\\[') || segment.startsWith('$$')) {
            try {
                const displayMode = segment.startsWith('\\[') || segment.startsWith('$$');
                const content = segment
                    .replace(/^(\\[\(\[]|\$\$)/, '')
                    .replace(/(\\[\)\]]|\$\$)$/, '');
                processed += katex.renderToString(content, { displayMode, throwOnError: false });
            } catch {
                processed += segment;
            }
        } else {
            const escaped = segment
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');
            processed += applyTextCommands(escaped).replace(/\n/g, '<br/>');
        }
    }
    return processed;
}

const PDFPreview: React.FC<PDFPreviewProps> = ({
    title,
    author,
    exercises,
    showAnswers,
    showDifficulty,
    showDuration,
    showImages,
    pageBreak = false,
}) => {
    return (
        <div
            id="pdf-content"
            style={{
                padding: '48px',
                backgroundColor: 'white',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                color: '#1e293b',
                lineHeight: '1.6',
            }}
        >
            {/* Cover */}
            <div
                style={{
                    textAlign: 'center',
                    borderBottom: '1px solid #e2e8f0',
                    paddingBottom: '32px',
                    marginBottom: '40px',
                }}
            >
                <div style={{ color: '#ec4899', fontSize: '10px', fontWeight: 'bold', letterSpacing: '0.2em' }}>
                    MATERIAL DE ESTUDIO
                </div>
                <h1
                    style={{
                        fontSize: '32px',
                        fontWeight: 'black',
                        margin: '12px 0',
                        color: '#0f172a',
                    }}
                >
                    {title}
                </h1>
                {author && (
                    <p style={{ color: '#64748b', fontSize: '14px', margin: '8px 0' }}>
                        {author}
                    </p>
                )}
                <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '16px' }}>
                    <span>{exercises.length} ejercicio{exercises.length !== 1 ? 's' : ''}</span>
                </div>
            </div>

            {/* Exercises */}
            <div>
                {exercises.map((ex, idx) => {
                    const imgUrl = ex.image_url || ex.imageUrl;
                    return (
                        <div key={ex.id} style={{ marginBottom: '48px', ...(pageBreak && idx < exercises.length - 1 ? { pageBreakAfter: 'always' } : {}), ...(pageBreak && idx > 0 ? { paddingTop: '48px' } : {}) }}>
                            {/* Exercise Header */}
                            <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', alignItems: 'flex-start' }}>
                                <div
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        backgroundColor: '#ec4899',
                                        color: 'white',
                                        borderRadius: '8px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: 'black',
                                        fontSize: '14px',
                                        flexShrink: 0,
                                    }}
                                >
                                    {idx + 1}
                                </div>
                                <h2 style={{ fontSize: '18px', fontWeight: 900, margin: 0, marginTop: '6px' }}>
                                    {ex.title}
                                </h2>
                            </div>

                            {/* Description */}
                            {ex.description && (
                                <div
                                    style={{ marginLeft: '56px', marginBottom: '16px', fontSize: '14px', color: '#475569' }}
                                    dangerouslySetInnerHTML={{ __html: renderLatex(ex.description) }}
                                />
                            )}

                            {/* Metadata */}
                            {(showDifficulty || showDuration) && (
                                <div style={{ marginLeft: '56px', marginBottom: '16px', fontSize: '12px', color: '#94a3b8' }}>
                                    {showDifficulty && ex.difficulty && (
                                        <span>
                                            <strong>Dificultad:</strong> {ex.difficulty}/5
                                            {showDuration && ex.duration && ' · '}
                                        </span>
                                    )}
                                    {showDuration && ex.duration && (
                                        <span>
                                            <strong>Tiempo:</strong> {ex.duration} min
                                        </span>
                                    )}
                                </div>
                            )}

                            {/* Image */}
                            {showImages && imgUrl && (
                                <div style={{ marginLeft: '56px', marginBottom: '16px' }}>
                                    <img
                                        src={imgUrl}
                                        alt={ex.title}
                                        style={{
                                            maxWidth: '100%',
                                            height: 'auto',
                                            maxHeight: '300px',
                                            objectFit: 'contain',
                                            border: '1px solid #e2e8f0',
                                            borderRadius: '8px',
                                        }}
                                    />
                                </div>
                            )}

                            {/* Answer */}
                            {showAnswers && ex.answer && (
                                <div
                                    style={{
                                        marginLeft: '56px',
                                        padding: '16px',
                                        backgroundColor: '#f8fafc',
                                        borderLeft: '4px solid #fbbf24',
                                        borderRadius: '8px',
                                    }}
                                >
                                    <div style={{ fontSize: '10px', fontWeight: 'black', color: '#b45309', letterSpacing: '0.1em', marginBottom: '12px' }}>
                                        RESOLUCIÓN
                                    </div>
                                    <div
                                        style={{ fontSize: '13px', color: '#475569' }}
                                        dangerouslySetInnerHTML={{ __html: renderLatex(ex.answer) }}
                                    />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PDFPreview;
