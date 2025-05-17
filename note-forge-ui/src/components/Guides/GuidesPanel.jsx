import React from "react";
import GuideOption from "../Guides/GuidesOption";
import "../../styles/Guides/Guides.css";

function GuidesPanel({ guides, onDelete }) {
    return (
        <div>
            <div className="guides-panel">
                {guides.map(guide => (
                    <GuideOption 
                        key={guide.id} 
                        onDelete={onDelete} // Pass the delete handler
                    /> 
                ))}
            </div>
        </div>
    );
}

export default GuidesPanel;
