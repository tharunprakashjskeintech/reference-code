'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.addColumn('meety_users', 'last_name', {
       type:Sequelize.STRING,
       after: 'first_name'
     })
     await queryInterface.addColumn('meety_users', 'auto_answer', {
      type:Sequelize.STRING,
      after: 'login_status'
    })
    await queryInterface.addColumn('meety_users', 'auto_answer_time', {
      type:Sequelize.STRING,
      after: 'auto_answer'
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
