'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.addColumn('meety_order_details', 'created_at', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue : Sequelize.literal('CURRENT_TIMESTAMP'),
       after: 'subscription_id'
     })
     await queryInterface.addColumn('meety_order_details', 'updated_at', {
      type:Sequelize.STRING,
      after: 'created_at'
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

