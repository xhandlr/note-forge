import { sendRequest } from "./AppService";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Create a new exercise in the API
 * @param {Object} exerciseData - Data of the exercise to create
 * @returns {Promise<Object>} - Returns the created exercise
 */
const addExercise = async (exerciseData) => {
    return sendRequest(`${API_BASE_URL}/create-exercise`, 'POST', exerciseData);
};

/**
 * Update an existing exercise
 * @param {number|string} id - ID of the exercise to update
 * @param {Object} exerciseData - New data for the exercise
 * @returns {Promise<Object>} - Returns the updated exercise
 */
const updateExercise = async (id, exerciseData) => {
    return sendRequest(`${API_BASE_URL}/update-exercise/${id}`, 'PUT', exerciseData);
};

/**
 * Delete an exercise by its ID
 * @param {number|string} id - ID of the exercise to delete
 * @returns {Promise<Object>} - Returns the deleted exercise info
 */
const deleteExercise = async (id) => {
    return sendRequest(`${API_BASE_URL}/delete-exercise/${id}`, 'DELETE');
};

/**
 * Get an exercise by its ID
 * @param {number|string} id - ID of the exercise to fetch
 * @returns {Promise<Object>} - Returns the exercise
 */
const getExerciseById = async (id) => {
    return sendRequest(`${API_BASE_URL}/exercise/${id}`, 'GET');
};

/**
 * Get all exercises
 * @returns {Promise<Object[]>} - Returns a list of exercises
 */
const getExercises = async () => {
    return sendRequest(`${API_BASE_URL}/exercises`, 'GET');
};

export { 
    addExercise, 
    updateExercise, 
    deleteExercise, 
    getExerciseById, 
    getExercises 
};
