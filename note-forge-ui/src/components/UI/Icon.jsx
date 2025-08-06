import React from "react";
import { useNavigate } from "react-router-dom";
import logoDark from '/src/assets/logo-dark.png';

function Icon({ size = "w-8 h-8", type = "light", fontSize = "text-2xl",...props}) {
    const navigate = useNavigate();
    let sourceIcon = logoDark; // Default to dark logo

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