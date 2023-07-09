const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql://root@localhost/db_sea')

const user = sequelize.define('user', {
    id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    }, 
    username: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    password: {
        type:DataTypes.STRING,
        allowNull:false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    tableName: 'user',
    timestamps: true,
    updatedAt: 'updated_at',
    createdAt: 'created_at'
});

module.exports = user