"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initPostCategoriesModel = exports.PostCategories = void 0;
const sequelize_1 = require("sequelize");
class PostCategories extends sequelize_1.Model {
}
exports.PostCategories = PostCategories;
const initPostCategoriesModel = (sequelize) => {
    PostCategories.init({
        postId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Posts',
                key: 'id',
            },
        },
        categoryId: {
            type: sequelize_1.DataTypes.INTEGER,
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
exports.initPostCategoriesModel = initPostCategoriesModel;
