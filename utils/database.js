
var mysql = require('mysql2');


/**
 * Dot env configuration
 */





let database = mysql.createPool({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: 3306,
    multipleStatements: true,
    dateStrings: true
})

console.log("database URL ... ",process.env.DB_HOST);

module.exports = database

module.exports.transactions = {
    async beginTransaction() {
        await database.promise().query('START TRANSACTION; SET AUTOCOMMIT = 0');

    },

    async commit() {
        await database.promise().query('COMMIT; SET AUTOCOMMIT = 1');
    },

    async rollback() {
        await database.promise().query('ROLLBACK; SET AUTOCOMMIT = 1');

    }

}
