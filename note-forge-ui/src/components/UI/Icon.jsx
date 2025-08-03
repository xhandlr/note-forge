import React from "react";
import { useNavigate } from "react-router-dom";

function Icon({ size = "w-8 h-8", type = "light" }) {
    const navigate = useNavigate();
    let sourceIcon = "/src/assets/logo-note-forge.png";
    if (type === "dark") {
        sourceIcon = "/src/assets/logo-note-forge.png"; // Temporarily using the same icon for dark mode
    }

    return (
        <div
            className="cursor-pointer"
            onClick={() => {
                if (localStorage.getItem("token")) {
                    navigate("/dashboard");
                } else {
                    navigate("/login");
                }
            }}
        >
            <img src={sourceIcon} alt="Note Forge Icon" className={size} />
        </div>
    );
}

export default Icon;