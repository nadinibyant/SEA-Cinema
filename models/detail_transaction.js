require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(`mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`);
const transaction = require('./transaction')
const film = require('./film')



const detail_transaction = sequelize.define('detail_transaction', {
    id_detail:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    id_transaction:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
            model: transaction,
            key: 'id_transaction'
        }
    },
    id:{
        type: DataTypes.INTEGER,
        allowNull: false, 
        references: {
            model: film,
            key: 'id'
        }
    },
    id_ticket:{
        type: DataTypes.STRING,
        allowNull: false
    },
    no_seats: {
        type: DataTypes.INTEGER,
        allowNull: true
    }

}, {
    tableName: 'detail_transaction',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})

detail_transaction.belongsTo(transaction, { foreignKey: 'id_transaction' });
transaction.hasMany(detail_transaction, { foreignKey: 'id_transaction' });

detail_transaction.belongsTo(film, { foreignKey: 'id' });
film.hasMany(detail_transaction, { foreignKey: 'id' });

module.exports = detail_transaction
