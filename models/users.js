module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'users',
        {
            id: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING(256),
                allowNull: false,
                unique: true
            },
            email: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            password: {
                type: DataTypes.STRING(256),
                allowNull: false
            }
        },
        {
            tableName: 'users',
            underscored: true,
            charset: 'utf8',
            collate: 'utf8_unicode_ci',
            timestamps: true
        }
    );
};
