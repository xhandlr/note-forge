import React from "react";
import { useNavigate } from "react-router-dom";

function Icon() {
    const navigate = useNavigate();


    return (
        <div className="cursor-pointer" onClick={() => { 
            if (localStorage.getItem("token")) {
                navigate("/dashboard");
            } else {
                navigate("/login");
            }
            }}>
            <img src="/src/assets/icon.png" alt="Note Forge Icon" className="w-8 h-8" />
        </div>
    );
}

export default Icon;