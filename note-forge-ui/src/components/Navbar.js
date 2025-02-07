import React from "react";
import { Link } from "react-router-dom";
import "../styles/Dashboard.css";

function Navbar({ playMenuSound }) {
    return (
        <header className="header">
                <div className="wrapper-logo">
                <a href="/" className="logo">Note Forge</a>
                </div>

                <input type="checkbox" id="check" />
                <label htmlFor="check" className="icons">
                    <box-icon name="menu" id="menu-icon" size="40px"></box-icon>
                    <box-icon name="x" id="close-icon" size="40px"></box-icon>
                </label>

                <nav className="navbar">
                    <a href="/dashboard" className="home-link" onClick={playMenuSound}>Dashboard</a>
                    <a href="/biblioteca" className="home-link" onClick={playMenuSound}>Biblioteca</a>
                    <a href="/exportar" className="home-link" onClick={playMenuSound}>Exportar</a>
                    <a href="/ayuda" className="home-link" onClick={playMenuSound}>Buscar</a>
                    <a href="/cuenta" className="home-link" onClick={playMenuSound}>Cuenta</a>
                </nav>
            </header>
    );
}

export default Navbar;