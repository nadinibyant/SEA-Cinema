const path = require('path')
const controllers = {}
const balance = require('../models/balance')
const user = require('../models/user')
const jwt = require('jsonwebtoken')

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

const tampilBalance = async (req,res) => {
    const balancePath = path.join(__dirname, '../views/balance/balance.html')
    res.sendFile(balancePath)
}
controllers.tampilBalance = [verifyToken, tampilBalance]

const getDataSaldo = async (req,res) => {
    const id_user = req.session.id_user

    const findUser = await user.findByPk(id_user)
    if (findUser) {
        const findBalance = await balance.findOne({
            where:{
                id_user: id_user
            }
        })
    
        if (findBalance) {
            const totalBalance = findBalance.total_balance
            res.status(200).json({
                success: true,
                totalBalance: totalBalance
            })
        } else {
            res.status(400).json({
                success: false,
                message: 'Saldo belum terisi'
            })
        }
    } else {
        res.redirect('/signin')
    }
    
}
controllers.getDataSaldo = [verifyToken,getDataSaldo]

const addBalance = async (req, res) => {
    const balanceAdd = req.body.balanceAdd
    if (!balanceAdd) {
        res.status(400).json({
            success: false,
            message: 'Isi jumlah saldo yang ingin ditambahkan'
        })
    } else {
        const id_user = req.session.id_user
        const findTotal = await balance.findOne({
            where: {
                id_user: id_user
            }
        })

        if (findTotal) {
            const totalBalance = parseInt(findTotal.total_balance)
            const balanceAddInt = parseInt(balanceAdd)
            const totalNew = totalBalance + balanceAddInt

            const updateTotal = await balance.update({
                total_balance: totalNew
            }, {
                where:{
                    id_user: id_user
                }
            })
            
            if (updateTotal) {
                res.status(200).json({
                    success: true,
                    message: 'Saldo berhasil ditambah'
                })
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Saldo tidak berhasil ditambah'
                })
            }
        } else {
            const createBalance = await balance.create({
                total_balance: balanceAdd,
                id_user: id_user
            })

            if (createBalance) {
                res.status(200).json({
                    success: true,
                    message: 'Saldo berhasil ditambahkan'
                })
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Saldo tidak berhasil ditambahkan'
                })
            }
        }
    }
}
controllers.addBalance = [verifyToken,addBalance]

module.exports = controllers