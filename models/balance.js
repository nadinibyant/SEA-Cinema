const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql://root@localhost/db_sea')
const user = require('./user');

const balance = sequelize.define('balance', {
    id_balance:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        allowNull: false
    },
    total_balance:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_user:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model: user,
            key: 'id_user'
        }
    }
},{
    tableName: 'balance',
    timestamps:true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})

module.exports=balance