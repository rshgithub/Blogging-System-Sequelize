"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initUserModel = exports.User = void 0;
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
    static associate(models) {
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
exports.User = User;
const initUserModel = (sequelize) => {
    User.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: sequelize_1.DataTypes.BLOB('long'), // Handle file data
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
exports.initUserModel = initUserModel;
