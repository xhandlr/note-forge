import { sendRequest } from "./AppService";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Function to add a new category
 * @param {Object} categoryData
 * @returns {Promise<Object>}
 */
export const addCategory = async (categoryData) => {
    return sendRequest(`${API_BASE_URL}/create-category`, 'POST', categoryData);
};

/**
 * Function to update an existing category
 * @param {number} id 
 * @param {Object} categoryData 
 * @returns {Promise<Object>}
 */
export const updateCategory = async (id, categoryData) => {
    return sendRequest(`${API_BASE_URL}/update-category/${id}`, 'PUT', categoryData);
};

/**
 * Function to delete a category
 * @param {number} id 
 * @returns {Promise<Object>}
 */
export const deleteCategory = async (id) => {
    return sendRequest(`${API_BASE_URL}/delete-category/${id}`, 'DELETE');
};

/**
 * Function to get a category by its ID
 * @param {number} id 
 * @returns {Promise<Object>}
 */
export const getCategoryById = async (id) => {
    return sendRequest(`${API_BASE_URL}/category/${id}`, 'GET');
};

/**
 * Function to get all categories
 * @returns {Promise<Array>}
 */
export const getCategories = async () => {
    return sendRequest(`${API_BASE_URL}/categories`, 'GET');
};

