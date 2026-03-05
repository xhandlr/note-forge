import { describe, it, expect } from 'vitest';
import { applyTextCommands, renderLatex } from '../utils/latexRenderer';

describe('applyTextCommands', () => {
    it('convierte \\textbf en <strong>', () => {
        expect(applyTextCommands('\\textbf{hola}')).toBe('<strong>hola</strong>');
    });

    it('convierte \\textit en <em>', () => {
        expect(applyTextCommands('\\textit{cursiva}')).toBe('<em>cursiva</em>');
    });

    it('convierte \\\\ en <br/>', () => {
        expect(applyTextCommands('línea1\\\\línea2')).toBe('línea1<br/>línea2');
    });

    it('elimina preámbulo LaTeX', () => {
        const input = '\\documentclass{article}\\usepackage{amsmath}texto';
        expect(applyTextCommands(input)).toBe('texto');
    });

    it('devuelve texto plano sin cambios', () => {
        expect(applyTextCommands('texto sin LaTeX')).toBe('texto sin LaTeX');
    });
});

describe('renderLatex', () => {
    it('devuelve string vacío para entrada vacía', () => {
        expect(renderLatex('')).toBe('');
    });

    it('renderiza texto plano escapando HTML', () => {
        const result = renderLatex('a < b & c > d');
        expect(result).toContain('&lt;');
        expect(result).toContain('&amp;');
        expect(result).toContain('&gt;');
    });

    it('renderiza fórmulas inline con \\( \\)', () => {
        const result = renderLatex('El resultado es \\(x^2\\)');
        expect(result).toContain('katex');
    });

    it('renderiza fórmulas display con \\[ \\]', () => {
        const result = renderLatex('\\[\\frac{a}{b}\\]');
        expect(result).toContain('katex');
    });

    it('renderiza fórmulas display con $$', () => {
        const result = renderLatex('$$E = mc^2$$');
        expect(result).toContain('katex');
    });

    it('mezcla texto y LaTeX correctamente', () => {
        const result = renderLatex('Sea \\(x > 0\\) un número real.');
        expect(result).toContain('katex');
        expect(result).toContain('un número real.');
    });
});
