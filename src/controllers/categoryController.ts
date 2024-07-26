import { Request, Response } from 'express';
import { Category } from '../models/category';
import { Post } from '../models/post';

// POST: Create a new category

const createCategory = async (req: Request, res: Response) => {
  try {

    const { name } = req.body;

    // Validate that the name field is present and not empty
    if (!name) {
      return res.status(400).json({ message: 'Category name is required' });
    }
    console.log('Request body:', req.body); // Log the request body

    const newCategory = await Category.create({ name });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: 'Error creating category', error: (error as Error).message });
  }
};


// GET: Get all categories with associated posts
const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.findAll({
      include: [{ model: Post, as: 'posts' }],
    });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error: (error as Error).message });
  }
};

// GET /:categoryId: Get category by ID with associated posts
const getCategoryById = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;
    const category = await Category.findByPk(categoryId, {
      include: [{ model: Post, as: 'posts' }],
    });
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching category', error: (error as Error).message });
  }
};

// PUT /:categoryId: Update category by ID
const updateCategoryById = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;
    const { name } = req.body;
    const [updatedRows] = await Category.update({ name }, {
      where: { id: categoryId },
    });
    if (updatedRows) {
      const updatedCategory = await Category.findByPk(categoryId);
      res.status(200).json(updatedCategory);
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating category', error: (error as Error).message });
  }
};

// DELETE /:categoryId: Delete category by ID
const deleteCategoryById = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;
    const deleted = await Category.destroy({
      where: { id: categoryId },
    });
    if (deleted) {
      res.status(200).json({ message: 'Category deleted successfully ' });
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category', error: (error as Error).message });
  }
};

// GET /:categoryId/posts: Get all posts for a specific category
const getCategoryPosts = async (req: Request, res: Response) => {
    try {
      const { categoryId } = req.params;
      const category = await Category.findByPk(categoryId, {
        include: [{ model: Post, as: 'posts' }],
      });
  
      if (category) {
        // Type assertion to help TypeScript understand that category.posts is an array of posts
        const posts = category.posts as Post[];
        res.status(200).json(posts);
      } else {
        res.status(404).json({ message: 'Category not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error fetching posts', error: (error as Error).message });
    }
  };
  
export { createCategory, getAllCategories, getCategoryById, updateCategoryById, deleteCategoryById, getCategoryPosts };
