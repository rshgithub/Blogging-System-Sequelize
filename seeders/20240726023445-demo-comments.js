'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('comments', [
      {
        postId: 1,
        userId: 1,
        content: 'Great post! Thanks for sharing.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        postId: 2,
        userId: 2,
        content: 'Interesting insights. I learned a lot.',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('comments', null, {});
  }
};
