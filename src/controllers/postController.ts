import { Request, Response } from 'express';
import { User } from '../models/user';
import { Post } from '../models/post';
import { Category } from '../models/category';
import { Comment } from '../models/comment';
import { PostCategories } from '../models/postCategories';

// POST: Create a new post
const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content, userId } = req.body;
    const newPost = await Post.create({ title, content, userId });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: 'Error creating post', error: (error as Error).message });
  }
};

// GET: Get all posts with associated users, categories, and comments
const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.findAll({
      include: [
        { model: User, as: 'user' },
        { model: Category, as: 'categories' },
        { model: Comment, as: 'comments' }
      ],
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error: (error as Error).message });
  }
};

// GET /:postId: Get post by ID with associated users, categories, and comments
const getPostById = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const post = await Post.findByPk(postId, {
      include: [
        { model: User, as: 'user' },
        { model: Category, as: 'categories' },
        { model: Comment, as: 'comments' }
      ],
    });
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching post', error: (error as Error).message });
  }
};

// PUT /:postId: Update post by ID
const updatePostById = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const { title, content, userId } = req.body;
    const [updatedRows] = await Post.update({ title, content, userId }, {
      where: { id: postId },
    });
    if (updatedRows) {
      const updatedPost = await Post.findByPk(postId);
      res.status(200).json(updatedPost);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating post', error: (error as Error).message });
  }
};

// DELETE /:postId: Delete post by ID
const deletePostById = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const deleted = await Post.destroy({
      where: { id: postId },
    });
    if (deleted) {
      res.status(200).json({ message: 'Post deleted successfully ' });
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post', error: (error as Error).message });
  }
};

// // POST /:postId/categories: Add a post to a specific category
// const addPostToCategory = async (req: Request, res: Response) => {
//   try {
//     const { postId } = req.params;
//     const { categoryId } = req.body;

//     // Find the post and category
//     const post = await Post.findByPk(postId);
//     const category = await Category.findByPk(categoryId);

//     if (!post || !category) {
//       return res.status(404).json({ message: 'Post or Category not found' });
//     }

//     // Add the category to the post (many-to-many relationship)
//     await post.addCategory(categoryId);

//     res.status(200).json({ message: 'Post added to category successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error adding post to category', error: (error as Error).message });
//   }
// };


const addPostToCategory = async (req: Request, res: Response) => {
  const { postId } = req.params;
  const { categoryName } = req.body;

  try {
    // Check if the category exists
    const category = await Category.findOne({ where: { name: categoryName } });
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Check if the post exists
    const post = await Post.findByPk(postId);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Add entry to PostCategories table
    await PostCategories.create({ postId: post.id, categoryId: category.id });

    res.status(200).json({ message: 'Post added to category successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding post to category', error: (error as Error).message });
  }
};

// GET /:postId/categories: Get categories names for a specific post
const getPostCategories = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const post = await Post.findByPk(postId, {
      include: [{ model: Category, as: 'categories' }],
    });

    if (post) {
      const categories = post.categories?.map(category => category.name) || [];
      res.status(200).json(categories);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error: (error as Error).message });
  }
};


// GET /:postId/comments: Get comments for a specific post
const getPostComments = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const post = await Post.findByPk(postId, {
      include: [{ model: Comment, as: 'comments' }],
    });

    if (post) {
      res.status(200).json(post.comments);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comments', error: (error as Error).message });
  }
};

export { createPost, getAllPosts, getPostById, updatePostById, deletePostById, getPostCategories,addPostToCategory , getPostComments };
