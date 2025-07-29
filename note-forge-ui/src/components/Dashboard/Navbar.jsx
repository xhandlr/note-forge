import React from "react";
import { useNavigate } from "react-router-dom"; // Para redirigir después del logout
import Icon from "./Icon";
import Logotype from "./Logotype";
import SearchModal from "./SearchModal";
import { logoutUser } from "../../services/LoginService";

function Navbar({ playMenuSound }) {
    const navigate = useNavigate(); // Hook para redirigir

    const handleLogout = async () => {
        try {
            await logoutUser();
            alert("Sesión cerrada con éxito");
            navigate("/"); // Redirige al login después de cerrar sesión
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <header className="header">
            <input type="checkbox" id="check" />
            <label htmlFor="check" className="icons">
                <box-icon name="menu" id="menu-icon" size="40px"></box-icon>
                <box-icon name="x" id="close-icon" size="40px"></box-icon>
            </label>

            <nav className="navbar">
                <div className="note-forge-div">
                    <Icon />
                    <Logotype />
                </div>

                <div className="nav-options">
                    <a href="/dashboard" className="home-link" onClick={playMenuSound}>Inicio</a>
                    <a href="/exportar" className="home-link" onClick={playMenuSound}>Exportar</a>
                    <a href="/library" className="home-link">Mi Biblioteca</a>
                    <SearchModal />
                    <div className='user-circle-icon'>
                        <box-icon name='user-circle' type='solid'></box-icon>
                        <div className="user-conf">
                            <p>Mi cuenta</p>
                            <p>Configuración</p>
                            <p onClick={handleLogout} style={{ cursor: "pointer" }}>Cerrar Sesión</p>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;
