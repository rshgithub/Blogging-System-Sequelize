"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initCategoryModel = exports.Category = void 0;
const sequelize_1 = require("sequelize");
class Category extends sequelize_1.Model {
    static associate(models) {
        Category.belongsToMany(models.Post, {
            through: 'PostCategories',
            foreignKey: 'categoryId',
            otherKey: 'postId',
            as: 'posts',
        });
    }
}
exports.Category = Category;
const initCategoryModel = (sequelize) => {
    Category.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            defaultValue: false,
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
exports.initCategoryModel = initCategoryModel;
