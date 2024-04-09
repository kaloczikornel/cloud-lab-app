const Sequelize = require('sequelize');
const { dbconfig } = require('../config');

const sequelize = new Sequelize(
    dbconfig.database,
    dbconfig.user,
    dbconfig.password,
    { host: dbconfig.host, dialect: 'mysql' }
);

const models = {
    sequelize,
    Sequelize,
    users: require('./users')(sequelize, Sequelize.DataTypes),
    syncByHand(options) {
        return models.users.sync(options);
    }
};
module.exports = models;
