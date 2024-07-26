import { Sequelize, DataTypes, Model, Optional, Association } from 'sequelize';
import { Post } from './post';

interface CategoryAttributes {
  id: number;
  name: string;
  posts?: Post[];
}

type CategoryCreationAttributes = Optional<CategoryAttributes, 'id'>;

class Category extends Model<CategoryAttributes, CategoryCreationAttributes> 
  implements CategoryAttributes {
  public id!: number;
  public name!: string;
  public readonly posts?: Post[];

  public static associations: {
    posts: Association<Category, Post>;
  };

  public static associate(models: any) {
    Category.belongsToMany(models.Post, {
      through: 'PostCategories',
      foreignKey: 'categoryId',
      otherKey: 'postId',
      as: 'posts',
    });
  }
}

const initCategoryModel = (sequelize: Sequelize) => {
  Category.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'categories',
    timestamps: false,
    underscored: true,
  });

  return Category;
};

export { Category, initCategoryModel };
