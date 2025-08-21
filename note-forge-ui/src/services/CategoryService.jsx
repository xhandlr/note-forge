import { sendRequest } from "./AppService";

/**
 * Function to add a new category
 * @param {Object} categoryData 
 * @returns {Promise<Object}
 */
export const addCategory = async (categoryData) => {
    return sendRequest('http://localhost:5000/create-category', 'POST', categoryData);
};

/**
 * Function to update an existing category
 * @param {number} id 
 * @param {Object} categoryData 
 * @returns {Promise<Object>}
 */
export const updateCategory = async (id, categoryData) => {
    return sendRequest(`http://localhost:5000/update-category/${id}`, 'PUT', categoryData);
};

/**
 * Function to delete a category
 * @param {number} id 
 * @returns {Promise<Object>}
 */
export const deleteCategory = async (id) => {
    return sendRequest(`http://localhost:5000/delete-category/${id}`, 'DELETE');
};

/**
 * Function to get a category by its ID
 * @param {number} id 
 * @returns {Promise<Object>}
 */
export const getCategoryById = async (id) => {
    return sendRequest(`http://localhost:5000/category/${id}`, 'GET'); 
};

/**
 * Function to get all categories
 * @returns {Promise<Array>}
 */
export const getCategories = async () => {
    return sendRequest('http://localhost:5000/categories', 'GET');  
};

