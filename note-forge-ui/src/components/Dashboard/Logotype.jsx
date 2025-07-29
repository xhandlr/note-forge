import React from "react";
import { useNavigate } from "react-router-dom";

function Logotype() {
    const navigate = useNavigate();
    
    return (
        <div className="logo-note-forge" onClick={() => { navigate("/dashboard"); }}>
            <h1 className="note">Note</h1>
            <h1 className="forge">Forge</h1>
        </div>
    );
}

export default Logotype;