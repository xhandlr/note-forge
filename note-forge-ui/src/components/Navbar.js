import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

function Navbar({ playMenuSound }) {
    return (
        <header className="header">
                <a href="/" className="logo">Note Forge</a>

                <input type="checkbox" id="check" />
                <label htmlFor="check" className="icons">
                    <box-icon name="menu" id="menu-icon" size="40px"></box-icon>
                    <box-icon name="x" id="close-icon" size="40px"></box-icon>
                </label>

                <nav className="navbar">
                    <a href="/home" className="home-link" onClick={playMenuSound}>Inicio</a>
                    <a href="/biblioteca" className="home-link" onClick={playMenuSound}>Biblioteca</a>
                    <a href="/exportar" className="home-link" onClick={playMenuSound}>Exportar</a>
                    <a href="/ayuda" className="home-link" onClick={playMenuSound}>Ayuda</a>
                    <a href="/cuenta" className="home-link" onClick={playMenuSound}>Cuenta</a>
                </nav>
            </header>
    );
}

export default Navbar;