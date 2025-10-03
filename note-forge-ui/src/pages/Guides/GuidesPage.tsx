import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from '../../components/Dashboard/Navbar';
import UserPanel from "../../components/Dashboard/UserPanel";
import SearchBar from "../../components/Dashboard/SearchBar";
import GuidesPanel from "../../components/Guides/GuidesPanel";
import { getGuides } from "../../services/GuideService"; 

function Guides() {
    const navigate = useNavigate();
    
    // State for storing all guides  
    const [guides, setGuides] = useState([]);  

    // State for storing filtered guides  
    const [filteredGuides, setFilteredGuides] = useState([]);  

    useEffect(() => {
        const fetchGuides = async () => {
            const data = await getGuides();
            setGuides(data);
            setFilteredGuides(data);
        };
        fetchGuides();
    }, []);


    const handleSearch = (query) => {
        if (query.trim() === "") {
            setFilteredGuides(guides); 
        } else {
            setFilteredGuides(
                guides.filter(guide =>
                    guide.title.toLowerCase().includes(query.toLowerCase())
                )
            );
        }
    };


    const handleDeleteGuide = (id) => {
        // Update both guides and filteredGuides
        setGuides(guides.filter(guide => guide.id !== id));
        setFilteredGuides(filteredGuides.filter(guide => guide.id !== id));
    };

    return (
        <div>
            <Navbar />
            <div className="guides-page">
                <div className="feature-wrapper">
                    <div className="guides-wrapper">
                        <div className="guides-title">
                            <h1>Mis guías</h1>
                            <SearchBar onSearch={handleSearch} />
                        </div>
                        {/* Pass handleDeleteGuide as prop */}
                        <GuidesPanel guides={filteredGuides} onDelete={handleDeleteGuide} />
                        <div className="new-guide" onClick={() => { navigate("/create-guide"); }}>
                            <h1>Crear nueva guía</h1>
                        </div>  
                    </div>
                    <UserPanel />
                </div>
            </div>
        </div>
    );
}

export default Guides;