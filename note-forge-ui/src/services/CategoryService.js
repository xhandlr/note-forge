import { sendRequest } from "./AppService";

const addCategory = async (categoryData) => {
    return sendRequest('http://localhost:5000/create-category', 'POST', categoryData);
}

const updateCategory = async (id, categoryData) => {
    return sendRequest(`http://localhost:5000/update-exercise/${id}`, 'POST', categoryData);
}

const deleteCategory = async (id) => {
    return sendRequest(`http://localhost:5000/delete-category/${id}`, 'DELETE');
}

const getCategoryById = async (id) => {
    return sendRequest(`http://localhost:5000/get-category/${id}`, 'GET'); 
};

const getCategories = async () => {
    return sendRequest('http://localhost:5000/get-categories', 'GET');  
};

export { addCategory, updateCategory, deleteCategory, getCategoryById, getCategories };
