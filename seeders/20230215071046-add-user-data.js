'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('users', [{
      username: 'Johndoe',
      email: 'johndoe@gmail.com',
      password: 'password',
      createdAt: new Date(),
      updatedAt: new Date()

    }], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('users', null, {});

  }
};
