'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('posts', [
      {
        title: 'First Post',
        content: 'This is the content of the first post.',
        userId: 1, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Second Post',
        content: 'This is the content of the second post.',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('posts', null, {});
  }
};
