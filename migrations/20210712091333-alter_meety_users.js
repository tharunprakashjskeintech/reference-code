'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.addColumn('meety_users', 'state', {
       type:Sequelize.STRING,
       after: 'city'
     })
     await queryInterface.addColumn('meety_users', 'phone_code', {
      type:Sequelize.STRING,
      after: 'state'
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
