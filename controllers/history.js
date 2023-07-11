const transaction = require('../models/transaction')
const {
    response
} = require('express');
const path = require('path')
const controllers = {}
const jwt = require('jsonwebtoken');
const connection = require('../database');
const balance = require('../models/balance')



const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect('/signin');
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded.id_user;
        next();
    } catch (error) {
        return res.redirect('/signin');
    }
};

const viewHistory = async (req, res) => {
    res.render('history/history');
}
controllers.viewHistory = [verifyToken, viewHistory]

const cancelTransc = async (req,res) => {
    const id_transaction = req.params.id_transaction
    const id_user = req.session.id_user
    const findTransc = await transaction.findByPk(id_transaction)
    if (findTransc) {
        const total = findTransc.total
        const intTotal = parseInt(total)

        const findBalance = await balance.findOne({
            where:{
                id_user: id_user
            }
        })

        if (findBalance) {
            const totalBalance = findBalance.total_balance
            const intTotalBalance = parseInt(totalBalance)

            const totalNew = intTotal + intTotalBalance

            const updataBalance = await balance.update({
                total_balance: totalNew
            }, {
                where:{
                    id_user: id_user
                }
            })

            if (updataBalance) {
                const delTransc = await transaction.destroy({
                    where:{
                        id_transaction: id_transaction
                    }
                })

                if (delTransc) {
                    res.status(200).json({
                        success: true,
                        message: 'Transaksi berhasil dibatalkan'
                    })
                } else {
                    res.status(400).json({
                        success: false,
                        message: 'Transaksi tidak berhasil dibatalkan'
                    })
                }
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Transaksi tidak berhasil dibatalkan'
                })
            }
        } else {
            res.status(400).json({
                success: false,
                message: 'Transaksi tidak berhasil dibatakan'
            })
        }

    } else {
        res.status(400).json({
            success: false,
            message: 'Transaksi tidak ditemukan'
        })
    }
}
controllers.cancelTransc = [verifyToken, cancelTransc]

const allTransc = async (req, res) => {
    const id_user = req.session.id_user
    connection.query(`SELECT user.name, user.age, film.title, detail_transaction.no_seats, transaction.total, transaction.id_transaction FROM detail_transaction JOIN transaction ON detail_transaction.id_transaction = transaction.id_transaction JOIN user ON transaction.id_user = user.id_user JOIN film ON detail_transaction.id = film.id WHERE transaction.id_user = ${id_user};`, (err, results) => {
        if (err) {
            console.error('Error saat menjalankan query: ', err);
            res.status(500).json({
                error: 'Terjadi kesalahan server'
            });
            return;
        }
        res.status(200).json({
            success: true,
            results: results
        })
    });
}
controllers.allTransc = allTransc

module.exports = controllers