import { Sequelize, DataTypes, Model, Optional, Association } from 'sequelize';
import { Category } from './category';
import { User } from './user';
import { Comment } from './comment';

interface PostAttributes {
  id: number;
  title?: string;
  content?: string;
  userId: number; 
}

type PostCreationAttributes = Optional<PostAttributes, 'id'>;

class Post extends Model<PostAttributes, PostCreationAttributes> 
  implements PostAttributes {
  public id!: number;
  public title?: string;
  public content?: string;
  public userId!: number; 

  public readonly categories?: Category[];
  public readonly comments?: Comment[];

  public static associations: {
    categories: Association<Post, Category>;
    comments: Association<Post, Comment>;
    user: Association<Post, User>;
  };

  public static associate(models: any) {
    Post.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
    Post.belongsToMany(models.Category, {
      through: 'PostCategories',
      foreignKey: 'postId',
      otherKey: 'categoryId',
      as: 'categories',
    });
    Post.hasMany(models.Comment, {
      foreignKey: 'postId',
      as: 'comments',
    });
  }
}

const initPostModel = (sequelize: Sequelize) => {
  Post.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    }, 
  }, {
    sequelize,
    tableName: 'posts',
    timestamps: false,
    underscored: true,
  });

  return Post;
};

export { Post, initPostModel };
