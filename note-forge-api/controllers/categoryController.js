const categoryService = require('../services/categoryService');

async function createCategoryRequest(req, res) { 
    try {
        const userId = req.user.id; // Obtener el id del usuario desde el token
        const { name, description } = req.body;
        const imageUrl = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : null;

        const result = await categoryService.createCategory(name, description, imageUrl, userId);

        res.status(201).json(result); 
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message });
    }
}

async function getCategoryByIdRequest(req, res) {
    try {
        const categoryId = req.params.id; 
        const category = await categoryService.getCategoryById(categoryId);
        
        if (!category) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }
        
        res.status(200).json(category);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function getCategoriesRequest(req, res) {
    try {
        const categories = await categoryService.getCategories();
        res.status(200).json(categories);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function updateCategoryRequest(req, res) {
    try {
        const categoryId = req.params.id;  
        const { name, description } = req.body;
        
        const updatedCategory= await categoryService.updateCategory(categoryId, name, description);
        
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function deleteCategoryRequest(req, res) {
    try {
        const categoryId = req.params.id;  
        
        const result = await categoryService.deleteCategory(categoryId);
        
        if (result) {
            res.status(200).json({ message: 'Categoría eliminada con éxito' });
        } else {
            res.status(404).json({ message: 'Categoría no encontrada' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = { createCategoryRequest, getCategoryByIdRequest, getCategoriesRequest, updateCategoryRequest, deleteCategoryRequest };