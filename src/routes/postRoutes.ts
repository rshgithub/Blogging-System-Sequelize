import { Router } from 'express';
import { createPost, getAllPosts, getPostById, updatePostById, deletePostById, getPostCategories ,addPostToCategory , getPostComments} from '../controllers/postController';

const postRoutes = Router();

postRoutes.post('/', createPost);
postRoutes.get('/', getAllPosts);
postRoutes.get('/:postId', getPostById);
postRoutes.put('/:postId', updatePostById);
postRoutes.delete('/:postId', deletePostById); 

postRoutes.get('/:postId/categories', getPostCategories);
postRoutes.post('/:postId/categories', addPostToCategory); 
postRoutes.get('/:postId/comments', getPostComments); 

export {postRoutes};
