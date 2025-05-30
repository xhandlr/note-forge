import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Auth/Login.css";

function Icon() {
    const navigate = useNavigate();

    return (
        <div className="note-forge-icon" onClick={() => { navigate("/dashboard"); }}></div>
    );
}

export default Icon;