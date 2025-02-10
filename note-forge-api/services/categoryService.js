const Category = require("../models/categoryModel")

const createCategory = async (name, description, userId) => {
    const CategoryId = await Category.create(name, description, userId);
    return { message: "Categoría creada con éxito", CategoryId };
}

const getCategoryById = async (categoryId) => {
    return await Category.findById(categoryId);
};

const getCategories = async () => {
    return await Category.findAll(); 
};

const updateCategory = async (categoryId, name, description) => {
    return await Category.update(categoryId, name, description);
};

const deleteCategory = async (categoryId) => {
    return await Category.delete(categoryId);
};

module.exports = { createCategory, getCategoryById, getCategories, updateCategory, deleteCategory };