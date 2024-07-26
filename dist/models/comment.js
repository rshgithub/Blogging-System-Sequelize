"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initCommentModel = exports.Comment = void 0;
const sequelize_1 = require("sequelize");
class Comment extends sequelize_1.Model {
    static associate(models) {
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
exports.Comment = Comment;
const initCommentModel = (sequelize) => {
    Comment.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        content: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
        },
        postId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            field: 'post_id',
            references: {
                model: 'Posts',
                key: 'id',
            },
        },
        userId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            field: 'user_id',
            references: {
                model: 'Users',
                key: 'id',
            },
        },
        createdAt: {
            type: sequelize_1.DataTypes.DATE,
            defaultValue: sequelize_1.Sequelize.fn('now'),
            field: 'created_at',
        },
        updatedAt: {
            type: sequelize_1.DataTypes.DATE,
            defaultValue: sequelize_1.Sequelize.fn('now'),
            field: 'updated_at',
        },
    }, {
        sequelize,
        tableName: 'comments',
        timestamps: false,
        underscored: true,
    });
    return Comment;
};
exports.initCommentModel = initCommentModel;
