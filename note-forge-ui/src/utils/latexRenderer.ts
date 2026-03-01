import katex from 'katex';
import 'katex/dist/katex.min.css';

export function applyTextCommands(text: string): string {
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

export function renderLatex(text: string): string {
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
