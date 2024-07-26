import { Request, Response } from 'express';
import { User } from '../models/user';
import { Post } from '../models/post';
import { Comment } from '../models/comment';

 
export const handleImageUpload = async (req: Request, res: Response) => {
  try {
      if (req.file && req.file.buffer) {
          const image = req.file.buffer;
          return {
              success: true,
              image, // Return the image data
          };
      }

      // No image provided, return undefined
      return {
          success: true,
          image: undefined, // Explicitly return undefined
      };
  } catch (error) {
      const errorMessage = (error as Error).message;
      return {
          success: false,
          message: `Error handling image upload: ${errorMessage}`,
      };
  }
};

// POST: Create a new user 

const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const image = req.file?.buffer; // Handle file upload

    // Check if the email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Create new user
    const newUser = await User.create({ name, email, password, image });
    res.status(201).json(newUser);

    res.status(201).json({
      message: 'User created successfully',
      user: newUser,
  });

  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: 'Error creating user', error: error.message });
    } else {
      // Handle unknown errors
      return res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};
  

// GET: Get all users
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

// GET /:userId: Get user by ID
const getUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await User.findByPk(userId);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
};

// PUT /:userId: Update user by ID
const updateUserById = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const { name, email, password } = req.body;
      const imageResult = await handleImageUpload(req, res);
  
      if (imageResult.success) {
        const [updated] = await User.update(
          { name, email, password, image: imageResult.image },
          { where: { id: userId } }
        );
  
        if (updated) {
          const updatedUser = await User.findByPk(userId);
          res.status(200).json(updatedUser);
        } else {
          res.status(404).json({ message: 'User not found' });
        }
      } else {
        res.status(400).json({ message: imageResult.message });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error updating user', error });
    }
  };
// DELETE /:userId: Delete user by ID
const deleteUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const deleted = await User.destroy({ where: { id: userId } });

    if (deleted) {
      res.status(204).send({ message: 'User deleted succefully ' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};


// GET /users/:userId/posts: Get all posts by a specific user
const getPostsByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    // Find all posts associated with the userId
    const posts = await Post.findAll({
      where: { userId }, 
    });

    if (posts.length > 0) {
      res.status(200).json(posts);
    } else {
      res.status(404).json({ message: 'No posts found for this user' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error: (error as Error).message });
  }
};

const getUserComments = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    // Find user and include their comments
    const comments = await Comment.findAll({
      where: { userId }, 
    });

    if (comments.length > 0) {
      res.status(200).json(comments);
    } else {
      res.status(404).json({ message: 'No posts found for this user' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comments', error: (error as Error).message });
  }
};

export { createUser, getAllUsers, getUserById, updateUserById, deleteUserById , getPostsByUserId , getUserComments};
