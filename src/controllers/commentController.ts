import { Request, Response } from 'express';
import { Post } from '../models/post';
import { User } from '../models/user';
import { Comment } from '../models/comment';

// POST /:postId/comments: Create a new comment for a post
const createPostComment = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const { content, userId } = req.body;

    // Check if the post exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }

    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const newComment = await Comment.create({ content, postId: Number(postId), userId });
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: 'Error creating comment', error: (error as Error).message });
  }
};
 

// GET /:commentId: Get comment by ID  
const getCommentById = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findByPk(commentId);
    if (comment) {
      res.status(200).json(comment);
    } else {
      res.status(404).json({ message: 'Comment not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Comment', error: (error as Error).message });
  }
};

// PUT /:commentId: Update Comment by ID
const updateCommentById = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;
    const [updatedRows] = await Comment.update({ content }, {
      where: { id: commentId },
    });
    if (updatedRows) {
      const updatedComment = await Comment.findByPk(commentId);
      res.status(200).json(updatedComment);
    } else {
      res.status(404).json({ message: 'Comment not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating Comment', error: (error as Error).message });
  }
};

// DELETE /:commentId: Delete comment by ID
const deleteCommentById = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const deleted = await Comment.destroy({
      where: { id: commentId },
    });
    if (deleted) {
      res.status(200).json({ message: 'Comment deleted successfully ' });
    } else {
      res.status(404).json({ message: 'Comment not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting Comment', error: (error as Error).message });
  }
};


export { deleteCommentById,updateCommentById , getCommentById , createPostComment};
