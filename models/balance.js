require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
import mysql2 from 'mysql2'
const sequelize = new Sequelize(`mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`);
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
