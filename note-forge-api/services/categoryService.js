const Category = require("../models/categoryModel")

const createCategory = async (name, description, imageUrl, isPinned, userId) => {
    const CategoryId = await Category.create(name, description, imageUrl, isPinned, userId);
    return { message: "Categoría creada con éxito", CategoryId };
};

const getCategoryById = async (categoryId) => {
    return await Category.findById(categoryId);
};

const getCategories = async () => {
    return await Category.findAll(); 
};

const updateCategory = async (categoryId, name, description, imageUrl, pinned) => {
    return await Category.update(categoryId, name, description, imageUrl, pinned);
};

const deleteCategory = async (categoryId) => {
    return await Category.delete(categoryId);
};

module.exports = { createCategory, getCategoryById, getCategories, updateCategory, deleteCategory };