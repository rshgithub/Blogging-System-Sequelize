"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initModels = void 0;
const post_1 = require("./post");
const category_1 = require("./category");
const user_1 = require("./user");
const comment_1 = require("./comment");
const postCategories_1 = require("./postCategories");
// Models Interface: Defines the shape of the object that contains all your Sequelize models. 
// Each property in this interface is a Sequelize model class (Post, Category, User, Comment, PostCategories).
const initModels = (sequelize) => {
    const Post = (0, post_1.initPostModel)(sequelize);
    const Category = (0, category_1.initCategoryModel)(sequelize);
    const User = (0, user_1.initUserModel)(sequelize);
    const Comment = (0, comment_1.initCommentModel)(sequelize);
    const PostCategories = (0, postCategories_1.initPostCategoriesModel)(sequelize);
    // Explicitly type the models object to match the Models interface
    const models = {
        Post,
        Category,
        User,
        Comment,
        PostCategories
    };
    // Set up associations
    Post.associate(models);
    Category.associate(models);
    User.associate(models);
    Comment.associate(models);
    return models;
};
exports.initModels = initModels;
