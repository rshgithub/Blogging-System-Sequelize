import { Router } from 'express';
import { createCategory, getAllCategories, getCategoryById, updateCategoryById, deleteCategoryById, getCategoryPosts } from '../controllers/categoryController';

const categoryRoutes = Router();

categoryRoutes.post('/', createCategory);
categoryRoutes.get('/', getAllCategories);
categoryRoutes.get('/:categoryId', getCategoryById);
categoryRoutes.put('/:categoryId', updateCategoryById);
categoryRoutes.delete('/:categoryId', deleteCategoryById);
categoryRoutes.get('/:categoryId/posts', getCategoryPosts);

export {categoryRoutes};
