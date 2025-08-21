import { sendRequest } from "./AppService";

/**
 * Creates a new guide in the API
 * @param {Object} guideData - Data of the guide to create
 * @returns {Promise<Object>} - Returns the created guide
 */
const addGuide = async (guideData) => {
    return sendRequest('http://localhost:5000/create-guide', 'POST', guideData);  
};

/**
 * Updates an existing guide
 * @param {number|string} id - ID of the guide to update
 * @param {Object} guideData - New data for the guide
 * @returns {Promise<Object>} - Returns the updated guide
 */
const updateGuide = async (id, guideData) => {
    return sendRequest(`http://localhost:5000/update-guide/${id}`, 'PUT', guideData); 
};

/**
 * Deletes a guide by its ID
 * @param {number|string} id - ID of the guide to delete
 * @returns {Promise<Object>} - Returns the deleted guide info
 */
const deleteGuide = async (id) => {
    return sendRequest(`http://localhost:5000/delete-guide/${id}`, 'DELETE'); 
};

/**
 * Get a guide by its ID
 * @param {number|string} id - ID of the guide to fetch
 * @returns {Promise<Object>} - Returns the guide
 */
const getGuideById = async (id) => {
    return sendRequest(`http://localhost:5000/guide/${id}`, 'GET'); 
};

/**
 * Get all guides
 * @returns {Promise<Object[]>} - Returns a list of guides
 */
const getGuides = async () => {
    return sendRequest('http://localhost:5000/guides', 'GET');  
};

export { 
    addGuide, 
    updateGuide, 
    deleteGuide, 
    getGuideById, 
    getGuides 
};
