// src/routes/userRoutes.ts
import { Router } from "express";
import {upload} from "../middlewares/upload";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  getPostsByUserId ,
  getUserComments
} from "../controllers/userController";

const userRoutes = Router();

// GET: Get all users
userRoutes.get("/", getAllUsers);

// POST: Create a new user
userRoutes.post("/", upload.single("image"), createUser);

// GET /:userId: Get user by ID
userRoutes.get("/:userId", getUserById);

// PUT /:userId: Update user by ID
userRoutes.put("/:userId", upload.single("image"), updateUserById);

// DELETE /:userId: Delete user by ID
userRoutes.delete("/:userId", deleteUserById);

// Route to get all posts by a specific user
userRoutes.get('/:userId/posts', getPostsByUserId);

// Route to get all comments by a specific user
userRoutes.get('/:userId/comments', getUserComments);


export {userRoutes};
