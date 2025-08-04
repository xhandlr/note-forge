import React from "react";
import { useNavigate } from "react-router-dom";

function Icon({ size = "w-8 h-8", type = "light", fontSize = "text-2xl",...props}) {
    const navigate = useNavigate();
    let sourceIcon = "/src/assets/logo-dark.png";
    if (type === "dark") {
        sourceIcon = "/src/assets/logo-dark.png"; // Temporarily using the same icon for dark mode
    }

    return (
        <div
            className="cursor-pointer"
            onClick={() => {
                if (localStorage.getItem("token")) {
                    navigate("/dashboard");
                } else {
                    navigate("/");
                }
            }}
        >
            <img src={sourceIcon} alt="Note Forge Icon" className={size} />
            {type === "logotype"
                ? <h1 className={`mt-4 logo-font ${fontSize}`}>Note Forge</h1>
                : null
            }
        </div>
    );
}

export default Icon;