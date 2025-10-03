import React from "react";
import { useNavigate } from "react-router-dom";

function Logotype() {
    const navigate = useNavigate();
    
    return (
        <div onClick={() => { navigate("/dashboard"); }}>
            <h1 className="text-4xl font-bold">Note Forge</h1>
        </div>
    );
}

export default Logotype;