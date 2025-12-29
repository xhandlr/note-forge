import React from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen } from "lucide-react";

function Icon({ size = "w-8 h-8", type = "light", fontSize = "text-xl",...props}) {
    const navigate = useNavigate();

    return (
        <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => {
                if (localStorage.getItem("token")) {
                    navigate("/dashboard");
                } else {
                    navigate("/");
                }
            }}
        >
            <div className={`relative ${size}`}>
                <BookOpen className="w-full h-full text-slate-900" strokeWidth={2.5} />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full shadow-[0_0_15px_rgba(244,63,94,0.6)] animate-pulse" />
            </div>
            {type === "logotype" && (
                <span className={`${fontSize} font-extrabold text-slate-900 tracking-tight`}>
                    Note Forge
                </span>
            )}
        </div>
    );
}

export default Icon;