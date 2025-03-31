import { sendRequest } from "./AppService";

const addGuide = async (exerciseData) => {
    return sendRequest('http://localhost:5000/create-guide', 'POST', exerciseData);  
};

const updateGuide = async (id, exerciseData) => {
    return sendRequest(`http://localhost:5000/update-guide/${id}`, 'PUT', exerciseData); 
};

const deleteGuide = async (id) => {
    return sendRequest(`http://localhost:5000/delete-guide/${id}`, 'DELETE'); 
};

const getGuideById = async (id) => {
    return sendRequest(`http://localhost:5000/guide/${id}`, 'GET'); 
};

const getGuides = async () => {
    return sendRequest('http://localhost:5000/guides', 'GET');  
};

export { addGuide, updateGuide, deleteGuide, getGuideById, getGuides };
