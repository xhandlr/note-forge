import React from "react"; // Importa biblioteca de React para realizar funciones de la misma
import '../styles/Home.css'; // Importa un archivo .css de la carpeta styles

function Home() { // Define una función llamada Home
    return ( 
        <div className="home-page"> {/* className en lugar de class */}
            <header className="header">
            <a href="/" className="logo">Note Forge</a>

            {/* Checkbox para controlar la visibilidad del menú */}
            <input type="checkbox" id="check" />
            <label htmlFor="check" className="icons">
                <box-icon name="menu" id="menu-icon"></box-icon>
                <box-icon name="x" id="close-icon"></box-icon>
            </label>

            {/* Navbar con animación */}
            <nav className="navbar">
                <a href="/home" style={{ "--i": 0 }} className="home-link">Inicio</a>
                <a href="/biblioteca" style={{ "--i": 1 }} className="home-link">Biblioteca</a>
                <a href="/exportar" style={{ "--i": 2 }} className="home-link">Exportar</a>
                <a href="/ayuda" style={{ "--i": 3 }} className="home-link">Ayuda</a>
                <a href="/cuenta" style={{ "--i": 4 }} className="home-link">Cuenta</a>
            </nav>
            </header>
        </div>
    );
}
// Este tipo de funciones se llaman componentes funcionales
export default Home; // Exporta el componente Home para que pueda ser importado y utilizado en otros archivos