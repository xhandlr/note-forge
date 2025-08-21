import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

// UI Components
import Icon from "./Icon";
import Button from "./Button";

// Login Service
import { logoutUser } from "../../services/LoginService";

function Navbar() {
    const navigate = useNavigate(); 

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const handleLogout = async () => {
        try {
            await logoutUser();
            setIsLoggedIn(false);
            alert("Sesión cerrada con éxito");
            navigate("/");
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <nav className="w-screen fixed top-0 left-0 bg-white text-black flex flex-row justify-between items-center p-8 px-20 border-b border-gray-200 shadow-md z-50">
            <div className="flex flex-row gap-x-8 items-center justify-center">
                <Icon 
                    size="w-15"
                    type="dark"
                />
                <h1 className="text-gray-800 text-3xl logo-font">Note Forge</h1>
            </div>
            <div className="flex flex-row space-x-3">
                {isLoggedIn ? (
                    <>
                        <Button 
                            children={"Dashboard"}
                            to={"/dashboard"}
                        />
                        <Button 
                            variant="secondary"
                            children={"Cerrar Sesión"}
                            onClick={handleLogout}
                        />
                    </>
                ) : (
                    <>
                        <Button 
                            children={"Iniciar Sesión"}
                            to={"/login"}
                        />
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
