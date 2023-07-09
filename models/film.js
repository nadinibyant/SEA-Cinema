const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql://root@localhost/db_sea')

const film = sequelize.define('film', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        allowNull: false,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description:{
        type: DataTypes.STRING,
        allowNull:false
    },
    release_date: {
        type: DataTypes.DATE,
        allowNull: false
    }, 
    poster_url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age_rating: {
        type: DataTypes.INTEGER,
        allowNull:false
    }, 
    ticket_price:{
        type: DataTypes.INTEGER,
        allowNull: false
    }

},{
    tableName: 'film',
    timestamps: true,
    updatedAt: 'updated_at',
    createdAt: 'created_at'
})

module.exports = film