import { Sequelize, DataTypes, Model } from 'sequelize';
import { Models } from '../models';

interface PostCategoriesAttributes {
  postId: number;
  categoryId: number;
  
}

class PostCategories extends Model<PostCategoriesAttributes> 
  implements PostCategoriesAttributes {
  public postId!: number;
  public categoryId!: number;

  public static associate(models: Models) {
    PostCategories.belongsTo(models.Post, { foreignKey: 'postId' });
    PostCategories.belongsTo(models.Category, { foreignKey: 'categoryId' });
  }
}

const initPostCategoriesModel = (sequelize: Sequelize) => {
  PostCategories.init({
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Posts',
        key: 'id',
      },
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Categories',
        key: 'id',
      },
    },
  }, {
    sequelize,
    tableName: 'post_categories',
    timestamps: false,
    underscored: true,
  });

  return PostCategories;
};

export { PostCategories, initPostCategoriesModel };
