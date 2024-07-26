"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
// src/routes/userRoutes.ts
const express_1 = require("express");
const upload_1 = require("../middlewares/upload");
const userController_1 = require("../controllers/userController");
const userRoutes = (0, express_1.Router)();
exports.userRoutes = userRoutes;
// GET: Get all users
userRoutes.get("/", userController_1.getAllUsers);
// POST: Create a new user
userRoutes.post("/", upload_1.upload.single("image"), userController_1.createUser);
// GET /:userId: Get user by ID
userRoutes.get("/:userId", userController_1.getUserById);
// PUT /:userId: Update user by ID
userRoutes.put("/:userId", upload_1.upload.single("image"), userController_1.updateUserById);
// DELETE /:userId: Delete user by ID
userRoutes.delete("/:userId", userController_1.deleteUserById);
