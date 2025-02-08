import React from "react";
import "../styles/Navbar.css";
import Icon from "./Icon";
import Logotype from "./Logotype";

function Navbar({ playMenuSound }) {
    return (
        <header className="header">
                <input type="checkbox" id="check" />
                <label htmlFor="check" className="icons">
                    <box-icon name="menu" id="menu-icon" size="40px"></box-icon>
                    <box-icon name="x" id="close-icon" size="40px"></box-icon>
                </label>

                <nav className="navbar">
                    <Icon></Icon>
                    <Logotype></Logotype>
                    <a href="/dashboard" className="home-link" onClick={playMenuSound}>Inicio</a>
                    <a href="/exportar" className="home-link" onClick={playMenuSound}>Exportar</a>
                </nav>
        </header>
    );
}

export default Navbar;