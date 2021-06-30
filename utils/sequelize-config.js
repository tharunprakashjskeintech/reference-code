
require('dotenv').config();

module.exports = {
    development: {
        username: 'skp002',
        password: 'SKP002',
        database: 'sipper_app',
        host: '127.0.0.1',
        port: 3306,
        dialect: 'mysql',
        dialectOptions: {
            bigNumberStrings: true
        },
        // Use a different storage. Default: none
        // seederStorage: "json",
        // Use a different file name. Default: sequelize-data.json
        // seederStoragePath: "SequelizeSeed",
        // Use a different table name. Default: SequelizeData
        "seederStorage": "sequelize",
        seederStorageTableName: "SequelizeSeed",


        // Use a different storage type. Default: sequelize
        // migrationStorage: "json",

        // Use a different file name. Default: sequelize-meta.json
        // migrationStoragePath: "sequelize_migration_log.json",

        // Use a different table name. Default: SequelizeMeta
        migrationStorageTableName: "SequelizeMeta",

    },
    test: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: 3306,
        dialect: 'mysql',
        dialectOptions: {
            bigNumberStrings: true
        },
        // Use a different storage. Default: none
        // seederStorage: "json",
        // Use a different file name. Default: sequelize-data.json
        // seederStoragePath: "SequelizeSeed",
        // Use a different table name. Default: SequelizeData
        "seederStorage": "sequelize",

        seederStorageTableName: "SequelizeSeed",


        // Use a different storage type. Default: sequelize
        // migrationStorage: "json",

        // Use a different file name. Default: sequelize-meta.json
        // migrationStoragePath: "sequelize_migration_log.json",

        // Use a different table name. Default: SequelizeMeta
        migrationStorageTableName: "SequelizeMeta",
    },
    production: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: 3306,
        dialect: 'mysql',
        dialectOptions: {
            bigNumberStrings: true
        },
        // Use a different storage. Default: none
        // seederStorage: "json",
        // Use a different file name. Default: sequelize-data.json
        // seederStoragePath: "SequelizeSeed",
        // Use a different table name. Default: SequelizeData
        "seederStorage": "sequelize",

        seederStorageTableName: "SequelizeSeed",


        // Use a different storage type. Default: sequelize
        // migrationStorage: "json",

        // Use a different file name. Default: sequelize-meta.json
        // migrationStoragePath: "sequelize_migration_log.json",

        // Use a different table name. Default: SequelizeMeta
        migrationStorageTableName: "SequelizeMeta",
    }
};


