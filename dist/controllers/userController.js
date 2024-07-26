"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserById = exports.updateUserById = exports.getUserById = exports.getAllUsers = exports.createUser = exports.handleImageUpload = void 0;
const user_1 = require("../models/user");
const handleImageUpload = async (req, res) => {
    try {
        // Check if file is provided
        if (req.file && req.file.buffer) {
            // Process the image data
            const image = req.file.buffer;
            // Here, you might want to save the image to a file system or cloud storage
            // For this example, we assume we're storing it directly in the database
            return {
                success: true,
                image, // Return the image data
            };
        }
        // No image provided
        return {
            success: false,
            message: 'No image provided',
        };
    }
    catch (error) {
        const errorMessage = error.message;
        throw new Error(`Error handling image upload: ${errorMessage}`);
    }
};
exports.handleImageUpload = handleImageUpload;
// POST: Create a new user
const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const imageResult = await (0, exports.handleImageUpload)(req, res);
        if (imageResult.success) {
            const newUser = await user_1.User.create({ name, email, password, image: imageResult.image });
            res.status(201).json({
                message: 'User created successfully',
                user: newUser,
            });
        }
        else {
            res.status(400).json({ message: imageResult.message });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};
exports.createUser = createUser;
// GET: Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await user_1.User.findAll();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
};
exports.getAllUsers = getAllUsers;
// GET /:userId: Get user by ID
const getUserById = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await user_1.User.findByPk(userId);
        if (user) {
            res.status(200).json(user);
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching user', error });
    }
};
exports.getUserById = getUserById;
// PUT /:userId: Update user by ID
const updateUserById = async (req, res) => {
    try {
        const { userId } = req.params;
        const { name, email, password } = req.body;
        const imageResult = await (0, exports.handleImageUpload)(req, res);
        if (imageResult.success) {
            const [updated] = await user_1.User.update({ name, email, password, image: imageResult.image }, { where: { id: userId } });
            if (updated) {
                const updatedUser = await user_1.User.findByPk(userId);
                res.status(200).json(updatedUser);
            }
            else {
                res.status(404).json({ message: 'User not found' });
            }
        }
        else {
            res.status(400).json({ message: imageResult.message });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
};
exports.updateUserById = updateUserById;
// DELETE /:userId: Delete user by ID
const deleteUserById = async (req, res) => {
    try {
        const { userId } = req.params;
        const deleted = await user_1.User.destroy({ where: { id: userId } });
        if (deleted) {
            res.status(204).send();
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
};
exports.deleteUserById = deleteUserById;
