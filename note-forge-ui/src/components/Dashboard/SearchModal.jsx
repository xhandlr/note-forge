import React, { useState } from "react";

function SearchModal() {
    const [isOpen, setIsOpen] = useState(false);

    // Función para abrir y cerrar la ventana emergente
    const toggleModal = () => setIsOpen(!isOpen);

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains("modal-overlay")) {
            setIsOpen(false);
        }
    };

    return (
        <div>
            {/* Botón para abrir el modal */}
            <box-icon name="search" onClick={toggleModal}></box-icon>

            {/* Condición para mostrar la ventana emergente */}
            {isOpen && (
                <div className="modal-overlay" onClick={handleOverlayClick}>
                    <div className="modal-content">
                        <div className="search-modal">
                            <input type="text" placeholder="Buscar..." />
                            <box-icon name='x' onClick={toggleModal}></box-icon>
                        </div>
                        <p>Presione ENTER para buscar</p>
                        <div className="filtered-search-button">
                            <box-icon name='filter' ></box-icon>
                            <button>Ir a búsqueda filtrada</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SearchModal;