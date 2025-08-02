import React from "react";
import { useNavigate } from "react-router-dom";

// UI Components
import Icon from "./Icon";
import Button from "./Button";

// Login Service
import { logoutUser } from "../../services/LoginService";

function Navbar() {
    const navigate = useNavigate(); 

    const handleLogout = async () => {
        try {
            await logoutUser();
            alert("Sesión cerrada con éxito");
            navigate("/");
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <nav className="w-screen fixed top-0 left-0 bg-black text-white flex flex-row justify-between items-center px-6 shadow-md border-b-4 border-gray-400 p-5 px-20">
            <div className="flex flex-row gap-x-8">
                <Icon 
                    size = "w-12"
                    type = "light"
                />
                <h1 className="text-white font-bold text-3xl">Note Forge</h1>
            </div>
            <div className="flex flex-row space-x-3">
                <Button 
                    children={"Iniciar Sesión"}
                />
            </div>
        </nav>
    );
}

export default Navbar;
