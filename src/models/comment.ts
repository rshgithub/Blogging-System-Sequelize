import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
 
interface CommentAttributes {
  id: number;
  content: string;
  postId: number;
  userId: number; 
}

type CommentCreationAttributes = Optional<CommentAttributes, 'id'>;

class Comment extends Model<CommentAttributes, CommentCreationAttributes> 
  implements CommentAttributes {
  public id!: number;
  public content!: string;
  public postId!: number;
  public userId!: number; 

  public static associate(models: any) {
    Comment.belongsTo(models.Post, {
      foreignKey: 'postId',
      as: 'post',
    });
    Comment.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  }
}

const initCommentModel = (sequelize: Sequelize) => {
  Comment.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'post_id',
      references: {
        model: 'Posts',
        key: 'id',
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id',
      references: {
        model: 'Users',
        key: 'id',
      },
    }, 
  }, {
    sequelize,
    tableName: 'comments',
    timestamps: false,
    underscored: true,
  });

  return Comment;
};

export { Comment, initCommentModel };
