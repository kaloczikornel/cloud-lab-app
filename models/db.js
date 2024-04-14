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
    photos: require('./photos')(sequelize, Sequelize.DataTypes),
    syncByHand(options) {
        return models.users
            .sync(options)
            .then(() => models.photos.sync(options));
    }
};

models.users.hasMany(models.photos, { foreignKey: 'user_id' });

module.exports = models;
