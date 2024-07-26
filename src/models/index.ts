import { Sequelize } from 'sequelize';
import { initUserModel, User } from './user';
import { initPostModel, Post } from './post';
import { initCategoryModel, Category } from './category';
import { initCommentModel, Comment } from './comment';
import { initPostCategoriesModel, PostCategories } from './postCategories';

interface Models {
  User: typeof User;
  Category: typeof Category;
  Post: typeof Post;  
  Comment: typeof Comment;
  PostCategories: typeof PostCategories;
}

const initModels = (sequelize: Sequelize) => {
  const User = initUserModel(sequelize);
  const Category = initCategoryModel(sequelize);
  const Post = initPostModel(sequelize);
  const Comment = initCommentModel(sequelize);
  const PostCategories = initPostCategoriesModel(sequelize);

  // Explicitly type the models object to match the Models interface
  const models: Models = {
    User,
    Category,
    Post,
    Comment,
    PostCategories
  };

  // Set up associations
  User.associate(models);
  Category.associate(models);
  Post.associate(models);
  Comment.associate(models);
  PostCategories.associate(models);
  return models;
};

export { Models, initModels };
