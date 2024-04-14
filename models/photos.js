module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'photos',
        {
            id: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            title: {
                type: DataTypes.STRING(256),
                allowNull: false
            },
            user_id: {
                type: DataTypes.INTEGER(11),
                allowNull: false
            },
            url: {
                type: DataTypes.STRING(256),
                allowNull: false
            }
        },
        {
            tableName: 'photos',
            underscored: true,
            charset: 'utf8',
            collate: 'utf8_unicode_ci',
            timestamps: true
        }
    );
};
