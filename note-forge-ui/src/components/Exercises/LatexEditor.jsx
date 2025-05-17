import React, { useState, useEffect } from "react";
import katex from "katex";
import "katex/dist/katex.min.css"; // Importa el CSS de KaTeX

function LatexEditor({ value, onChange, name }) {
    const [latexPreview, setLatexPreview] = useState(''); // Variable para la vista previa
    const [errors, setErrors] = useState({}); // Para manejar errores, si los hay

    // Este efecto se activa cuando el valor de `value` cambia.
    useEffect(() => {
        if (value) {
            const content = value;

            // Expresión regular para detectar bloques LaTeX
            const latexRegex = /(\\(?:\(|\[|\$\$?)[\s\S]*?\\(?:\)|\]|\$\$?))/g;

            // Dividir el contenido en segmentos de texto y LaTeX
            const segments = content.split(latexRegex);

            let processedContent = '';
            segments.forEach(segment => {
                if (!segment) return;

                // Verificar si el segmento es LaTeX
                if (latexRegex.test(segment)) {
                    try {
                        // Eliminar los delimitadores LaTeX y procesar
                        const latexContent = segment
                            .replace(/^\\(\(|\[|\$\$?)/, '') // Eliminar delimitadores iniciales
                            .replace(/\\(\)|\]|\$\$?)$/, ''); // Eliminar delimitadores finales

                        const displayMode = segment.startsWith('\\[') || segment.startsWith('$$');
                        processedContent += katex.renderToString(latexContent, {
                            displayMode: displayMode,
                            throwOnError: false
                        });
                    } catch (error) {
                        processedContent += `<span style="color: red;">Error en LaTeX: ${segment}</span>`;
                    }
                } else {
                    // Mantener el texto plano sin cambios
                    processedContent += segment
                        .replace(/&/g, '&amp;')
                        .replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;')
                        .replace(/\n/g, '<br/>');
                }
            });

            setLatexPreview(processedContent); // Actualizar la vista previa
        }
    }, [value]); // Re-renderizar cada vez que `value` cambie

    return (
        <div className="description-container">
            <div className="description-editor">
                <label>Utilice \( ..\) o \[ ..]\ para formato LaTeX</label>
                <textarea
                    className="description-exercise"
                    name={name} // `name` se pasa desde el componente padre
                    value={value || ''} // Asegúrate de que `value` siempre sea una cadena
                    onChange={onChange} // El manejador de cambios se pasa desde el componente padre
                    rows="5"
                    cols="50"
                    placeholder="Escribe aquí en formato LaTeX (usa \( ... \) para matemáticas en línea o \[ ... \] para ecuaciones en bloque)"
                    required
                />
                {errors[name] && <p className="error">{errors[name]}</p>} {/* Mostramos el error para el campo correspondiente */}
            </div>

            {/* Vista Previa en Tiempo Real */}
            <div className="latex-preview">
                <h3>Vista Previa:</h3>
                <div
                    className="preview-box"
                    dangerouslySetInnerHTML={{ __html: latexPreview }}
                />
            </div>
        </div>
    );
}

export default LatexEditor;
