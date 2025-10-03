import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteGuide } from "../../services/GuideService";

function GuideOption({ id, title, onDelete }) {
    const navigate = useNavigate();

    const handleDelete = async () => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar esta guía?")
        if (confirmDelete) {
            try {
                await deleteGuide(id);
                if (onDelete) {
                    onDelete(id);
                }
            } catch (error) {
                console.error("Error al eliminar la guía:", error);
            }
        }
    }

    const handleEdit = () => {
        navigate(`/edit-guide/${id}`);
    }

    return (
        <div className='guide-option'>
            <h1>{title}</h1>
            <div className="guide-box-icon">
                <div>
                <box-icon 
                    name='edit-alt' 
                    type='solid' 
                    className="edit-alt"
                    onClick={handleEdit}
                    style={{ cursor: "pointer" }} 
                ></box-icon>
                <box-icon 
                    name='trash' 
                    type='solid' 
                    className="trash"
                    onClick={handleDelete}
                    style={{ cursor: "pointer" }} 
                ></box-icon> 
                </div>
            </div>
        </div>
    );
}

export default GuideOption;