const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql://root@localhost/db_sea')
const user = require('./user')

const transaction = sequelize.define('transaction', {
    id_transaction:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, 
        allowNull: false
    }, 
    id_user:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: user,
            key: 'id_user'
        }
    },
    bayar:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    total:{
        type: DataTypes.INTEGER,
        allowNull: false
    }, 
    number_of_ticket:{
        type: DataTypes.INTEGER,
        allowNull:false
    }
},{
    tableName: 'transaction',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})

transaction.belongsTo(user, { foreignKey: 'id_user' });
user.hasMany(transaction, { foreignKey: 'id_user' });

module.exports = transaction