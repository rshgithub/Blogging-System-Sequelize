import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Post } from './post';
import { Comment } from './comment';

interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password : string;
  image?: Buffer;
}

type UserCreationAttributes = Optional<UserAttributes, 'id'>;

class User extends Model<UserAttributes, UserCreationAttributes> 
  implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public image?: Buffer;

  public static associate(models: any) {
    User.hasMany(models.Post, {
      foreignKey: 'userId',
      as: 'posts',
    });
    User.hasMany(models.Comment, {
      foreignKey: 'userId',
      as: 'comments',
    });
  }
}

const initUserModel = (sequelize: Sequelize) => {
  User.init({
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
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.BLOB('long'), // Handle file data
      allowNull: true,
    },
  }, {
    sequelize,
    tableName: 'users',
    timestamps: false,
    underscored: true,
  });

  return User;
};

export { User, initUserModel };
