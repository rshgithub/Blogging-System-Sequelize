"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initPostModel = exports.Post = void 0;
const sequelize_1 = require("sequelize");
class Post extends sequelize_1.Model {
    static associate(models) {
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
    }
}
exports.Post = Post;
const initPostModel = (sequelize) => {
    Post.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        title: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        userId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id',
            },
        },
        published: {
            type: sequelize_1.DataTypes.DATE,
            defaultValue: sequelize_1.Sequelize.fn('now'),
        },
        updated: {
            type: sequelize_1.DataTypes.DATE,
            defaultValue: sequelize_1.Sequelize.fn('now'),
        },
    }, {
        sequelize,
        tableName: 'posts',
        timestamps: false,
        underscored: true,
    });
    return Post;
};
exports.initPostModel = initPostModel;
