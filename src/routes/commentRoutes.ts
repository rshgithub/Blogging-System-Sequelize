import { Router } from 'express';
import { createPostComment , deleteCommentById, updateCommentById,getCommentById} from '../controllers/commentController';

const commentRoutes = Router();

commentRoutes.delete('/:commentId', deleteCommentById);
commentRoutes.post('/post/:postId', createPostComment);
commentRoutes.get('/:commentId', getCommentById);
commentRoutes.put('/:commentId', updateCommentById);

export { commentRoutes };
