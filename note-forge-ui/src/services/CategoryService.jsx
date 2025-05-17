import { sendRequest } from "./AppService";

export const addCategory = async (categoryData) => {
    return sendRequest('http://localhost:5000/create-category', 'POST', categoryData);
};

export const updateCategory = async (id, categoryData) => {
    return sendRequest(`http://localhost:5000/update-category/${id}`, 'PUT', categoryData);
};

export const deleteCategory = async (id) => {
    return sendRequest(`http://localhost:5000/delete-category/${id}`, 'DELETE');
};

export const getCategoryById = async (id) => {
    return sendRequest(`http://localhost:5000/category/${id}`, 'GET'); 
};

export const getCategories = async () => {
    return sendRequest('http://localhost:5000/categories', 'GET');  
};

